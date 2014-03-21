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
        // as execution order matters for JS. script.js has to be last
        files: {
          'javascripts/application.min.js': [
            'javascripts/source/instantclick.min.js',
            'javascripts/source/jquery.localScroll.js',
            'javascripts/source/jquery.maskedinput.js',
            'javascripts/source/jquery.prettyPhoto.js',
            'javascripts/source/jquery.scrollTo.js',
            'javascripts/source/jquery.tipTip.js',
            'javascripts/source/jquery.validate.js',
            'javascripts/source/jquery.touchSwipe.min.js',
            'javascripts/source/jquery.liquid-slider.min.js',
            'javascripts/source/jquery.easing.1.3.js',
            'javascripts/source/testimonials.js',
            'javascripts/source/scripts.js'
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
