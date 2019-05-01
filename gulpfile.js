const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');

const browserSync = require('browser-sync');

const config = require('./gulpconfig');


const isDevelopment = !process.env.NODE_ENV || 
process.env.NODE_ENV.trim() == 'development';

gulp.task('clean', () => {
  return del([config.__baseDir]);
});

gulp.task('html:build', () => {
  return gulp.src(config.html.src)
  .pipe($.plumber({
    errorHandler: err => {
      $.notify.onError({
        title: 'html building error',
        message: err.message
      })(err)   
    }
  }))
  .pipe($.debug({title: 'html'}))
  .pipe($.pugLint())
  .pipe($.pug($.if(isDevelopment, config.html.params)))
  .pipe(gulp.dest(config.html.dest))
});

gulp.task('styles:build', () => {
  return gulp.src(config.css.src)
  .pipe($.plumber({
    errorHandler: err => {
      $.notify.onError({
        title: 'css building error',
        message: err.message
      })(err)   
    }
  }))
  .pipe($.cached('csscache'))
  .pipe($.debug({title: 'css'}))
  .pipe($.if(isDevelopment, $.sourcemaps.init()))
  .pipe($.remember('csscache'))
  .pipe($.scssLint(config.css.lint))
  .pipe($.sass($.if(!isDevelopment, config.css.params)))
  .pipe($.autoprefixer(config.css.prefix))
  .pipe($.rename(config.css.rename))
  .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
  .pipe(gulp.dest(config.css.dest));
});

gulp.task('js:build', () => {  
  return gulp.src(config.js.src)
  .pipe($.plumber({
    errorHandler: err => {
      $.notify.onError({
        title: 'js build error',
        message: err.message
      })(err)
    }
  }))
  .pipe($.cached('jscache'))
  .pipe($.debug({title: 'js'}))
  .pipe($.if(isDevelopment, $.sourcemaps.init()))
  .pipe($.remember('jscache'))
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failOnError())
  .pipe($.concat(config.js.rename))
  .pipe($.babel(config.js.babel))
  .pipe($.if(!isDevelopment, $.uglify()))
  .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
  .pipe(gulp.dest(config.js.dest));
});

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
  .pipe($.newer(config.fonts.dest))
  .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('images', () => {
  return gulp.src(config.img.src)
  .pipe($.newer(config.img.dest))
  .pipe(gulp.dest(config.img.dest));
});

gulp.task('svg:build', () => {
  return gulp.src(config.svg.src)
  .pipe($.newer(config.svg.dest))
  .pipe($.svgmin(config.svg.svgmin))
  .pipe($.svgstore(config.svg.svgstore))
  .pipe($.cheerio(config.svg.cheerio))
  .pipe($.rename(config.svg.rename))
  .pipe(gulp.dest(config.svg.dest));
});

gulp.task('php', () => {
  return gulp.src(config.php.src)
  .pipe(gulp.dest(config.php.dest));
});

gulp.task('watching', () => {
  gulp.watch(config.html.watch, gulp.series('html:build'));
  gulp.watch(config.css.watch, gulp.series('styles:build'));
  gulp.watch(config.js.watch, gulp.series('js:build'));

  gulp.watch(config.fonts.watch, gulp.series('fonts'));
  gulp.watch(config.img.watch, gulp.series('images'));
  
  gulp.watch(config.svg.watch, gulp.series('svg:build'));

  gulp.watch(config.php.watch, gulp.series('php'));
});

gulp.task('server', () => {
  browserSync.init({ server: config.__baseDir });
  gulp.watch(config.__baseDir).on('change', browserSync.reload);  
});

gulp.task('build', gulp.series('clean', 'images', 'fonts', 'php', 'js:build', 'styles:build', 'html:build'));

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watching')));