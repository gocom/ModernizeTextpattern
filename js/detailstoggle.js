/*!
 * Moves details toggle to the table heading
 *
 * <code>
 *	$('.detail-toggle').rah_detailstoggle();
 * </code>
 */

(function($){
	$.fn.rah_detailstoggle = function() {
		$('.detail-toggle').appendTo('.pageby');
		return;
	};
})(jQuery);