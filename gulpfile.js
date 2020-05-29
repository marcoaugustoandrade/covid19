const gulp = require('gulp')
const minify = require('gulp-minify')
const cleanCSS = require('gulp-clean-css')

gulp.task('minify-js', () => {
  return gulp.src('src/assets/js/*.js', {allowEmpty: true})
    .pipe(minify({
        ext: {
            min: '.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest('html/assets/js/'))
})

gulp.task('minify-css', () => {
    return gulp.src('src/assets/css/style.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('html/assets/css/'))
})

gulp.task('copy-html', () => {
    return gulp.src('src/index.html', {allowEmpty: true})
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('html/'))
})

gulp.task('copy-images', () => {
    return gulp.src('src/assets/images/*', {allowEmpty: true})
    .pipe(gulp.dest('html/assets/images/'))
})

gulp.task('default', gulp.series(['minify-js', 'minify-css', 'copy-html','copy-images']))
