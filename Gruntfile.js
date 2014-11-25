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
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				freeze: true,
				immed: true,
				latedef: true,
				undef: true,
				unused: true,
				strict: true
			},
			dist: {
				src: 'js/*.js'
			}
		},
		fallbacks: {
			files: 'features/*.html'
		},
		watch: {
			fallbacks: {
				files: ['index.html', 'features/*'],
				tasks: ['fallbacks']
			},
			postcss: {
				files: ['index.css'],
				tasks: ['postcss']
			},
			jshint: {
				files: ['js/*.js'],
				tasks: ['jshint']
			}
		}
    });

	grunt.registerTask('fallbacks', 'Create fallbacks pages for reloading and direct linking.', function() {
		var files = grunt.file.expand(grunt.config('fallbacks.files')),
			template = grunt.file.read('index.html'),
			marker = ' feature appears here:-->',
			status = true;

		for (var i = 0; i < files.length; i++) {
			var f = files[i];
			var bare = f.slice(f.lastIndexOf('/')+1, f.lastIndexOf('.'));
			if (bare == 'index') {
				grunt.log.writeln('Please remove '+f+' from the features folder; it doesn\'t belong there.');
				status = false;
				continue;
			}
			grunt.log.writeln('creating ' + bare);

			var m = bare + marker;
			var insertionPoint = template.indexOf(m);
			if (insertionPoint < 0) {
				grunt.log.writeln('Marker not found: '+m);
				grunt.log.writeln('Please put it where the feature should be inserted in index.html');
				grunt.log.writeln('or remove '+f);
				status = false;
				continue;
			}
			insertionPoint += m.length;
			grunt.file.write(bare,
				template.slice(0, insertionPoint) +
				'<div class=feature>' +
				grunt.file.read(f) +
				'</div>' +
				template.slice(insertionPoint));
		}
		return status;
	});

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['postcss', 'fallbacks', 'jshint']);
};
