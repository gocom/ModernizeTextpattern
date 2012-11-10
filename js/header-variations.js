$(document).ready(function () {
	if ($.type(rah_modernize) === 'object' && $.type(rah_modernize.color) === 'string')
	{
		$('body').addClass(rah_modernize.color);
	}
});