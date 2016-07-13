module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		imagemin:{
			dynamic:{
				files: [{
					expand: true,
					cwd:'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'imgmin/'
				}]
			}
		},

		uncss:{
			dist:{
				files: {
					'css/main.css' : ['index.html']
				}
			}
		},

		watch: {
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['sass','cssmin'],
			},

			js:{
				files: ['js/*.js'],
				tasks: ['concat'],
			}
		},


		sass: {
			dist: {
				files: [{
					'css/main.css' : 'scss/main.scss'
				}]
			}
		},

		concat: {
			options: {
				separator: ';',
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */' ,
			},
			dist: {
				src:  ['js/*.js'],
				dest: 'js/<%= pkg.name %>-<%= pkg.version %>.js',
			}
		},

		uglify: {
			options: {
				manage: false
			},
			my_target: {
				files: [{
					'js/main.min.js' : ['js/main.js']
				}]
			}
		},

		cssmin:{
			my_target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css', '!*.min.css'],
					dest: 'css/',
					ext: '.min.css'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',['sass','cssmin','imagemin','concat','uglify']);

	grunt.task.run('notify_hooks');

};

