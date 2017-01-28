'use strict';

var gulp = require('gulp')
  , path = require('path')
  , fs = require('fs')
  , del = require('del')
  , runSequence = require('run-sequence')
  , $ = require('gulp-load-plugins')()

  // Config
  , port = 5000
  , browser = 'Google Chrome';


//       _
//   ___| | ___  __ _ _ __
//  / __| |/ _ \/ _` | '_ \
// | (__| |  __/ (_| | | | |
//  \___|_|\___|\__,_|_| |_|

gulp.task('clean', function (callback) {
  return del(['dist/']);
});


//             _           _
//  _ __ ___  (_)_ __ ___ | |
// | '_ ` _ \ | | '_ ` _ \| |
// | | | | | || | | | | | | |
// |_| |_| |_|/ |_| |_| |_|_|
//          |__/

gulp.task('mjml', function () {
  return gulp.src('src/*.mjml')
    .pipe($.mjml())
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/'))
    .pipe($.connect.reload());
});


//  _
// (_)_ __ ___   __ _  __ _  ___  ___
// | | '_ ` _ \ / _` |/ _` |/ _ \/ __|
// | | | | | | | (_| | (_| |  __/\__ \
// |_|_| |_| |_|\__,_|\__, |\___||___/
//                    |___/

gulp.task('img', function () {
  return gulp.src('src/images/*.{png,jpg,gif}')
    .pipe(gulp.dest('dist/images/'))
    .pipe($.connect.reload());
});


//  _           _ _     _
// | |__  _   _(_) | __| |
// | '_ \| | | | | |/ _` |
// | |_) | |_| | | | (_| |
// |_.__/ \__,_|_|_|\__,_|

gulp.task('build', ['img', 'mjml']);


//                                  _
//   ___ ___  _ __  _ __   ___  ___| |_
//  / __/ _ \| '_ \| '_ \ / _ \/ __| __|
// | (_| (_) | | | | | | |  __/ (__| |_
//  \___\___/|_| |_|_| |_|\___|\___|\__|
//

gulp.task('connect', function () {
  $.connect.server({
    root: 'dist/',
    livereload: true,
    port: 5000,
    open: {
      browser: 'Google Chrome'
    }
  });

  var openOptions = {
    uri: 'http://localhost:'+ port,
    app: browser
  };

  gulp.src('./')
    .pipe($.open(openOptions));
});


//                _       _
// __      ____ _| |_ ___| |__
// \ \ /\ / / _` | __/ __| '_ \
//  \ V  V / (_| | || (__| | | |
//   \_/\_/ \__,_|\__\___|_| |_|

gulp.task('watch', function () {
  gulp.watch(['src/images/*.{png,jpg,gif}'], ['img']);
  gulp.watch(['src/*.mjml'], ['mjml']);
});

gulp.task('default', function () {
  return runSequence('clean', ['build', 'connect', 'watch']);
});
