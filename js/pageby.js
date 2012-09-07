/*!
 * Transforms pageby dropdown into links
 *
 * <code>
 *	$('.pageby').rah_search();
 * </code>
 */

(function($){
	$.fn.rah_pageby = function() {
		
		return this.each(function() {
			
			var $this = $(this);
		
			var form = {
				q : $this.find('input:hidden').serialize(),
				to : $this.find('select[name="qty"]').parent(),
				selected : $this.find('select[name="qty"] option:selected').val()
			};
			
			var out = [];
			
			form.to.addClass('nav-tertiary');
			
			$this.find('select[name="qty"] option').each(function(i) {
				var qty = $(this).val();
			
				out.push('<a class="'+(form.selected == qty ? 'navlink-active' : 'navlink')+'" href="?'+form.q+'&amp;qty='+qty+'">'+qty+'</a>');		
			});

			form.to.html(out.join(''));
		});
	};
})(jQuery);