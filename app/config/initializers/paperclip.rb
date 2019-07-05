Paperclip.interpolates :user_id do |attachment, style|
  attachment.instance.user_id
end

Paperclip.interpolates :access_token  do |attachment, style|
  attachment.instance.access_token
end

# manga online
Paperclip.interpolates :manga_id_mod do |attachment, style|
  attachment.instance.manga_id_mod
end

Paperclip.interpolates :manga_id do |attachment, style|
  attachment.instance.manga_id
end

Paperclip.interpolates :chapter_name do |attachment, style|
  attachment.instance.chapter_name
end

Paperclip.interpolates :number do |attachment, style|
  attachment.instance.number
end
# ----

# отключаем проверку на spoofing, она работает как-то странно
module Paperclip::HasAttachedFile::WithoutSpoofingCheck
  def add_required_validations
  end
end
Paperclip::HasAttachedFile.send :prepend, Paperclip::HasAttachedFile::WithoutSpoofingCheck

# для транслитерации названий файлов
module TransliteratePaperclip
  extend ActiveSupport::Concern
  def translit_paperclip_file_name paperclip_file
    paperclip_file = [paperclip_file] unless paperclip_file.is_a?(Enumerable)

    paperclip_file.each do |file|
      filename = read_attribute("#{file}_file_name")

      if filename.present?
        extension = File.extname(filename).gsub(/^\.+/, '')
        filename = filename.gsub(/\.#{extension}$/, '')

        self.send(file).instance_write(
          :file_name,
          "#{filename.permalinked}.#{extension.permalinked}"
        )
      end
    end
  end
end
ActiveRecord::Base.send :include, TransliteratePaperclip

# c 46 строки хак от эксплойта, вешающего сервер из-за загружаемой картинки
# размером 225000x225000. нужно обязательно отключить use_exif_orientation
Paperclip.options[:use_exif_orientation] = false
module Paperclip
  class GeometryDetector
    def initialize(file)
      @file = file
      raise_if_blank_file
    end

    def make
      geometry = GeometryParser.new(geometry_string.strip).make

      raise Errors::NotIdentifiedByImageMagickError unless geometry

      if geometry.width.to_i > 10_000 || geometry.height.to_i > 10_000
        raise BadImageError
      else
        geometry
      end
    end

    private

    def geometry_string
      orientation = Paperclip.options[:use_exif_orientation] ?
        "%[exif:orientation]" : "1"
      Paperclip.run(
        "identify",
        "-format '%wx%h,#{orientation}' :file", {
          :file => "#{path}[0]"
        }, {
          :swallow_stderr => true
        }
      )
    end

    def path
      @file.respond_to?(:path) ? @file.path : @file
    end

    def raise_if_blank_file
      if path.blank?
        raise Errors::NotIdentifiedByImageMagickError.new("Cannot find the geometry of a file with a blank name")
      end
    end
  end
end
