const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const cleancss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')


gulp.task('sass', () => {
    gulp.src('assets/sass/main.min.scss')
        .pipe(sourcemaps.init())
            .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
            .pipe(sass().on('error', sass.logError))
            .pipe(cleancss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
})

gulp.task('js', () => {
    gulp.src('assets/js/*.js')
        .pipe(sourcemaps.init())
            .pipe(babel({presets: ['@babel/env']}))
            .pipe(concat('main.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'))
})

gulp.task('compressImages', () =>
    gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
);

gulp.task('watch', () => {
    gulp.watch('assets/js/*.js', ['js'])
    gulp.watch('assets/sass/*', ['sass'])
    gulp.watch('public/images/*', ['compressImages'])
})

gulp.task('default', [
    'js',
    'sass',
    'watch'
])

