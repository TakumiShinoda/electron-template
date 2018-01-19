var gulp = require('gulp');
var pug = require('gulp-pug');
var electron = require('electron-connect').server.create();

gulp.task('pug_compile', () => {
  return gulp.src(['./src/**/*.pug', '!./pug/**/_*.pug'])
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('asset_copy', () => {
  gulp.src(['src/assets/**'], {base: 'src/assets'})
  .pipe(gulp.dest('./dist/asset'));
});

gulp.task('start', ['pug_compile', 'asset_copy'], () =>{
  gulp.watch(['./src/**'], () =>{
    gulp.run('pug_compile');
    gulp.run('asset_copy');
  });
  gulp.watch(['./main.js'], electron.restart);

  electron.start();
});
