import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
   build: {
      js: `${buildFolder}/js/`,
      files: `${buildFolder}/files/`,
      html: `${buildFolder}/`,
      css: `${buildFolder}/css/`,
      images: `${buildFolder}/img/`,
      fonts: `${buildFolder}/fonts/`,
   },
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico,webmanifest}`,
      svg: `${srcFolder}/img/**/*.svg`,
      files: `${srcFolder}/files/**/*.*`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      fonts: `${srcFolder}/fonts/*.ttf`,
      svgicons: `${srcFolder}/svgicons/*.svg`,
   },
   wathc: {
      js: `${srcFolder}/js/**/*.js`,
      files: `${srcFolder}/files/**/*.*`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,ico,webmanifest}`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
}