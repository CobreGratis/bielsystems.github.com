# -*- encoding : utf-8 -*-
require 'spec_helper'

describe Blogpost do
  describe "#fetch", :vcr do
    let(:blogpost) { Blogpost.new('Redesign do Startupdev', 'http://helabs.com.br/blog/2013/11/26/startupdev-novo-design', 'Aluísio Azevedo') }

    it "returns array of blogposts" do
      blogposts = Blogpost.fetch('http://helabs.com.br/blog/atom.xml')
      expect(blogposts).to include(blogpost)
    end
  end

  pending '#export' do
    def read_yaml(filename)

    end

    context "person has blogposts" do
      before do
        @original_yaml = read_yaml("ssss")
        expect(@original_yaml.blogposts.size).to eq(1)

        expect(@original_yaml.blogposts.first.url).to eq("ssss")      
        expect(@original_yaml.blogposts.first.title).to eq("ssss")      
      end

      it "save correct new blogposts" do
        Blogpost.export
        @original_yaml.reload

        expect(@original_yaml.blogposts.last.url).to eq("another")      
        expect(@original_yaml.blogposts.last.title).to eq("another")      
      end


      it "update blogposts size" do
        expect {
          Blogpost.export
        }.to change { @original_yaml.reload }.by(1)
      end
    end
  end

  describe '#to_yaml' do
    subject(:blogpost) { Blogpost.new('some title', 'http://some.url', 'some person') }

    it "prints expected yaml" do
      expected_yaml_string = <<-eos
title: some title
url: http://some.url
eos
      expect(blogpost.to_yaml).to eql(expected_yaml_string)
    end
  end

  describe '#author' do
    it "gets only first 2 words" do
      blogpost = Blogpost.new('some-title', 'some-url', 'Ali Ismayilov Fuad oghlu')

      expect(blogpost.author).to eql('Ali Ismayilov')
    end
  end

  describe '#relative_url' do
    context "host is helabe.com.br" do
      it 'cuts out host and protocol from url' do
        blogpost = Blogpost.new('some title', 'http://helabs.com.br/blog/2013/11/26/startupdev-novo-design', 'some name')

        expect(blogpost.relative_url).to eql('/blog/2013/11/26/startupdev-novo-design')
      end
    end

    context "external host" do
      it 'returns url as it is' do
        blogpost = Blogpost.new('some title', 'http://startupdev.com.br/en/startup-services/mvp/', 'some name')

        expect(blogpost.relative_url).to eql('http://startupdev.com.br/en/startup-services/mvp/')
      end
    end
  end
end