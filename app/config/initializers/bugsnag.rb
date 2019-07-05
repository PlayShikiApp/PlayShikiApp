if defined? Bugsnag
  Bugsnag.configure do |config|
    config.api_key = '829500b442f2f663128489da4ae0ae81'

    Shikimori::IGNORED_EXCEPTIONS
      .map { |v| v.constantize rescue NameError }
      .reject { |v| v == NameError }
      .each do |klass|
        config.ignore_classes << klass
      end
  end
end
