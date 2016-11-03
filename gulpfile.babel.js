import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins({
    scope: ["devDependencies"],
    camelize: true
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
        pug: 'public/',
        jsx: 'public/jsx',
        legacy: 'public/jsx/'
    },
    source: {
        pug: 'assets/views/*.pug',
        jsx: 'assets/jsx/main.js',
        jsxFiles: 'assets/jsx/**/*.js',
        legacy: ['node_modules/react-grid-layout/css/styles.css', 'node_modules/react-resizable/css/styles.css']
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

export function legacyCss() {
    return gulp.src(files.source.legacy)
        .pipe($.concat('legacy.css'))
        .pipe($.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(files.dest.legacy));
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
                        test: /\.(styl|css)$/,
                        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus')
                    },
                    {
                        test: /\.js$/,
                        loaders: [
                            "babel"
                        ]
                    }
                ]
            },
            stylus: {
                use: [nib(), axis(), typographic()]
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
    gulp.watch(files.source.pug, pug);
    gulp.watch(files.source.jsxFiles, react);
}

const clean = (file) => {
    return del([file], {force: true});
};

const cleanFiles = () => { return clean(files.dest.pug); };

const cleanJsx = () => { return clean(files.dest.jsx); };

export { cleanFiles, cleanJsx };

gulp.task('jsx', gulp.series(cleanJsx, legacyCss, react));

gulp.task('connect', gulp.series(connect));

gulp.task('watch', gulp.series(watch));

gulp.task('pug', gulp.series(cleanFiles, pug, react));

gulp.task('default', gulp.series('pug', 'jsx', 'connect', 'watch')); //- Something stupid is going on here, will catch it later!
