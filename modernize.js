/*!
 * Initializes included scripts
 */

$(document).ready(function(){
	$('#page-list table#list, #page-image table#list, #page-file table#list, #page-link table#list, #page-discuss table#list, #page-admin table#list, #page-log table#list, #page-plugin table#list').rah_multiedit();
	$('.search-form').rah_search();
	$('.pageby').rah_pageby();
	$('.detail-toggle').rah_detailstoggle();
	$('.txp-navigation .prev-next').rah_pagination();
});