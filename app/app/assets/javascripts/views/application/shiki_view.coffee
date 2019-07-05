import View from 'views/application/view'
import axios from 'helpers/axios'

# общий класс для комментария, топика, редактора
export default class ShikiView extends View
  MAX_PREVIEW_HEIGHT: 450
  COLLAPSED_HEIGHT: 150

  _initialize: ->
    super

    @$node.removeClass 'unprocessed'
    @$inner = @$('>.inner')

    return unless @$inner.exists()

  _check_height: =>
    if window.SHIKI_USER.isCommentsAutoCollapsed
      @$inner.checkHeight
        max_height: @MAX_PREVIEW_HEIGHT
        collapsed_height: @COLLAPSED_HEIGHT

  _shade: =>
    @$node.addClass 'b-ajax'

  _unshade: =>
    @$node.removeClass 'b-ajax'

  _reload: =>
    @_shade()
    axios.get(@_reload_url()).then (response) =>
      @_replace response.data.content, response.data.JS_EXPORTS

  # урл для перезагрузки элемента
  _reload_url: ->
    @$node.data 'url'

  _replace: (html, JS_EXPORTS) ->
    $replaced = $(html)
    @$node.replaceWith $replaced

    $replaced.process(JS_EXPORTS).yellowFade()
