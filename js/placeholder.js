/*!
 * Adds labels as placeholders
 *
 * <code>
 *	$('input:text').rah_search();
 * </code>
 */

(function($){
	$.fn.rah_placeholder = function() {
		$(this).each(
			function() {
				var label = $('label[for="'+$(this).attr('id')+'"]').remove().text();
				$(this).attr({'placeholder' : label, 'title' : label});
			}
		);
	};
})(jQuery);