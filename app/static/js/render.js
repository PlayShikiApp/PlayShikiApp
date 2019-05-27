			$(document).ready(function () {
			  render();
			});

			function render() {					
					$.get('http://45.79.78.155:8101/api/' + 21 + '/' + 1,  function (anime_videos, anime_videos_textStatus, anime_videos_jqXHR) {
						$.get('http://45.79.78.155:8101/' + 21,  function (anime_info, anime_info_textStatus, anime_info_jqXHR) {
							var render_kwargs = {
										'anime_id': anime_id,
										'episode': episode,
										'anime_info': JSON.parse(anime_info),
										'anime_videos':  JSON.parse(anime_videos),
										'static': ''
							};

							$('#title').html(nunjucks.render("title.html", render_kwargs));
							$('#videos_list').html(nunjucks.render('videos_list.html',  render_kwargs));
							$('#episodes_list').html(nunjucks.render('episodes_list.html', render_kwargs));
							$('#breadcrumbs').html(nunjucks.render('breadcrumbs.html', render_kwargs));
							$('#video_player').html(nunjucks.render('video_player.html', render_kwargs));
							$('#menu_logo').html(nunjucks.render('menu_logo.html', render_kwargs));
							$('#update_src_script').html(nunjucks.render('script_video_src.html', render_kwargs));
							
						});
					});
			}
