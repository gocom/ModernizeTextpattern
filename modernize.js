/*!
 * Initializes included scripts
 */

$(document).ready(function(){
	$('.search-form').rah_search();
	$('.pageby').rah_pageby();
	$('.detail-toggle, .cb_show_spam').rah_detailstoggle();
	$('.txp-navigation .prev-next').rah_pagination();
});