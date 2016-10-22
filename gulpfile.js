var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
// var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var spritesmith = require("gulp-spritesmith");
var gulpif = require("gulp-if");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

 
gulp.task('sass', function () {
  return gulp.src('sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions','ie 8'], { cascade: true }))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('scripts', function() {
  return gulp.src([
    'script/*.js'
  ])
  .pipe(concat('scripts.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});
gulp.task('image', function (){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))

});
gulp.task('sprites', function () {
    return  gulp.src('img/**/png/*.*')
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    styleName: 'sprite.css',
                    imgPath: '../images/sprites/sprite.png',
                    groupBy: 'skin'
                }))
                .pipe(gulpif('*.png', gulp.dest('dist/images/sprites')))
                .pipe(gulpif('*.css', gulp.dest('dist/css/')));
});


gulp.task('watch', function () {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('сss/style.css', ['сss']);
  gulp.watch('img/*.*', ['image']);
  gulp.watch('img/**/png/*.*',['sprites']);
});


gulp.task('default', function() {
  // place code for your default task here
});

