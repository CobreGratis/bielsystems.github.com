require 'open-uri'
require 'nokogiri'

class Blogpost
  attr_accessor :title, :url, :author

  def initialize(title, url, author)
    @title  = title
    @url    = url
    @author = author
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