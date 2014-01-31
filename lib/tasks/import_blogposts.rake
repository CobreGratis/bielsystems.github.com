namespace :import do
  desc 'Import blogposts'
  task :blogposts do
    import_blogposts!
  end
end

def import_blogposts!
  require_relative '../blogpost'
  require 'i18n'
  require 'jekyll'
  require 'colored'

  atom_url = 'http://helabs.com.br/blog/atom.xml'

  puts "Fetching blogposts from #{atom_url}".yellow

  data = Blogpost.fetch(atom_url).group_by do |blogpost|
    I18n.transliterate(blogpost.author)
  end # --> { 'transliterated_author_name' => [ @blogpost, ... ], ... }

  # get absolute filenames of _posts/time/*.html files
  time_files = Dir.chdir(File.join('_posts', 'time')) do
    Dir.glob('*.html').map { |f| File.absolute_path f }
  end

  # initiate Jekyll site
  site = Jekyll::Site.new(Jekyll.configuration({}))

  # iterate through time/*.html files
  time_files.each do |time_file|
    person_name = I18n.transliterate(
      Jekyll::Post.new(site, Dir.pwd, '', "time/#{File.basename(time_file)}").data['full_name']
    )

    if data.include? person_name
      puts "Exporting blogposts of #{person_name}".green

      data[person_name].each do |blogpost|
        blogpost.export_to time_file
      end
    end
  end
end
