//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
  grunt.initConfig({

    // Task configuration
    watch: {
		sass: {
			files: ['scss/*.scss'],
			tasks: ['sass'],
			options: {
				livereload: true,
			},
		},
		js: {
			files: ['scripts/**/*.js'],
			options: {
				livereload: true,
			},
		},
		templates: {
			files: ['templates/*.html','templates/shared/*.html'],
			options: {
				livereload: true,
			},
		},
    },
    'http-server': {
        'dev': {
            root: '.',
            // port: 8080,
            host: "0.0.0.0",
            showDir : true,
            autoIndex: true,
            // server default file extension
            ext: "html",
            runInBackground: true,
        }
    },
    sass: {
		dist: {
			files: [{
				expand: true,
				// 'css/main.css':'scss/*.scss',
				src: ['scss/*.scss'],
				dest: 'css/',
				ext: '.css'
			}],
			noCache: true,
		}
	}
  });

// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-sass');
// Task definition
	grunt.registerTask('server', ['http-server:dev','watch']);
	
};