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
				q : $this.closest('form').find('input:hidden').serialize(),
				selected : parseInt($this.closest('form').find('select[name="page"] option:selected').val()),
				pages : $this.closest('form').find('select[name="page"]')
			};
			
			if(form.pages.length < 1) {
				$this.remove();
				return;
			}
			
			form.prev = form.pages.prevAll('.navlink, .navlink-disabled').eq(0).remove();
			form.next = form.pages.nextAll('.navlink, .navlink-disabled').eq(0).remove();
			
			form.min = Math.max(0, form.selected-4);
			form.max = form.min+8;

			form.pages.parent().html(form.pages).prepend(form.prev).append(form.next);
			
			form.pages.find('option').each(function(i) {
				var page = parseInt($(this).val());
				
				if(page > form.max || page < form.min) {
					return;
				}
			
				form.pages.before('<a class="'+(form.selected == page ? 'navlink-active' : 'navlink')+'" href="?'+form.q+'&page='+page+'">'+page+'</a>');
			});
			
			form.pages.parent().addClass('nav-tertiary');
			form.pages.parent().find('.navlink-disabled').remove();
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