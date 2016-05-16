/* File: gulpfile.js */

// grab our packages
var gulp        = require('gulp'),
  gutil         = require('gulp-util'),
  del           = require('del'),
  runSequence   = require('run-sequence'),
  spawn         = require('child_process').spawn,
  exec          = require('child_process').exec,
  less          = require('gulp-less'),
  cleanCss      = require('gulp-clean-css'),
  cssnano       = require('gulp-cssnano'),
  critical      = require('critical'),
  imagemin      = require('gulp-imagemin'),
  pngquant      = require('imagemin-pngquant'),
  htmlmin       = require('gulp-htmlmin'),
  uglify        = require('gulp-uglify'),
  inject        = require('gulp-inject'),
  concat        = require('gulp-concat'),
  gulpFilter    = require('gulp-filter'),
  sourcemaps    = require('gulp-sourcemaps'),
  rename        = require('gulp-rename'),
  compress      = require('compression'),
  browserSync   = require('browser-sync').create();
  os            = require('os');

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(['./_drafts/*.md','./_posts/*.md','./*.md','./*.html','_config.yml','_localPreview.yml'], ['jekyll-build-dev']);
  gulp.watch('./*.less', ['less', 'jekyll-build-dev','browser-sync-reload']);
  gulp.watch(['./_site/**/*.html'], ['browser-sync-reload']);
});

// clean
gulp.task('clean', function(){
  del([
      './_site/*',
      './css/*.min.css',
      './js/*.min.js'
    ]);
});

// LESS to CSS task
gulp.task('less', function(){
  return gulp.src('./less/*.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(gulp.dest('./css/'));
});

// CSS min
gulp.task('css-min', function(){
  return gulp.src('./css/*.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(concat('master.css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('minify-html', function(){
  var opts = {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true
  };

  return gulp.src('./_site/**/*.html')
    .pipe(htmlmin(opts))
    .pipe(gulp.dest('./_site/'));
});

// build dist JS assets
gulp.task('build-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'));
});

//
// concat *.js to `vendor.js`
// and *.css to `vendor.css`
// rename fonts to `fonts/*.*`
gulp.task('bower', ['bower-css','bower-js']);

gulp.task('bower-css', function(){
  return gulp.src([
                    './_site/lib/bootstrap/dist/css/bootstrap.css'
                  ])
    .pipe(concat('vendor.css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(rename(function(path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
    .pipe(gulp.dest('./_site/css/'));
});

gulp.task('bower-js', function() {
  var jsFilter = gulpFilter('**/*.js');
  return gulp.src(bower())
    .pipe(jsFilter)
    .pipe(concat('a_vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/js/'));
});

gulp.task('join-css', function() {
  return gulp.src([
            './_site/css/vendor.min.css',
            './_site/css/master.min.css'])
    .pipe(concat('site.min.css'))
    .pipe(gulp.dest('./_site/css/'));
});

// not currently using, too fiddly
gulp.task('critical', function () {
    return critical.generate({
        inline: true,
        base: '_site/',
        src: 'index.html',
        dest: '_site/index.html',
        minify: true,
        width: 320,
        height: 480
    });
});

// optimize those images!
gulp.task('image-min', function() {
    return gulp.src('./_site/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./_site/img'));
});

// wire app resources into pages
gulp.task('index', function(){
  var target = gulp.src(['./_site/**/*.html','./_site/index.html']);
  var sources = gulp.src([
                  './_site/css/site.min.css',
                  './_site/js/*.min.js'
                ], { ignorePath: '_site', read: false });
  return target.pipe(inject(sources, { ignorePath: '_site' }))
    .pipe(gulp.dest('./_site'));
});

// loading browser-sync as a proxy, must load after json-server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "_site",
            middleware: [compress()]
        },
        ui: {
          weinre: {
            port: 9090
          },
          port: 3000
        }
    });
});

// reload browserSync
gulp.task('browser-sync-reload', function(){
  browserSync.reload();
});

// main point of entry to building the jekyll site and browser-sync
gulp.task('jekyll-dev', function(){
  runSequence(
      'clean',
      'less',
      'css-min',
      'build-js',
      'jekyll-build-dev',
      'join-css',
      'image-min',
      'index',
      'minify-html',
      'watch',
      'browser-sync');
});

// main point of entry to building, watching with local preview, no browser-sync
gulp.task('jekyll-alt-dev', function(){
  runSequence(
      'clean',
      'less',
      'css-min',
      'build-js',
      'jekyll-build-dev',
      'join-css',
      'image-min',
      'index',
      'minify-html');
});

// main point of entry to building the jekyll site
gulp.task('jekyll-dist', function(){
  runSequence(
      'clean',
      'less',
      'css-min',
      'build-js',
      'jekyll-build-dist',
      'join-css',
      'image-min',
      'index',
      'minify-html');
});

// jekyll build for dev preview, using bundle exec
gulp.task('jekyll-build-dev', function(done){
  browserSync.notify('Building Jekyll');
  if( os.type() == 'Windows_NT' ){
        console.log('On Windows');
        //return spawn(process.env.comspec, ['/S', '/C/', 'bundle', 'exec', 'jekyll', 'build', '--drafts', '--baseurl ""', '--incremental' ], {stdio: 'inherit'})
        //    .on('close', done);
    return exec('bundle exec jekyll.bat build --drafts --config _config.yml,_localPreview.yml', function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: '+error);
        }
      }).on('close', done);
  }else{
      return spawn('bundle', ['exec', 'jekyll', 'build', '--drafts', '--config', '_config.yml,_localPreview.yml', '--incremental' ], {stdio: 'inherit'})
        .on('close', done);
  }
});

// jekyll build for dist, for deploy to gh-pages, using bundle exec
gulp.task('jekyll-build-dist', function(done){
  browserSync.notify('Building Jekyll');
  return spawn('bundle', ['exec', 'jekyll', 'build' ], {stdio: 'inherit'})
    .on('close', done);
});

// define the default task and add the watch task to it
gulp.task('default', ['jekyll-dev']);
gulp.task('watch-only', ['jekyll-alt-dev']);
gulp.task('build', ['jekyll-dist']);
