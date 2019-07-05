# TODO: refactor to normal classes
import inNewTab from 'helpers/in_new_tab'

DEFAULT_ORDER = 'ranked'
DEFAULT_DATA =
  kind: []
  status: []
  season: []
  franchise: []
  achievement: []
  genre: []
  studio: []
  publisher: []
  duration: []
  rating: []
  score: []
  options: []
  mylist: []
  search: []
  "order-by": []

export default (base_path, current_url, change_callback) ->
  $root = $('.b-collection-filters')

  # вытаскивание из класса элемента типа и значения
  extract_li_info = ($li) ->
    matches = $li.attr('class').match(/([\w\-]+)-([\w.\-]+)/)
    return null unless matches
    type = matches[1]
    value = matches[2]
    if type.match(/genre-\d+/) || type.match(/studio-\d+/) ||
        type.match(/publisher-\d+/) || type.match(/kind-\w+/) ||
        type.match(/rating-\w+/) || type.match(/score-\d+/) ||
        type.match(/duration-\w+/)
      tmp = type.split("-")
      type = tmp[0]
      value = tmp.slice(1).join("-") + "-" + value
    type: type
    value: value

  # удаление ! из начала и мусора из конца параметра
  remove_bang = (value) ->
    value.replace(/^!/, "").replace /\?.*/, ""

  # добавляет нужный параметр в меню с навигацией
  add_option = (key, value) ->
    # добавляем всегда без !
    value = remove_bang(value)
    text = value.replace(/^\d+-/, "")
    target_year = null
    if key == "publisher" && text.match(/-/)
      text = text.replace(/-/g, " ")
    else if key == "season" && value.match(/^\d+$/)
      target_year = parseInt(value, 10)
      text = value + " год"

    value = value.replace(/\./g, "")
    $li = $("<li class='#{key}-#{value}'><input type='checkbox'/>#{text}</li>")

    # для сезонов вставляем не в начало, а после предыдущего года
    if target_year
      $placeholders = $("ul.seasons li", $root).filter((index) ->
        match = @className.match(/season-(\d+)/)
        return false unless match
        year = parseInt(match[1], 10)
        year = year * 10 if year < 1000
        year < target_year
      )
      if $placeholders.length
        $li.insertBefore $placeholders.first()
      else
        $(".anime-params.#{key}s", $root).append $li
    else
      $(".anime-params.#{key}s", $root).prepend($li).parent().removeClass "hidden"
    $li

  # клики по меню
  $('.anime-params', $root).on 'click', 'li', (e) ->
    return if inNewTab(e) # игнор средней кнопки мыши
    return if e.target.classList.contains('b-question') # игнор при клике на инфо блок
    #return if $(e.target).hasClass('filter') # игнор при клике на фильтр

    already_selected = @classList.contains 'selected'

    li_info = extract_li_info $(@)
    return true unless li_info

    unless already_selected
      if 'type' of e.target && e.target.type == 'checkbox'
        filters.add li_info.type, li_info.value
      else
        filters.set li_info.type, li_info.value
    else
      filters.remove li_info.type, li_info.value

    change_callback filters.compile()
    false unless 'type' of e.target && e.target.type == 'checkbox'

  # клики по фильтру группы - плюсику или минусику
  $('.anime-params-block .block-filter', $root).on 'click', (e) ->
    $params_block = $(@).closest('.anime-params-block')

    to_exclude = if $(@).hasClass('item-sign')
      $params_block.find('li').length == $params_block.find('.item-add').length
    else
      $(@).hasClass('item-add')

    #$(@).removeClass((if to_exclude then 'item-add' else 'item-minus')).addClass (if not to_exclude then "item-add" else "item-minus")
    $params_block.find('li').map(->
      extract_li_info $(@)
    ).each (index, li_info) ->
      filters.params[li_info.type][index] = (if to_exclude then '!' + li_info.value else li_info.value)

    change_callback filters.compile()
    filters.parse filters.compile()

  # клики по фильтру элемента - плюсику или минусику
  $('.anime-params li', $root).on 'click', '.filter', (e) ->
    to_exclude = $(@).hasClass('item-add')

    $(@)
      .removeClass((if to_exclude then 'item-add' else 'item-minus'))
      .addClass (if not to_exclude then "item-add" else "item-minus")

    li_info = extract_li_info $(@).parent()
    value_key = filters.params[li_info.type].indexOf(if to_exclude then li_info.value else "!" + li_info.value)
    filters.params[li_info.type][value_key] = (if to_exclude then '!' + li_info.value else li_info.value)
    change_callback filters.compile()
    false

  filters =
    params: null

    # установка значения параметра
    set: (key, value) ->
      self = this
      @params[key].forEach (value) ->
        self.remove key, value

      @add key, value

    # выбор элемента
    add: (key, value) ->
      if key is Object.keys(@params).last() && @params[key].length > 0
        @set key, value
      else
        @params[key].push value

      return if key == 'search'

      $li = $("li.#{key}-#{remove_bang value}", $root)

      # если такого элемента нет, то создаем его
      $li = add_option(key, value)  unless $li.length

      # если элемент есть, но скрыт, то показываем его
      $li.css display: 'block' if $li.css('display') == 'none'
      $li.addClass 'selected'

      # если элемент с чекбоксом, то ставим галочку на чекбокс
      $input = $li.children('input')
      if $input.length
        $input.attr checked: true

        # добавляем или показываем плюсик
        $filter = $li.children('.filter')
        if $filter.length
          $filter.removeClass("item-add").removeClass("item-minus").addClass((if value[0] is "!" then "item-minus" else "item-add")).show()
        else
          $li.prepend "<span class=\"filter " + ((if value[0] is "!" then "item-minus" else "item-add")) + "\"></span>"

    # отмена выбора элемента
    remove: (key, value) ->
      # т.к. сюда значение приходит как с !, так и без, то удалять надо оба варианта
      value = remove_bang(value)
      @params[key] = @params[key].subtract([value, "!#{value}"])
      try # becase there can bad order, and it will break jQuery selector
        $li = $(".#{key}-#{value}", $root)
        $li.removeClass 'selected'

        # снятие галочки с чекбокса
        $li.children('input').attr checked: false

        # скрытие плюсика/минусика
        $li.children('.filter').hide()

    # формирование строки урла по выбранным элементам
    compile: ->
      filters_path = Object.reduce(
        @params,
        (memo, values, key) ->
          return memo unless values
          if key == 'order-by' && values[0] == DEFAULT_ORDER &&
              !location.href.match(/\/list\/(anime|manga)/)
            return memo

          if values.length
            memo + "/#{key}/#{values.join ','}"
          else
            memo
        , ''
      )
      @last_compiled = base_path + filters_path + location.search

    last_compiled: null

    # парсинг строки урла и выбор
    parse: (url) ->
      $('.anime-params .selected', $root).toggleClass 'selected'
      $('.anime-params input[type=checkbox]:checked', $root).attr checked: false
      $('.anime-params .filter', $root).hide()

      @params = JSON.parse(JSON.stringify(DEFAULT_DATA))
      parts = url
        .replace("#{location.protocol}//#{location.hostname}", '')
        .replace(":#{location.port}", '')
        .replace(base_path, '')
        .replace(/\?.*/, '')
        .match(/[\w\-]+\/[^\/]+/g)

      (parts || []).forEach (match) =>
        key = match.split('/')[0]
        return if key == 'page' || (key not of DEFAULT_DATA)

        match
          .split('/')[1]
          .split(',')
          .forEach (value) =>
            try
              @add key, value
            catch # becase there can bad order, and it will break jQuery selector
              if key == 'order-by'
                @add 'order-by', DEFAULT_ORDER

      if Object.isEmpty(@params['order-by'])
        @add 'order-by', DEFAULT_ORDER

  filters.parse current_url

  # раскрываем жанры, если какой-то из них выбран
  if filters.params.genre.length
    $root.find('.genres .b-spoiler').spoiler().trigger('spoiler:open')

  filters
