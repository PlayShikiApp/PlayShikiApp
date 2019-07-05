import URI from 'urijs';
import Turbolinks from 'turbolinks';

import CollectionSearch from 'views/search/collection';
import DatePicker from 'views/application/date_picker';
import axios from 'helpers/axios';

function datePicker() {
  if (!$('.date-filter').exists()) { return; }

  new DatePicker('.date-filter')
    .on('date:picked', function () {
      const newUrl = new URI(window.location.href).setQuery('created_on', this.value).href();
      Turbolinks.visit(newUrl);
    });
}

pageLoad('anime_video_reports_index', 'profiles_videos', () => {
  datePicker();

  $('.l-page').on('click', '.b-log_entry.video .collapsed', ({ currentTarget }) => {
    const $player = $(currentTarget).parent().find('.player');
    if (!$player.data('html')) { return; }

    $player
      .html($player.data('html'))
      .data({ html: '' });
  });
});

pageLoad('versions_index', 'users_index', datePicker);

pageLoad('versions_show', 'user_rate_logs_show', () => {
  $('.collapsed.spoiler', '.b-log_entry, .b-user_rate_log').click();
});

pageLoad(
  'bans_index',
  'abuse_requests_index',
  'versions_index',
  'review_index',
  'anime_video_reports_index',
  () => {
    $('.b-brief').checkHeight({ max_height: 150 });

    $('.expand-all').on('click', function () {
      $(this).parent().next().next()
        .find('.collapsed.spoiler:visible')
        .click();
      $(this).remove();
    });
  });

pageLoad('moderations_missing_videos', () => {
  $('.missing-video .show-details').one('click', async e => {
    e.preventDefault();

    const { data } = await axios.get($(e.currentTarget).data('episodes_url'));
    $(e.currentTarget).parent().find('.details').html(data);
  });

  $('.missing-video .show-details').on('click', e => {
    e.preventDefault();

    $(e.currentTarget).parent()
      .find('.details')
      .toggleClass('hidden');
  });
});

pageLoad('roles_show', () => {
  new CollectionSearch('.b-collection_search');

  $('.l-page')
    .on('ajax:before', '.b-user', ({ currentTarget }) => {
      $(`.b-user[id=${currentTarget.id}]`).addClass('b-ajax');
    })
    .on('ajax:success', '.b-user', ({ currentTarget }, { content }) => {
      $(`.b-user[id=${currentTarget.id}]`).replaceWith(content);
    });
});

// users#index matches this too
pageLoad('users_index', () => {
  if ($('.b-collection_search').length) {
    new CollectionSearch('.b-collection_search');
  }
});
