/*!
 * Search forms default to single visible field.
 *
 * <code>
 *	$('.search-form').rah_search();
 * </code>
 */

(function($){
	$.fn.rah_search = function() {
	
		var form = {
			label : this.find('label'),
			button : this.find('[type=submit]'),
			field : this.find('input[type=text]'),
			options : this.find('select')
		};
		
		if(!form.field.val()) {
			form.options.hide();
		}
		
		form.button.remove();
		form.field.attr('placeholder', form.label.text()+'…');
		form.label.remove();
		
		form.field.bind('keyup input change blur', function() {
			if($(this).val()) {
				form.options.show();
			}
			else {
				form.options.hide();
			}
		});
		
		form.options.bind('change blur', function() {
			if(form.field.val()) {
				$(this).parents('form').submit();
			}
		});
	};
})(jQuery);