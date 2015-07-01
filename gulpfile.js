var gulp = require('gulp');
var browserify = require('browserify');
var server = require('http-server');
var watchify = require('watchify');
var gutil = require('gulp-util');
var fs = require('fs');

var files = {
    js: {
        src: 'public/index.js',
        dest: 'public/bundle.js'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('reactify')
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('server', function (cb) {
	var port = process.env.NODE_PORT || 3000;
	server.createServer().listen(port, cb);
	console.log('started at', port);
});

gulp.task('js-watch', function () {
    var args = watchify.args;
    args.degub = true;
    var bundler = watchify(browserify(files.js.src, args));

    bundler.transform('reactify');
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
