require 'open-uri'
require 'nokogiri'

class Blogpost
  attr_accessor :title, :url, :author

  def initialize(title, url, author)
    @title  = title
    @url    = url
    @author = author.split[0..1].join(' ')
  end

  def relative_url
    if url.include? 'helabs.com.br'
      url.gsub('http://helabs.com.br', '')
    else
      url
    end
  end

  def to_hash
    {
      'title' => title,
      'url' => relative_url
    }
  end

  def export_to(filename)
    file_content = File.read(filename)
    frontmatter = YAML.load(
      file_content.scan(/\A(---\s*\n.*?\n?)^(---\s*$\n?)/m).first.first
    )

    frontmatter['blogposts'] << self.to_hash

    File.open(filename, 'w') do |f|
      f.write(
        file_content.gsub(
          /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m,
          frontmatter.to_yaml({ line_width: -1 }) + "---\n"
        )
      )
    end
  end

  def self.fetch(url)
    doc = Nokogiri::XML(open(url))
    doc.css('entry').map do |entry|
      Blogpost.new(entry.css('title').text, entry.css('id').text, entry.css('name').text)
    end
  end

  def ==(other)
    self.title  == self.title &&
    self.url    == self.url &&
    self.author == other.author
  end
end