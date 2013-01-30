/*!
 * Display profile details next to the Logout button.
 */

$(document).ready(function()
{
	if ($.type(rah_modernize) !== 'object')
	{
		return;
	}

	$('.txp-logout')
		.wrapInner('<div class="rah_profile_actions" />');

	$('.txp-logout').append(
		$('<div />')
			.addClass('rah_profile')
			.append(
				$('<div />')
					.addClass('rah_profile_avatar')
					.css('background-image', 'url("https://secure.gravatar.com/avatar/' + rah_modernize.gravatar + '?s=48&d=mm")')
			)
			.append(
				$('<div />')
					.addClass('rah_profile_info')
					.append(
						$('<div />')
							.addClass('rah_profile_name')
							.text(rah_modernize.realname)
					)
					.append(
						$('<div />')
							.addClass('rah_profile_title')
							.text(rah_modernize.group)
					)
			)
	);

	$('.rah_profile').click(function()
	{
		$('.rah_profile_actions').toggleClass('rah_profile_slideout');
	});
});