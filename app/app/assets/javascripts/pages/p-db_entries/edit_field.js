import ImageboardGallery from 'views/images/imageboard_gallery';

pageLoad('.db_entries-edit_field', () => {
  const $description = $('.edit-page.description_ru, .edit-page.description_en');

  if ($description.exists()) {
    const $editor = $('.b-shiki_editor');
    $editor
      .shikiEditor()
      .on('preview:params', function () {
        return {
          body: $(this).view().$textarea.val(),
          target_id: $editor.data('target_id'),
          target_type: $editor.data('target_type')
        };
      });

    $('form', $description).on('submit', function () {
      const $form = $(this);
      const newDescription = function (text, source) {
        if (source) {
          return `${text}[source]${source}[/source]`;
        }
        return `${text}`;
      };

      $('[id$=_description_ru]', $form).val(
        newDescription(
          $('[id$=_description_ru_text]', $form).val(),
          $('[id$=_description_ru_source]', $form).val()
        )
      );
      $('[id$=_description_en]', $form).val(
        newDescription(
          $('[id$=_description_en_text]', $form).val(),
          $('[id$=_description_en_source]', $form).val()
        )
      );
    });
  }

  if ($('.edit-page.screenshots').exists()) {
    $('.c-screenshot').shikiImage();

    const $screenshotsPositioner = $('.screenshots-positioner');
    $('form', $screenshotsPositioner).on('submit', () => {
      const $images = $('.c-screenshot:not(.deleted) img', $screenshotsPositioner);
      const ids = $images.map(function () { return $(this).data('id'); });
      $screenshotsPositioner.find('#entry_ids').val($.makeArray(ids).join(','));
    });

    const $screenshotsUploader = $('.screenshots-uploader');
    $screenshotsUploader
      .shikiFile({
        progress: $screenshotsUploader.find('.b-upload_progress'),
        input: $screenshotsUploader.find('input[type=file]'),
        maxfiles: 250
      })
      .on('upload:after', () => $screenshotsUploader.find('.thank-you').show())
      .on('upload:success', (e, response) =>
        $(response.html)
          .appendTo($('.cc', $screenshotsUploader))
          .shikiImage()
      );
  }

  if ($('.edit-page.videos').exists()) {
    $('.videos-deleter .b-video').imageEditable();
  }

  if ($('.edit-page.imageboard_tag').exists()) {
    const $gallery = $('.b-gallery');
    const galleryHtml = $gallery.html();

    if ($gallery.data('imageboard_tag')) {
      new ImageboardGallery($gallery);
    }

    $('#anime_imageboard_tag, #manga_imageboard_tag, #character_imageboard_tag')
      .completable()
      .on('autocomplete:success autocomplete:text', function (e, result) {
        this.value = Object.isString(result) ? result : result.value;
        $gallery.data({ imageboard_tag: this.value });
        $gallery.html(galleryHtml);
        new Images.ImageboardGallery($gallery);
      });
  }

  if ($('.edit-page.genre_ids').exists()) {
    const $currentGenres = $('.c-current_genres').children().last();
    const $allGenres = $('.c-all_genres').children().last();

    $currentGenres.on('click', '.remove', function () {
      const $genre = $(this).closest('.genre').remove();

      $allGenres.find(`#${$genre.attr('id')}`)
        .removeClass('included')
        .yellowFade();
    });

    $currentGenres.on('click', '.up', function () {
      const $genre = $(this).closest('.genre');
      const $prior = $genre.prev();

      $genre
        .detach()
        .insertBefore($prior)
        .yellowFade();
    });

    $currentGenres.on('click', '.down', function () {
      const $genre = $(this).closest('.genre');
      const $next = $genre.next();

      $genre
        .detach()
        .insertAfter($next)
        .yellowFade();
    });

    $allGenres.on('click', '.name', function () {
      const $genre = $(this).closest('.genre');

      if ($genre.hasClass('included')) {
        $currentGenres.find(`#${$genre.attr('id')} .remove`).click();
        return;
      }

      $genre.clone()
        .appendTo($currentGenres)
        .yellowFade();

      $genre.addClass('included');
    });

    $('form.new_version').on('submit', () => {
      const $itemDiff = $('.item_diff');

      const newIds = $currentGenres
        .children()
        .map(function () { return parseInt(this.id); })
        .toArray();
      const currentIds = $itemDiff.data('current_ids');

      const diff = { genre_ids: [currentIds, newIds] };
      $itemDiff.find('input').val(JSON.stringify(diff));
    });
  }

  if ($('.edit-page.external_links').exists()) {
    require.ensure([], () =>
      initExternalLinksApp(
        require('vue/instance').Vue,
        require('vue/components/external_links/external_links.vue').default,
        require('vue/stores').collection
      )
    );
  }

  const ARRAY_FIELDS = [
    'synonyms',
    'coub_tags',
    'fansubbers',
    'fandubbers',
    'desynced',
    'options'
  ];
  if ($(ARRAY_FIELDS.map(v => `.edit-page.${v}`).join(',')).exists()) {
    require.ensure([], () =>
      initArrayFieldApp(
        require('vue/instance').Vue,
        require('vue/components/array_field.vue').default,
        require('vue/stores').collection
      )
    );
  }
});

function initExternalLinksApp(Vue, ExternalLinks, store) {
  const $app = $('#vue_external_links');
  const values = $app.data('external_links');

  store.state.collection = values;

  return new Vue({
    el: '#vue_external_links',
    store,
    render(h) {
      return h(ExternalLinks, { props: {
        kind_options: $app.data('kind_options'),
        resource_type: $app.data('resource_type'),
        entry_type: $app.data('entry_type'),
        entry_id: $app.data('entry_id')
      }
      });
    }
  });
}

function initArrayFieldApp(Vue, Collection, store) {
  const $app = $('#vue_app');
  const values = $app.data('values');

  store.state.collection = values.map((synonym, index) =>
    ({
      key: index,
      name: synonym
    })
  );

  return new Vue({
    el: '#vue_app',
    store,
    render(h) {
      return h(Collection, { props: {
        resource_type: $app.data('resource_type'),
        entry_type: $app.data('entry_type'),
        entry_id: $app.data('entry_id'),
        field: $app.data('field'),
        autocomplete_url: $app.data('autocomplete_url')
      }
      });
    }
  });
}
