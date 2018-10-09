const gulp = require('gulp');
const pug = require('gulp-pug');
const electron = require('electron-connect').server.create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./dev/webpack.config.js');
const {copyChain, routes} = require('./dev/gulpChain.json');
const {distPath, srcPath} = require('./dev/path');

gulp.task('make_bundle', () => {
  return new Promise((res) => {
    for(var i = 0; i < routes.length; i++){
      webpackStream(webpackConfig.config(routes[i]), webpack)
        .pipe(gulp.dest('./dist/bundles/'));
    }
    res();
  });
});

gulp.task('pug_compile', () => {
  return new Promise((res) => {
    gulp.src(['./src/**/*.pug', '!./pug/**/_*.pug'])
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('./dist'));
    res();
  });
});

gulp.task('asset_copy', () => {
  return new Promise((res) => {
    for(var i = 0; i < copyChain.length; i++){
      gulp.src(copyChain[i].src, {base: copyChain[i].base})
        .pipe(gulp.dest(copyChain[i].dest));
    }
    res();
  });
});

gulp.task('watcher', () => {
  new Promise((res) => {
    gulp.watch('./src/**', gulp.parallel('pug_compile', 'asset_copy', 'make_bundle'));
    gulp.watch('./src/app/main.js', () => {
      electron.restart();
    });
    electron.start();
  });
});

gulp.task('start', gulp.series(gulp.parallel('pug_compile', 'asset_copy'), 'make_bundle', 'watcher'));