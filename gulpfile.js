const gulp = require('gulp')
const pug = require('gulp-pug')
const electron = require('electron-connect').server.create()
const webpack = require('webpack')
const plumber = require('gulp-plumber')
const webpackConfigMain = require('./dev/webpack.config.main.js')
const webpackConfigPreload = require('./dev/webpack.config.preload.js')
const webpackConfigRenderer = require('./dev/webpack.config.renderer.js')
const {copyChain, routes} = require('./dev/gulpChain.json')

function webpackBuildTask(config){
  return new Promise((res, rej) => {
    const StatsLogOption = {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      assets: true
    }

    try{
      webpack(config, (err, stats) => {
        if(err || stats.hasErrors()) throw(err || stats.toJson().errors)
        else{
          console.log(stats.toString(StatsLogOption))
          res()
        }
      })
    }catch(err){rej(err)}
  })
}

gulp.task('make_main', () => {
  return new Promise(async (res, rej) => {
    try{
      await webpackBuildTask(webpackConfigMain)
      res()
    }catch(err){rej(err)}
  })
})

gulp.task('make_bundle', () => {
  return new Promise(async (res, rej) => {
    let buildTasks = []

    try{
      for(let rt of routes){
        buildTasks.push(webpackBuildTask(webpackConfigPreload.config(rt)))
        buildTasks.push(webpackBuildTask(webpackConfigRenderer.config(rt)))
      }

      await Promise.all(buildTasks)
      res()
    }catch(err){rej(err)}
  })
})

gulp.task('pug_compile', () => {
  return new Promise((res) => {
    gulp.src(['./src/**/*.pug', '!./pug/**/_*.pug'])
      .pipe(plumber())
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('./dist'))
      .on('end', () => { res() })
  })
})

gulp.task('asset_copy', () => {
  return new Promise((mainRes, mainRej) => {
    let tasks = []

    for(let cc of copyChain){
      tasks.push(new Promise((subRes, subRej) => {
        try{
          gulp.src(cc.src, {encoding: false})
            .pipe(gulp.dest(cc.dest))
            .on('end', () => {subRes()})
        }catch(err){subRej(err)}
      }))
    }

    Promise.all(tasks)
      .then(() => {mainRes()})
      .catch((err) => {mainRej(err)})
  })
})

gulp.task('restart', () => {
  return new Promise((res) => {
    electron.restart()
    res()
  })
})

gulp.task('watcher', () => {
  new Promise((res) => {
    gulp.watch(['./src/**', '!./src/app/**'], gulp.series('dist'))
    gulp.watch('./src/app/**', gulp.series('make_main', 'restart'))
    electron.start('./dev/devStart.js')
    res()
  })
})

gulp.task('dist', gulp.parallel('asset_copy', 'pug_compile', 'make_bundle'))
gulp.task('start', gulp.series('make_main', 'dist', 'watcher'))