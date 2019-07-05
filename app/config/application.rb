require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

require_relative '../lib/shikimori_domain'
require_relative '../lib/string'
require_relative '../lib/i18n_hack'
require_relative '../lib/open_image'
require_relative '../lib/responders/json_responder'
require_relative '../lib/named_logger'
require_relative '../lib/log_before_timeout'
# require_relative '../config/initializers/log_before_timeout'

Dir['app/middleware/*'].each { |file| require_relative "../#{file}" }

module Shikimori
  DOMAINS = {
    production: 'shikimori.one',
    development: 'shikimori.local',
    test: 'shikimori.test'
  }
  DOMAIN = DOMAINS[Rails.env.to_sym]

  NAME_RU = 'Шикимори'
  NAME_EN = 'Shikimori'

  STATIC_SUBDOMAINS = %w[nyaa kawai moe desu dere]
  EMAIL = 'mail@shikimori.org'

  DOMAIN_LOCALES = %i[ru en]

  ALLOWED_DOMAINS = ShikimoriDomain::RU_HOSTS + ShikimoriDomain::EN_HOSTS

  VK_CLUB_URL = 'https://vk.com/shikimori'
  DISCORD_CHANNEL_URL = 'https://discord.gg/pKzM9vS'

  PROTOCOLS = {
    production: 'https',
    development: 'http',
    test: 'http'
  }
  PROTOCOL = PROTOCOLS[Rails.env.to_sym]

  LOCAL_RUN = ENV['LOGNAME'] == 'morr' && ENV['USER'] == 'morr'
  # ALLOWED_PROTOCOL = Rails.env.production? && !LOCAL_RUN ? 'https' : 'http'

  IGNORED_EXCEPTIONS = %w[
    ActionController::InvalidAuthenticityToken
    CanCan::AccessDenied
    ActionController::UnknownFormat
    ActionController::UnknownHttpMethod
    ActionDispatch::RemoteIp::IpSpoofAttackError
    ActiveRecord::RecordNotFound
    ActionController::RoutingError
    ActiveRecord::PreparedStatementCacheExpired
    I18n::InvalidLocale
    Unicorn::ClientShutdown
    Unauthorized
    Forbidden
    AgeRestricted
    MismatchedEntries
    CopyrightedResource
    Net::SMTPServerBusy
    Net::SMTPFatalError
    Interrupt
    Apipie::ParamMissing
    InvalidIdError
    InvalidParameterError
    EmptyContentError
    MalParser::RecordNotFound
    BadImageError
    Errors::NotIdentifiedByImageMagickError
    Sidekiq::Shutdown
    Terrapin::ExitStatusError
  ]

  class Application < Rails::Application
    def redis
      Rails.application.config.redis
    end
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.0

    # Custom directories with classes and modules you want to be autoloadable.
    config.autoload_paths += Dir["#{config.root}/app/models"]
    config.autoload_paths += Dir["#{config.root}/app/**/"]
    config.paths.add 'lib', eager_load: true

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    config.time_zone = 'Europe/Moscow'

    I18n.enforce_available_locales = true

    config.i18n.default_locale = :ru
    config.i18n.locale = :ru
    config.i18n.available_locales = %i[ru en]
    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    config.i18n.load_path += Dir[Rails.root.join('config/locales/**/*.yml')]

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    if defined?(Redirecter) && Rails.env.production? && !LOCAL_RUN
      config.middleware.use Redirecter
    end

    config.middleware.insert 0, Rack::UTF8Sanitizer
    if defined?(ProxyTest) && Rails.env.production? && !LOCAL_RUN # not defined for clockwork
      config.middleware.insert 0, ProxyTest
    end

    config.middleware.use Rack::JSONP
    config.middleware.use Rack::Attack
    # config.middleware.use LogBeforeTimeout

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins do |source, env|
          ALLOWED_DOMAINS.include?(Url.new(source).domain.to_s) &&
            Url.new(source).protocol.to_s == PROTOCOL
        end
        resource '*',
          headers: :any,
          methods: [:get, :options]
      end
    end

    Paperclip.logger.level = 2

    # Enable the asset pipeline
    config.assets.enabled = true

    ActiveRecord::Base.include_root_in_json = false

    config.active_record.cache_versioning = true

    config.redis_host = Rails.env.production? ? '192.168.0.3' : 'localhost'
    config.redis_db = 2

    # достали эксепшены с ханибаджера
    config.action_dispatch.ip_spoofing_check = false

    config.action_dispatch.trusted_proxies = %w(
      139.162.130.157
      84.201.128.45
      145.239.87.191
      185.62.190.16
      88.198.7.123
      192.168.0.3
      192.168.0.2
    ).map do |proxy|
      IPAddr.new proxy
    end

    config.action_mailer.default_url_options = { host: Shikimori::DOMAIN }
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      address: 'smtp.mailgun.org',
      port: 587,
      user_name: Rails.application.secrets.mailgun[:login],
      password: Rails.application.secrets.mailgun[:password],
      domain: Shikimori::DOMAIN
    }

    #config.action_mailer.smtp_settings = {
      #address: "smtp.gmail.com",
      #port: 587,
      #domain: Shikimori::DOMAIN,
      #user_name: Rails.application.secrets.smtp[:login],
      #password: Rails.application.secrets.smtp[:password],
      #authentication: 'plain',
      #enable_starttls_auto: true
    #}

    config.generators do |generator|
      generator.fixture_replacement :factory_bot, dir: 'spec/factories/'
      generator.template_engine :slim
      generator.stylesheets false
      generator.helper false
      generator.helper_specs false
      generator.view_specs false
      generator.test_framework :rspec
    end

    config.redis = Redis.new(
      host: Rails.application.config.redis_host,
      port: 6379
    )
  end
end
