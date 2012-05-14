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
			
			form.prev = form.pages.prevAll('.navlink').eq(0);
			form.next = form.pages.nextAll('.navlink').eq(0);
			
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
			
			$(document).keydown(function(e) {
				var uri = '';
				
				if(this !== e.target && (/textarea|select/i.test(e.target.nodeName) || e.target.type === 'text')) {
					return;
				}
				
				if(e.keyCode == 37 && form.prev.length) {
					uri = form.prev.attr('href');
				}
				
				else if(e.keyCode == 39 && form.next.length) {
					uri = form.next.attr('href');
				}
					
				if(uri) {
					e.preventDefault();
					window.location = uri;
					return false;
				}
			});
		});
	};
})(jQuery);