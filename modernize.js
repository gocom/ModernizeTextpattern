/*!
 * Initializes included scripts
 */

$(document).ready(function(){
	$('#page-article textarea').rah_writer();
	$('#page-login input#name, #page-login input#password, #page-article #title').rah_placeholder();
	$('#page-list table#list').rah_multiedit();
	$('.search-form').rah_search();
	$('.pageby').rah_pageby();
	$('.detail-toggle').rah_detailstoggle();
	$('.txp-navigation .prev-next').rah_pagination();
});