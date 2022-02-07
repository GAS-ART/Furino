//Основной модуль
import gulp from "gulp";

//импорт путей
import { path } from "./gulp/config/path.js";
//Импорт плагинов
import { plugins } from "./gulp/config/plugins.js";

//передаем значения в глобальную переменную
global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins
}


//импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { server } from "./gulp/tasks/server.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { mincss } from "./gulp/tasks/mincss.js";
import { minjs } from "./gulp/tasks/minjs.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSpriteTask } from "./gulp/tasks/svg-sprite.js";

//Наблюдатель за изменениями в файлах
function watcher() {
   gulp.watch(path.wathc.files, copy);
   gulp.watch(path.wathc.html, html);
   gulp.watch(path.wathc.scss, scss);
   gulp.watch(path.wathc.js, js);
   gulp.watch(path.wathc.images, images);
}



const mainTasks = gulp.parallel(copy, html, scss, js, images)

//Построение сценариев выполнения задач
const dev = gulp.series(mainTasks, gulp.parallel(watcher, server));
const minCss = gulp.series(mincss);
const minJs = gulp.series(minjs);
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle); // конвертация шрифтов
const order = gulp.series(reset, fonts, gulp.parallel(mainTasks, mincss, minjs, svgSpriteTask))
//Выполнения сценария (по умолчанию)
gulp.task('default', dev);

//Экспорт задач
export { order }
export { minCss }
export { minJs }
export { fonts }
export { svgSpriteTask }
