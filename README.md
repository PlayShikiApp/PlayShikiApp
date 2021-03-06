
#  PlayShikiApp
Расширение для браузера, возвращающее функционал просмотра аниме на сайте shikimori.one (shikimori.org)

## Установка
### Установка из официального магазина
1. Для [Firefox/Firefox для Android](https://addons.mozilla.org/ru/firefox/addon/playshikimori-app)
2. Для Opera: TODO
3. Для Chrome: TODO
4. На данный момент установка расширения возможна только по инструкциям ниже (кроме Firefox)

### Установка для Chrome (не из магазина)
1. Скачайте архив .zip [отсюда](https://github.com/PlayShikiApp/PlayShikiApp/releases)
2. Распакуйте архив
3. Зайдите в настройки расширения своего браузера, находим и выставляем галочку "Режим разработчика"
4. Найдите появившуюся кнопку "Загрузить распакованное расширение" и нажмите ее
5. Выберите папку, в которую распаковали расширение
6. Готово! В правом верхнем углу должна появиться иконка расширения

### Установка для Opera
1. Скачайте архив .crx (не "oldbrowsers") [отсюда](https://github.com/PlayShikiApp/PlayShikiApp/releases)
2. Найдите вкладку с расширениями в своем браузере
3. Перетащите скачанный файл туда
4. Готово!

### Установка на старых версиях браузеров (Yandex 16)
1. Скачайте архив .crx (PlayShikiApp_x.y.z_oldbrowsers.crx) [отсюда](https://github.com/PlayShikiApp/PlayShikiApp/releases)
2. Найдите вкладку с расширениями в своем браузере
3. Перетащите скачанный файл туда
4. Готово!

## Функционал

Добавляет кнопку "Смотреть онлайн" и возвращает старый плеер play.shikimori.org.
Возвращены все (или почти) видео, добавленные до момента закрытия play.shikimori.org. На данный момент ведется работа над добавлением видео онгоингов.

## Ссылки
1. Telegram канал [@play_shikimori_app](http://t.me/play_shikimori_app)
2. Обсуждение в Telegram [@play_shiki_app](https://t.me/play_shiki_app)
3. Профиль на [Шики](https://shikimori.one/Kuroyasha)

## Дисклеймер
1. Данное расширение не собирает личную информацию пользователей или вообще какую-либо информацию с Вашего компьютера, а также не содержит какое-либо вредоносное ПО. Исходный код полностью открыт и его может проверить любой желающий
2. Исходный код данного расширения не содержит информацию, защищенную авторским правом и какие-либо ссылки на нее
3. Данный проект распространяется "как есть" под свободной лицензией OSL v3.

## How to build

### Install the dependencies
```
npm install
```

### To actually do a build

```
npm run build
```

Now extension file should appear in the "dist" directory ("dist/PlayShikiApp.xpi").

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License 

[OSL v3.0](https://github.com/PlayShikiApp/PlayShikiApp/blob/master/LICENSE)

