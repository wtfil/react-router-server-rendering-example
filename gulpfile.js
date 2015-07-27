var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var watchify = require('watchify');
var nodemon = require('gulp-nodemon');

var files = {
    js: {
        src: 'public/index.js',
        dest: 'public/bundle.js'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('babelify')
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('server', function () {
	nodemon({
		script: './server/index.js',
		ext: 'js',
		watch: ['server', 'public']
	});
});

gulp.task('js-watch', function () {
    var args = watchify.args;
    args.degub = true;
    var bundler = watchify(browserify(files.js.src, args));

    bundler.transform('babelify');
    bundler.on('update', rebundle);

    function onError(e) {
        gutil.log(gutil.colors.red(e.message));
    }

    function rebundle() {
        var start = Date.now();

        return bundler.bundle()
          .on('error', onError)
          .on('end', function () {
              var time = Date.now() - start;
              gutil.log('Building \'' + gutil.colors.green(files.js.src) + '\' in ' + gutil.colors.magenta(time + ' ms'));
          })
          .pipe(fs.createWriteStream(files.js.dest));
    }
    rebundle();
});

gulp.task('dev', ['js', 'js-watch', 'server']);
