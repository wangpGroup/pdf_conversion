// 二哲 - 2016年08月15日
const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const watch = require('gulp-watch');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const del = require('del');
const watchPath = require('gulp-watch-path');
const replace = require('gulp-replace');

const browserSync = require('browser-sync').create();
const base64 = require('gulp-base64');
const runSequence = require('run-sequence');
const bsReload = browserSync.reload;
const postcss = require('gulp-postcss'); //postcss本身
const autoprefixer = require('autoprefixer');
const precss = require('precss'); //提供像scss一样的语法
const cssnano = require('cssnano');  //更好用的css压缩!
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
var webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        alias: {
            common: path.join(__dirname, "src/common"),
            static: path.join(__dirname, "src/static")
        },
        extensions: ['', '.js', '.vue', '.scss', '.css']
    },
    output: {
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[id].js?[hash]'
    },
    module: {
        noParse: [/vue.js/],
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'images/[name].[ext]?[hash:10]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    //limit: 5000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [],
    babel: { //配置babel
        "presets": ["es2015", 'stage-2'],
        "plugins": ["transform-runtime"]
    }
};

const processes = [
    autoprefixer({browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']}),
    precss,
    cssnano
];
// background: color($blue blackness(20%));  precss为了用这样的语法
const src = {
    static: './src/static/**/*.*',
    vendors: './src/vendors/**/*.*',
    sass: './src/sass/**/*.{sacc,scss}',
    common: './src/common/**/*.{vue,js}',
    modules: './src/modules/**/*.{vue,js,html}',
    es6: './src/modules/**/main.js',
    views: './src/modules/**/index.html'
};
const dev = {
    static: './dev/static/',
    css: './dev/static/css/',
    fonts: './dev/static/fonts/',
    images: './dev/static/images/',
    js: './dev/static/js/',
    vendors: './dev/vendors/',
    views: './dev/'
};

gulp.task('build', function () {
    gulp.src('./dev/vendors/**/*.*').pipe(gulp.dest('./dist/vendors/'));
    gulp.src('./dev/static/fonts/*.*').pipe(gulp.dest('./dist/static/fonts/'));
    gulp.src('./dev/static/images/**/*.*').pipe(gulp.dest('./dist/static/images/'));
    gulp.src('./dev/static/js/*.js').pipe(replace('/static/', 'static/')).pipe(uglify()).pipe(gulp.dest('./dist/static/js/'));
    gulp.src('./dev/static/css/*.css').pipe(postcss(processes)).pipe(minifycss()).pipe(gulp.dest('./dist/static/css/'));
    gulp.src('./dev/*.html').pipe(gulp.dest('./dist/'));

});
gulp.task('dev', function () {
    server();
    gulp.start('static', 'vendors', 'sass', 'es6', 'views');
});
gulp.task('clean', function () {
    del([
        'dist/',
        'dev/'
    ]);
});
gulp.task('static', function () {
    return gulp.src(src.static)
        .pipe(gulp.dest(dev.static));
});
gulp.task('vendors', function () {
    return gulp.src(src.vendors)
        .pipe(gulp.dest(dev.vendors));
});
gulp.task('sass', function () {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processes))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(dev.css));
});
gulp.task('es6', function () {
    compileJS(src.es6);
});
gulp.task('views', function () {
    return gulp.src(src.views)
        .pipe(rename(function (path) {
            path.basename = path.dirname;
            path.dirname = "";
        }))
        .pipe(gulp.dest(dev.views));
});

function server() {
    browserSync.init(dev.views, {
        startPath: "/",
        files: ["dev/**/*.*", "!dev/vendors/**/*.*"],
        server: {
            baseDir: 'dev'
        },
        open: false,
        notify: true
    });

    watch([src.static, '!src/**/*.*___'], function (event) {
        var paths = watchPath(event, 'src/', 'dev/');
        cp(paths.srcPath, paths.distDir);
    });
    watch([src.vendors, '!src/**/*.*___'], function (event) {
        var paths = watchPath(event, 'src/', 'dev/');
        cp(paths.srcPath, paths.distDir);
    });
    watch([src.sass], function (event) {
        var paths = watchPath(event, 'src/sass/', 'dev/css/');
        return gulp.src(paths.srcPath)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(processes))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(dev.css));
    });
    watch([src.common], function (event) {
        gulp.start('es6', 'views');
    });
    watch(['./src/modules/*/index.html'], function (event) {
        var paths = watchPath(event, 'src/modules/', 'dev/modules/');
        var business = paths.srcDir.split('\\');
        var modulePath = business[0] + '\\' + business[1] + '\\' + business[2] + '\\';
        compileView(paths.srcPath, dev.views);
    });
    watch(['./src/modules/**/*.{vue,js}'], function (event) {
        var paths = watchPath(event, 'src/modules/', 'dev/modules/');
        var business = paths.srcDir.split('\\');
        var modulePath = business[0] + '\\' + business[1] + '\\' + business[2] + '\\';
        compileJS(modulePath + 'main.js', dev.js);
    });
}
function compileJS(path, dest) {
    dest = dest || dev.js;
    return gulp.src(path)
        .pipe(named(function (file) {
            var path = JSON.parse(JSON.stringify(file)).history[0];
            var sp = 'modules\\';
            var target = path.split(sp)[1].replace('\\main', '');
            return target.substring(0, target.length - 3);
        }))
        .pipe(webpackStream(webpackConfig))
        .on('error', function (err) {
            this.end()
        })
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest(dest))
}

function compileView(src, dest) {
    gulp.src(src)
        .pipe(rename(function (path) {
            path.basename = src.split('\\')[2];
        }))
        .pipe(gulp.dest(dest));
}

function cp(from, to) {
    gulp.src(from)
        .pipe(gulp.dest(to));
}

