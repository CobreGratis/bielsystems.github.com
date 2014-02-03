module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['sass/**'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['javascripts/source/**'],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'stylesheets/style.css': 'sass/style.scss'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'javascripts/application.min.js': ['javascripts/source/{,*/,**/}*.js']
        }
      }
    }
  });

  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  //Default task(s).
  grunt.registerTask('default', ['sass', 'uglify', 'watch']);
};
