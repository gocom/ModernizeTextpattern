/*!
 * Initializes included scripts
 */

$(document).ready(function(){
	$('#page-list .txp-list, #page-image .txp-list, #page-file .txp-list, #page-link .txp-list, #page-discuss .txp-list, #page-admin .txp-list, #page-log .txp-list, #page-plugin .txp-list').rah_multiedit();
	$('.search-form').rah_search();
	$('.pageby').rah_pageby();
	$('.detail-toggle').rah_detailstoggle();
	$('.txp-navigation .prev-next').rah_pagination();
});