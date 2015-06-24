var gulp = require('gulp');
var browserify = require('browserify');
var server = require('http-server');
var fs = require('fs');

var files = {
    js: {
        src: 'index.js',
        dest: 'bundle.js'
    }
};

gulp.task('js', function () {
    return browserify(files.js.src)
        .transform('reactify')
        .on('error', function (e) {
        	console.log(e);
        })
        .bundle()
        .pipe(fs.createWriteStream(files.js.dest))
});

gulp.task('server', function (cb) {
	var port = process.env.NODE_PORT || 3000;
	server.createServer().listen(port, cb);
	console.log('started at', port);
});

gulp.task('js-watch', function () {
    gulp.watch(files.js.src, ['js']);
});

gulp.task('dev', ['js-watch', 'server']);
