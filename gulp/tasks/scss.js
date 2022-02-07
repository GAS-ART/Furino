import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMedaQueries from "gulp-group-css-media-queries";
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })))
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
      .pipe(webpcss(
         {
            webpClass: ".webp",
            noWebpClass: ".no-webp"
         })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
}