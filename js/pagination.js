/*!
 * Transforms page dropdown into links
 *
 * <code>
 *	$('.txp-navigation .prev-next').rah_search();
 * </code>
 */

(function($){
	$.fn.rah_pagination = function() {
		
		return this.each(function() {
			
			var $this = $(this);
		
			var form = {
				q : $this.find('input:hidden').serialize(),
				selected : parseInt($this.find('select[name="page"] option:selected').val()),
				pages : $this.find('select[name="page"]')
			};
			
			if(form.pages.length < 1) {
				$this.remove();
				return;
			}
			
			form.prev = form.pages.prev('.navlink');
			form.next = form.pages.next('.navlink');
			
			form.min = form.selected-5;
			form.max = form.selected+5;
			
			form.pages.find('option').each(function(i) {
				var page = parseInt($(this).val());
				
				if(page > form.max || page < form.min) {
					return;
				}
			
				form.pages.before(' <a class="navlink'+(form.selected == page ? ' navlink-active' : '')+'" href="?'+form.q+'&page='+page+'">'+page+'</a> ');
			});
			
			form.pages.remove();
		});
	};
})(jQuery);