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

  describe '#export_to' do
    context "person has blogposts" do
      before do
        # copy fixture to _posts directory
        spec_directory = File.dirname(__FILE__)
        @fixture_name = '2011-10-11-mauro-george.html'
        fixture_file = File.join(spec_directory, 'fixtures', @fixture_name)
        FileUtils.cp fixture_file, File.join(spec_directory, '_posts')
        @post_file = File.join(spec_directory, '_posts', @fixture_name)

        # create Jekyll post which can parse post file inside _posts
        @site = Jekyll::Site.new(Jekyll.configuration({}))
        post = Jekyll::Post.new(@site, Dir.pwd, 'spec', @fixture_name)

        expect(post.data['blogposts'].count).to eq(2)

        expect(post.data['blogposts'].first['title']).to eq("Awesome post 1")
        expect(post.data['blogposts'].first['url']).to eq("/blogs/mauro/1")
      end

      subject(:blogpost) { Blogpost.new('New blogpost', 'http://some.url', 'Mauro George') }

      it "appends new blogpost" do
        blogpost.export_to @post_file

        post = Jekyll::Post.new(@site, Dir.pwd, 'spec', @fixture_name)

        expect(post.data['blogposts'][-1]['url']).to eq("http://some.url")
        expect(post.data['blogposts'][-1]['title']).to eq("New blogpost")
      end


      it "update blogposts count" do
        blogpost.export_to @post_file

        post = Jekyll::Post.new(@site, Dir.pwd, 'spec', @fixture_name)

        expect(post.data['blogposts'].count).to eq(3)
      end
    end
  end

  describe '#to_hash' do
    subject(:blogpost) { Blogpost.new('some title', 'http://some.url', 'some person') }

    it "returns hash with title and url" do
      expected_hash = { 'title' => 'some title', 'url' => 'http://some.url' }

      expect(blogpost.to_hash).to eql(expected_hash)
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