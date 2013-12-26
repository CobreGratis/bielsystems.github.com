require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

task :default => :spec

desc 'Run Jekyll server'
task :server do
  system 'bundle exec jekyll serve -w'
end