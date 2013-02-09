/*!
 * Moves details toggle
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

$(document).ready(function(){
	$('.detail-toggle, .cb_show_spam').rah_detailstoggle();
});