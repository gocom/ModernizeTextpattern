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
			
			$this.find('select[name="qty"] option').each(function(i) {
				var qty = $(this).val();
				
				if(i) {
					form.to.append('<span class="divider"> | </span>');
				}
			
				form.to.append(' <a class="pagebylink'+(form.selected == qty ? ' active' : '')+'" href="?'+form.q+'&qty='+qty+'">'+qty+'</a> ');		
			});
			
			$this.find('select[name="qty"]').remove();
		});
	};
})(jQuery);