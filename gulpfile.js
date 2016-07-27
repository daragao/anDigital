var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var glob = require('glob');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var es = require('event-stream');
var connect = require('gulp-connect');

var WATCH_JS = true;

function buildJS(watch,filepath) {
    var notifyMsg = ' -> (' +  String(filepath) + ') browserify ended';
    var basename = filepath.match(/(?:[^\/]*\/)*([^\/\.]*)\.js/)[1];
    var bundlerProps = {
        entries: [filepath],
        extensions: ['.jsx'],
        cache: {},
        packageCache: {},
        debug:true
    };
    var bundler = browserify(bundlerProps);
    if(watch) {
        bundler = watchify(bundler);
    }

    var transformerProps = { presets: ['es2015', 'react'] };
    var transformer = bundler.transform('babelify',transformerProps);

    var update = function() {
        var pipeResult = transformer.bundle()
        .on('error', function(err) { console.log(err.toString()); })
        .pipe(source(basename+'.js'))
        //.pipe(buffer()).pipe(uglify())
        .pipe(gulp.dest('bin/js')).pipe($.notify({ message: notifyMsg }));
        return pipeResult;
    };
    bundler.on('update',update);

    var result = update();
    return result;
}

gulp.task('serve', function() {
  connect.server();
});

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('js-babel-multiple', function() {
    var baseDir = 'src/apps/';
    var dirpath = baseDir + '*.js';

    var entry = glob.sync(dirpath);
    var tasks = entry.map(function(filepath) {
        return buildJS(WATCH_JS,filepath);
    });

    return es.merge.apply(null, tasks);
});

gulp.task('sass', function() {

    var sassPaths = [
        'bower_components/foundation-sites/scss',
        'scss'
    ];

    return gulp.src('scss/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        includePaths: sassPaths,
        outputStyle: 'expanded',
        errLogToConsole: true }) .on('error', $.sass.logError))
    //.pipe($.autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
    .pipe($.rename('app.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('bin/css'))
    .pipe($.notify({ message: ' -> sass ended' }));
});

gulp.task('clean', function () {
    var dirs = ['bin'];
    return gulp.src(dirs, {read: false})
    .pipe($.clean());
});

gulp.task('build',['js-babel-multiple','sass']);
gulp.task('watch',['build'],function() {
    //js-babel-multiple already watches js files! with watchify
    gulp.watch(['bin/scss/**'], ['sass']);
});
