/*!
 * Moves details toggle to the table heading
 *
 * <code>
 *	$('.detail-toggle').rah_detailstoggle();
 * </code>
 */

(function($){
	$.fn.rah_detailstoggle = function() {
		return this.each(function() {
			var $this = $(this);
			
			var form = {
				thead : $('.txp-list thead th'),
				label : $this.find('label').text()
			};
			
			form.thead.dblclick(function(e) {
				e.preventDefault();
				$this.find('input[type=checkbox]').click();
			});
		}).hide();
	};
})(jQuery);