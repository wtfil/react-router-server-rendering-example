var gulp = require('gulp');
var browserify = require('browserify');

var files = {
    js: {
        src: 'index.js',
        dest: 'bundle.js'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('reactify')
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('js-watch', function () {
    gulp.watch(files.js.src, ['js']);
});
