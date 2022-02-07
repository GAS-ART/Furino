import replace from "gulp-replace"; // поиск и замена
import browserSync from "browser-sync"; // локальный сервер
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщения (подсказки)
import newer from "gulp-newer"; // проверка обновления картинок

export const plugins = {
   replace: replace,
   browserSync: browserSync,
   plumber: plumber,
   notify: notify,
   newer: newer,
}