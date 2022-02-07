//import concat from "gulp-concat";
import webpack from "webpack-stream";

export const minjs = () => {
   return app.gulp.src(app.path.src.js, { sourcemaps: true })
      //  .pipe(concat('script.js'))
      .pipe(webpack({
         mode: 'production',
         output: {
            filename: 'app.min.js'
         },
         externals: {
            jquery: 'jQuery'
         }
      }))
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browserSync.stream())
}