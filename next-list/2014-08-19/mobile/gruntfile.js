module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        },
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks( 'grunt-contrib-compass' );
  grunt.registerTask( 'default', [ 'compass', 'watch'] );
};