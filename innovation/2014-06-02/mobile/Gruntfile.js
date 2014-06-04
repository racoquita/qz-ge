/*
 * plus template for qz ad development
 * https://bitbucket.org/quartz/plus-ad-template
 *
 * Copyright (c) 2014 Richard Stovall
 * Not licensed for public use
 */

'use strict';

module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('qzready');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      build: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          outputStyle: 'compact',
          force: true,
          noLineComments: true
        }
      }
    },
    watch: {
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['compass:build']
      },
      js: {
        files: 'js/**/*.js',
        tasks: []
      }
    },
    qzready: {
      deploy: {
        options: {
          base: 'http://ads.quartz.cc/sponsors',
          client: 'example_client',
          campaign: 'example_campaign',
          date: '2014-04-15',
          unit: 'desktop',
          version: '1',
          internal_scripts: [
            
          ],
          external_scripts: [
            'http://app.qz.com/js/vendor/jQuery-min.js',
            'http://app.qz.com/js/frameMessager/min/frameMessager.min.2.5.48.js',
            'http://app.qz.com/js/frameMessager/QZIX.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['compass:build', 'watch']);
  grunt.registerTask('ready', ['qzready']);
};
