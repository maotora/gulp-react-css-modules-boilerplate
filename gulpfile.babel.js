import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins({
    scope: ["devDependencies"]
});

/* Npm modules */
import del from 'del';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import webpack from 'webpack-stream';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

/* babel stuff */
import babelify from 'babelify';

/* Stylings */
import autoprefixer from 'autoprefixer';
import axis from 'axis';
import typographic from 'typographic';
import rupture from 'rupture';
import nib from 'nib';

const files = {
    dest: {
        css: (file) => { return path.normalize(path.dirname(file.path) + '/..'); },
        cssFiles: 'assets/**/*.css',
        pug: 'public/',
        jsx: 'public/jsx'
    },
    source: {
        css: 'assets/**/*.styl',
        pug: 'assets/views/*.pug',
        jsx: 'assets/jsx/main.js',
        jsxFiles: 'assets/jsx/**/*.js'
    }
};

export function pug() {
    return gulp.src(files.source.pug)
        .pipe($.pug({
                pretty: true
        }))
        .pipe($.connect.reload())
        .pipe(gulp.dest(files.dest.pug));
}

export function styles() {
    return gulp.src(files.source.css)
        .pipe($.stylus({
            use: [rupture(), axis(), typographic(), nib()]
        }))
        .pipe($.plumber())
        .pipe($.connect.reload())
        .pipe(gulp.dest(files.dest.css));
}

export function react(done) {
    gulp.src(files.source.jsx)
        .pipe(webpack({
            watch: true,
            plugins: [
                new ExtractTextPlugin('app.css', {
                    allChunks: true
                })
            ],
            output: {
                path: path.resolve(__dirname + 'public'),
                filename: '[name].js'
            },
            module: {
                loaders: [
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
                    },
                    {
                        test: /\.js$/,
                        loaders: [
                            "babel"
                        ]
                    }
                ]
            }
        }))
        .pipe($.connect.reload())
        .pipe(gulp.dest(files.dest.jsx));

        done();
}

export function connect() {
    $.connect.server({
        root: 'public',
        livereload: true
    });
}

export function watch() {
    $.util.log('watching...');
    gulp.watch(files.source.css, styles);
    gulp.watch(files.source.pug, pug);
    gulp.watch(files.source.jsxFiles, react);
}

const clean = (file) => {
    return del([file], {force: true});
};

const cleanJsx =  () => { return clean(files.dest.jsx);};

const cleanStyles =  () => { return clean(files.dest.cssFiles);};

const cleanHtml = () => { return clean(files.dest.pug); };

export { cleanStyles, cleanHtml, cleanJsx };

gulp.task('jsx', gulp.series(cleanJsx, react));

gulp.task('clean', gulp.parallel(cleanJsx, cleanStyles, cleanHtml));

gulp.task('styles', gulp.series(cleanStyles, styles));

gulp.task('watch', watch);

gulp.task('pug', gulp.series(cleanHtml, pug));

gulp.task('connect', connect);

gulp.task('default', gulp.parallel('pug', 'styles', 'jsx', 'connect', 'watch'));
