(function($){
	var methods = {
		overlay : function(e) {
			e.preventDefault();
		
			var original = $(this);
			
			$('body, html').addClass('rah_writer');
			$('body :visible').addClass('rah_writer_wizard');
			
			$('body').append(
				'<form id="rah_writer">'+
					'<textarea id="rah_writer_area"></textarea>'+
				'</form>'
			);
			
			var editArea = $('#rah_writer #rah_writer_area');
			
			if(original.hasClass('code')) {
				editArea.addClass('code');
			}
			else {
				editArea.addClass('rah_writer_plain');
			}
			
			editArea.val(original.val());
			editArea.focus();
			
			$('#rah_writer').submit(function(e) {
				e.preventDefault();
				original.val(editArea.val());
				$('body, html').removeClass('rah_writer');
				$('.rah_writer_wizard').removeClass('rah_writer_wizard');
				editArea.parent().remove();
			});
			
			$(document).keyup(function(e) {
				if(e.keyCode == 27) {
					original.val(editArea.val());
					$('body, html').removeClass('rah_writer');
					$('.rah_writer_wizard').removeClass('rah_writer_wizard');
					editArea.parent().remove();
				}
			});
		},
		
		init : function(opts) {
		
			var options = $.extend({
				mode : 'focus',
				linktext : 'Fullscreen',
				method : 'init'
			}, opts);
		
			if(options.mode == 'focus') {
				$(this).focus(methods.overlay);
			}
			else {
				$(this).after('<a href="#" class="rah_fullscreen_toggle">' + options.linktext + '</a>');
			}
		}
	};

	$.fn.rah_writer = function(method) {
		return methods.init.apply(this, method);
	};
})(jQuery);