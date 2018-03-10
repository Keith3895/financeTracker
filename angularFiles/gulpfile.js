const gulp = require('gulp');

gulp.task('moveBuilds',()=>{
    return gulp.src(['dist/**/*'])
    .pipe(gulp.dest('../public/'))
    .pipe(gulp.dest('../mobileApp/www'));
    
});