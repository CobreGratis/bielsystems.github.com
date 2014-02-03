task :new_profile do
  require 'erb'
  require 'ostruct'
  require 'i18n'

  NewProfileTask.run
end

module NewProfileTask
  class << self
    def run
      # Required fields
      while (name = ask('Your first and last names:')).nil?; end
      while (image = ask('URL to an image of you (tip: type in your email to get your gravatar image)')).nil?; end
      while (job_title = ask('Your job title:')).nil?; end

      if image =~ /[\w+]+@[\w|\.]+/
        image ='http://gravatar.com/avatar/' + Digest::MD5.hexdigest(image) + '?s=160'
      end

      job_cool = ask("A \"cool\" job title to be shown on your profile page (Defaults to the job title)")
      twitter  = ask('Your twitter handle:')
      github   = ask('Your github user:')
      dribbble = ask('Your dribbble user:')
      behance  = ask('Your behance user:')

      vars = {
        full_name: name,
        parameterized_name: I18n.transliterate(name).gsub(' ', '-').downcase,
        image: image,
        job_title: job_title,
        job_cool: job_cool,
        social_accounts: {
          github:   github,
          twitter:  twitter,
          dribbble: dribbble,
          behance:  behance
        }
      }

      new_profile   = ERB.new(File.read('templates/new_profile.yml.erb'))
      template_vars = OpenStruct.new(vars)

      puts new_profile.result(template_vars.instance_eval { binding })
    end

    def ask(question, opts = {default_value: nil})
      STDOUT.print "#{question} "
      answer = STDIN.gets.chomp.strip
      !answer.empty? && answer || opts[:default_value]
    end
  end
end
