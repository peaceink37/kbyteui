const fs = require('fs');

var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var stripify = require('stripify');

var rev = require('gulp-rev')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var htmlreplace = require('gulp-html-replace');
var del = require('del');

var browserify = require('browserify');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');

var config = {
	sassPath:'./sass',
	bowerDir:'./bower_components'
};


// only need to run this when adding or subtracting bower js packages
gulp.task('bowerjs', function(){
	var jsFiles = ['src/js/*'];
	return gulp.src(mainBowerFiles().concat(jsFiles))
		.pipe(filter('*.js'))
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/scripts'))
		.pipe(gulp.dest('./dist/scripts'));
});

// Browserify task for distribution
gulp.task('browserify', function() {
	return browserify('./public/scripts/browserifymain.js')
		.bundle()
		.pipe(stripify())
		.pipe(source('bundle.js')) // gives streaming vinyl file object
		.pipe(ngAnnotate())
		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(uglify()) // now gulp-uglify works
		.pipe(gulp.dest('./dist/scripts'));
});

// Browserify task for dev
gulp.task('browserifydev', function() {
	return browserify('./public/scripts/browserifymain.js')
		.bundle()
		.pipe(source('bundle.js')) // gives streaming vinyl file object
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('icons', function(){
	return gulp.src(config.bowerDir+'/fontawesome/fonts/**.*')
		.pipe(gulp.dest('./public/fonts'))
		.pipe(gulp.dest('./dist/fonts'));

});


gulp.task('styles', ['cleanStyles'], function(){

	return gulp.src(config.sassPath + '/main.scss')
		.pipe(sass({
			style: 'compressed',
			loadPath: [
				'./sass',
				config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
				config.bowerDir + '/bootstrap-sass-official/assets/fonts',
				config.bowerDir + '/fontawesome/scss'
			]
		}))
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		}))
		.pipe(rev())
		.pipe(gulp.dest('./dist/styles'))
		.pipe(gulp.dest('./public/styles'))

});


gulp.task('cleanStyles', function () {
	return del([
		'./public/styles/**/*',
		'./dist/styles/**/*'
		// remember to bang files or file groups we do not want to remove
		//'!public/styles/*.json'
	]);
});

gulp.task('move-views', function(){

	gulp.src(['./public/views/**/*']).pipe(gulp.dest('./dist/views'));

});

gulp.task('webserver', function(){
	connect.server({
		root:'./public',
		livereload:true
	});
});

gulp.task('watch', function() {
	// watch scss files
	gulp.watch('sass/**/*.scss', function(){
		gulp.run('styles');
	});


});

var versionString = '';

gulp.task('version', function(){

	versionCss();
	console.log(" version css "+versionString);
	//readFiles();

	gulp.src('./public/index.html')
		.pipe(htmlreplace({
			'css':'./public/styles/main.css'
		}))
		.pipe(gulp.dest('./public'));
});

gulp.task('styleversion',['styles'], function(){

	var openBlock = '<!-- build:csszz -->\n';
	var closeBlock =  '<!-- endbuild -->';

	fs.readdir('./public/styles', function(err, files) {
		if (err) return;
		files.forEach(function(f) {
			if(f.indexOf('.map') != -1){

			} else {
				if(f.indexOf('.css') != -1){

					vCss = f;
					console.log('Files: ' + f + "  vCss var "+vCss);
					versionString = vCss;

					return gulp.src('./public/index.html')
						.pipe(htmlreplace({
							'csszz':openBlock+'    <link rel="stylesheet" type="text/css" href="./styles/'+vCss+'">\n'+closeBlock
						}))
						.pipe(gulp.dest('./public'));

				}

			}

		});
	});

});


gulp.task('default', ['bowerjs', 'browserifydev', 'icons', 'styles', 'webserver', 'watch'], function() {

});

gulp.task('distribution', ['bowerjs', 'browserify', 'styles', 'icons', 'move-views'], function() {

});