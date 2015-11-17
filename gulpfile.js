(function() {
	'use strict';

	var gulp = require('gulp');

	var concat = require('gulp-concat');
	var concatCss = require('gulp-concat-css');
	var del = require('del');
	var minifyCss = require('gulp-minify-css');
	var sass = require('gulp-sass');
	var uglify = require('gulp-uglify');

	gulp.task('default', ['css', 'js', 'clean']);

	gulp.task('css', ['sass', 'concatCss', 'minifyCss']);
	gulp.task('js', ['concat', 'uglify']);

	gulp.task('clean', ['css', 'js'], function() {
		return del([
			'./tmp/**'
		]);
	});

	gulp.task('concat', function() {
		return gulp.src([
			'./bower_components/angular/angular.js',
			'./bower_components/angular-route/angular-route.js',
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/bootstrap/dist/js/bootstrap.js',
			'./bower_components/oauthio-web/dist/oauth.js'
		])
		.pipe(concat('dependencies.js'))
		.pipe(gulp.dest('./tmp'));
	});

	gulp.task('concatCss', ['sass'], function() {
		return gulp.src([
			'./bower_components/normalize.css/normalize.css',
			'./bower_components/html5-boilerplate/dist/css/main.css',
			'./bower_components/bootstrap/dist/css/bootstrap.css',
			'./bower_components/bootstrap/dist/css/bootstrap-theme.css',
			'./tmp/css/*.css'
		])
		.pipe(concatCss('styles.css'))
		.pipe(gulp.dest('./tmp'));
	});

	gulp.task('minifyCss', ['concatCss'], function() {
		return gulp.src('./tmp/styles.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('./css'));
	});

	gulp.task('sass', function() {
		return gulp.src('./sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./tmp/css'));
	});

	gulp.task('uglify', ['concat'], function() {
		return gulp.src([
			'./bower_components/modernizr/modernizr.js',
			'./tmp/dependencies.js'
		])
		.pipe(uglify())
		.pipe(gulp.dest('./js/vendor'));
	});
})();
