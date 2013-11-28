# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Blogpost do
  describe "#fetch", :vcr do
    let(:blogpost) { Blogpost.new('Redesign do Startupdev', 'http://helabs.com.br/blog/2013/11/26/startupdev-novo-design', 'Aluísio Azevedo') }

    it "returns array of blogposts" do
      entries = Blogpost.fetch('http://helabs.com.br/blog/atom.xml')
      expect(entries).to include(blogpost)
    end
  end

  describe '#author' do
    it "gets only first 2 words" do
      blogpost = Blogpost.new('some-title', 'some-url', 'Ali Ismayilov Fuad oghlu')

      expect(blogpost.author).to eql('Ali Ismayilov')
    end
  end
end