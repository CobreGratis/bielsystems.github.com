Dir['./lib/tasks/**/*.rake'].each { |f| load f }

require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

task :default => :spec
