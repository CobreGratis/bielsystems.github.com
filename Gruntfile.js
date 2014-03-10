module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['javascripts/source/**'],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'javascripts/application.min.js': [
            'javascripts/source/*.js'
          ]
        }
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['uglify', 'watch']);
};
