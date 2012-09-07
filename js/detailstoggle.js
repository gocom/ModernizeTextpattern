/*!
 * Moves details toggle to the table heading
 *
 * <code>
 *	$('.detail-toggle').rah_detailstoggle();
 * </code>
 */

(function($){
	$.fn.rah_detailstoggle = function() {
		this.appendTo('.pageby');
		return this;
	};
})(jQuery);