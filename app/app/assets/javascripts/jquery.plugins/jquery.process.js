import delay from 'delay';
import cookies from 'js-cookie';

import UserRatesTracker from 'services/user_rates/tracker';
import TopicsTracker from 'services/topics/tracker';
import CommentsTracker from 'services/comments/tracker';
import PollsTracker from 'services/polls/tracker';
import DynamicParser from 'dynamic_elements/_parser';

import {
  ANIME_TOOLTIP_OPTIONS,
  COMMON_TOOLTIP_OPTIONS
} from 'helpers/tooltip_options';
import { isMobile, isTablet } from 'helpers/mobile_detect';
import $with from 'helpers/with';

$.fn.extend({
  process(JS_EXPORTS) {
    return this.each(function () {
      processCurrentDom(this, JS_EXPORTS);
    });
  }
});

async function processCurrentDom(root = document.body, JS_EXPORTS = window.JS_EXPORTS) {
  const $root = $(root);

  UserRatesTracker.track(JS_EXPORTS, $root);
  TopicsTracker.track(JS_EXPORTS, $root);
  CommentsTracker.track(JS_EXPORTS, $root);
  PollsTracker.track(JS_EXPORTS, $root);

  new DynamicParser($with('.to-process', $root));

  $with('time', $root).livetime();

  // TODO: move all logic into DynamicParser

  // то, что должно превратиться в ссылки
  $with('.linkeable', $root)
    .changeTag('a')
    .removeClass('linkeable');

  $with('.b-video.unprocessed', $root).shikiVideo();

  // стена картинок
  $with('.b-shiki_wall.unprocessed', $root)
    .removeClass('unprocessed')
    .each((_index, node) => new Wall.Gallery(node));

  // блоки, загружаемые аяксом
  $with('.postloaded[data-href]', $root).each(function () {
    const $this = $(this);
    if (!$this.is(':visible')) {
      return;
    }

    $this.load($this.data('href'), () =>
      $this
        .removeClass('postloaded')
        .process()
        .trigger('postloaded:success')
    );

    $this.attr('data-href', null);
  });

  // чёрные мелкие тултипы
  $with('.b-tooltipped.unprocessed', $root)
    .removeClass('unprocessed')
    .each(function () {
      if ((isMobile() || isTablet()) && !this.classList.contains('mobile')) {
        return;
      }

      const $tip = $(this);

      const gravity = (() => {
        switch ($tip.data('direction')) {
          case 'top': return 's';
          case 'bottom': return 'n';
          case 'right': return 'w';
          default: return 'e';
        }
      })();
      const size = $tip.data('tipsy-size');
      const className = size ? `tipsy-${size}` : null;

      $tip.tipsy({
        gravity,
        className,
        html: true,
        prependTo: document.body
      });
    });

  // подгружаемые тултипы
  $with('.anime-tooltip', $root)
    .tooltip(ANIME_TOOLTIP_OPTIONS)
    .removeClass('anime-tooltip')
    .addClass('anime-tooltip-processed')
    .removeAttr('title');

  $with('.bubbled', $root)
    .addClass('bubbled-processed')
    .removeClass('bubbled')
    .tooltip(Object.add(COMMON_TOOLTIP_OPTIONS, { offset: [-48, 10, -10] }));

  $with('.b-spoiler.unprocessed', $root).spoiler();

  $with('img.check-width', $root)
    .removeClass('check-width')
    .normalizeImage({ append_marker: true });
  $with('.b-image.unprocessed', $root)
    .removeClass('unprocessed')
    .magnificRelGallery();

  $with('.b-show_more.unprocessed', $root)
    .removeClass('unprocessed')
    .showMore();

  // выравнивание картинок в галерее аниме постеров
  const $posters = $with('.align-posters.unprocessed', $root);
  if ($posters.length) {
    $posters
      .removeClass('unprocessed')
      .find('img')
      .imagesLoaded(() => $posters.alignPosters());
  }

  // с задержкой делаем потому, что collapsed блоки могут быть в контенте,
  // загруженном аяксом, а process для таких случаев вызывается ещё до вставки в DOM
  const collapses = cookies.get('collapses');
  if (collapses) {
    await delay();
    // сворачиваение всех нужных блоков "свернуть"
    collapses
      .replace(/;$/, '')
      .split(';')
      .forEach(id =>
        $(`#collapse-${id}`)
          .filter(':not(.triggered)')
          .trigger('click', true)
      );
  }
}
