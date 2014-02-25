module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //jshint config 
    jshint: {
      files: ['assets/js/*.js, assets/js/components/*.js'],
      options: {
        globals: {
          jQuery: true,
          console:true
        }
      }
    },

    //handlebars config
    handlebars: {
      compile: {
        options: {
          namespace: 'hbs',
          amd: true,
          processName: function(filename) {
            var pieces = filename.split("/");
            var filetype = pieces[pieces.length - 1].split('.');
            return filetype[0];
          },
        },
        files: {
          "assets/js/templates/templates.js" : ["assets/js/templates/*.hbs"]
        }
      }
    },

    //less
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "assets/css/style.css": "assets/css/less/style.less"
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          yuicompress: true
        },
        files: {
          "assets/css/style.css": "assets/css/less/style.less"
        }
      }
    },

    //watch
    watch: {
      styles: {
        files: ['assets/css/**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['jshint']
      },
      templates: {
        files: ['assets/js/templates/*.hbs'],
        tasks: ['handlebars']
      }
    },

    //concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/libs/modernizr.js', 'js/libs/jquery.scrollTo', 'js/templates/templates.js', 'js/dist/optimized.js'],
        dest: 'js/dist/dist.js'
      }
    },

    //requirejs
    requirejs: {
      compile:{
        options: {
          mainConfigFile: 'js/main.js',
          out: 'js/dist/optimized.js',
          name: 'main',
          uglify: {
            beautify: true
          }
        }
      }
    },

    //uglify
    uglify: {
      my_target: {
        files: {
          'js/dist/dist.js' : 'js/dist/dist.js'
        }
      }
    }
  });

  //load modules
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //default task 
  grunt.registerTask('default', ['jshint', 'handlebars', 'less']);

  //other tasks 
  grunt.registerTask('styles', 'less');
  grunt.registerTask('test', 'jshint');
  grunt.registerTask('compile', ['requirejs', 'concat', 'uglify']);
};