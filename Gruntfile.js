module.exports = function(grunt) {
    var autoprefixer = require('autoprefixer-core');

    grunt.initConfig({
        postcss: {
            options: {
                processors: [
                  autoprefixer({ browsers: ['last 2 version'] }).postcss
                ]
            },
            dist: { 
                files: {
                    'build/index.css': 'index.css'
                }
                 
            }
        },
         watch: {
            styles: {
                files: ['index.css'],
                tasks: ['postcss']
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['postcss']);
    
};
