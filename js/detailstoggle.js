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
				toggle : $this.find('input[type=checkbox]'),
				label : $this.find('label')
			};
	
			$this.parents('table').find('thead tr th:last-child').html(form.toggle);
			form.toggle.attr('title', form.label.text());
			form.label.remove();
		});
	};
})(jQuery);