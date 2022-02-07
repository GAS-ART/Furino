import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMedaQueries from "gulp-group-css-media-queries";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

export const mincss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(groupCssMedaQueries())
      .pipe(autoPrefixer({
         grid: true,
         overrideBrowserslist: ["last 3 versions"],
         cascade: true
      }))
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
}