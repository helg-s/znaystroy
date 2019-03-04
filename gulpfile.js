var gulp = require('gulp'),
	sass = require('gulp-sass'), //переводит SASS в CSS и компилирует
	concat = require("gulp-concat"), //объединение файлов - конкатенация
	watch = require('gulp-watch'), //обновление файлов в режиме реального времени
	pug = require('gulp-pug'), //упрощенная верстка, переводит из Pug в HTML
	prefixer = require('gulp-autoprefixer'), //проставляет кроссбраузерные префиксы
	imagemin = require('gulp-imagemin'), //оптимизация графики
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	pngquant = require('imagemin-pngquant'),
	cssmin = require('gulp-minify-css'), //мифинификация css
	browserSync = require("browser-sync"); //производит автообновление страницы
	//Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
	gulp.task("sass", function() {
	    return gulp.src("src/style/*.sass")
	    	.pipe(concat('styles.sass'))
	    	.pipe(sass())
	    	.pipe(prefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
	    	//.pipe(cssmin())
	    	.pipe(gulp.dest("dist/css"))
	    	.pipe(browserSync.reload({
				stream: true
			}))
	});

	//pug
	gulp.task('pug', function(){
		return gulp.src('src/*.pug')
			.pipe(pug({pretty: true}))
			.on('error', function(err)  {
				console.log(err);
				this.emit('end');
			})
			.pipe(gulp.dest("dist"))
			.pipe(browserSync.reload({
				stream: true
			}))
	});

	//scripts
	gulp.task("scripts", function() {
	     return gulp.src("src/js/*.js")
	        .pipe(gulp.dest("dist/js"))
	});

	//image
	gulp.task('images', function () {
	  return gulp.src('src/images/**/*.{jpg,png,jpeg,svg}') 
	  .pipe(imagemin([
	      imagemin.gifsicle({interlaced: true}),
	      imagemin.jpegtran({progressive: true}),
	      imageminJpegRecompress({
	        progressive: true,
	        loops: 5,
	        min: 70,
	        max: 85,
	        quality:'medium'
	      }),
	      imagemin.optipng({optimizationLevel: 3}),
	      pngquant({quality: '70-85', speed: 5})
	    ],{
	      verbose: true
	    }))
	  .pipe(gulp.dest('dist/images')) 
	  .pipe(browserSync.reload({stream: true})); 
	});

	//Автообновление страницы
	gulp.task('browser-sync', function () {
	  var files = [
	    'dist/index.html',
	    'dist/css/*.css',
	    'dist/js/*.js'
	  ];  
	  browserSync.init(files, {
	    server: {
	      baseDir: 'dist'
	    }
	  });
	});

	//Обновление файлов в режиме реального времени
	gulp.task('watch', function(){
		gulp.watch('src/style/*.sass', ['sass']);
	    gulp.watch('src/*.pug', ['pug']);
	    gulp.watch('src/blocks/*.pug', ['pug']);
	    gulp.watch('src/js/*.js', ['scripts']);
	    gulp.watch('src/images/**/*', ['image']);
	});

	//Данной строкой мы запускаем все прописанные здесь таски. Этот таск по умолчанию, который запускает одновременно все перечисленные в нем таски.
	gulp.task("default", ["watch", "browser-sync", "sass", "pug", "scripts", "images"]);