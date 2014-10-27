//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
  grunt.initConfig({

    // Task configuration
    watch: {
		css: {
			files: ['css/*.css'],
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
			files: ['templates/*.html'],
			options: {
				livereload: true,
			},
		},
    },
    'http-server': {
        'dev': {
            root: '.',
            port: 8080,
            host: "0.0.0.0",
            showDir : true,
            autoIndex: true,
            // server default file extension
            ext: "html",
            runInBackground: true,
        }
    }
  });

// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');
// Task definition
	grunt.registerTask('server', ['http-server:dev','watch']);
	
};