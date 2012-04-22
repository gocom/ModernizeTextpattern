/*!
 * Cleans up multi-edit controls
 *
 * <code>
 *	$('table#list').rah_multiedit();
 * </code>
 */

(function($){
	$.fn.rah_multiedit = function() {
		
		return this.each(function() {
		
			var $this = $(this);
		
			var multiedit = {
				select : $this.find('tfoot .multi-edit select'),
				button : $this.find('tfoot .multi-edit [type=submit]'),
				boxes : $this.find('tbody td input[type="checkbox"]')
			};
			
			/*
				Remove extra options
			*/
			
			$this.find('tfoot .multi-edit').html(multiedit.select).append(' ').append(multiedit.button);
			
			multiedit.select.hide();
			multiedit.button.hide();
			
			/*
				Changing multiedit dropdowns value to empty
				hides second step
			*/
			
			multiedit.select.change(function() {
				if($(this).find('option:selected').val()) { 
					multiedit.button.show();
				}
				else {
					multiedit.button.hide();
					multiedit.select.parent().find('#js').hide();
				}
			});
			
			multiedit.boxes.hide().parent().append('&#160;');
			
			/*
				Clicking the row selects the checkbox
			*/
			
			$this.find('tbody td').live('click', function(e) {
				var box = $(this).parent('tr').find('input[type="checkbox"]');
				
				if(box.is(':checked') == false) {
					box.attr('checked', true);
					$(this).parent('tr').addClass('active');
				}
				else {
					box.removeAttr('checked');
					$(this).parent('tr').removeClass('active');
				}
			});
			
			/*
				Double clicking heading selects all
			*/
			
			$this.find('thead th').live('dblclick', function(e) {
				if(multiedit.boxes.is(':checked')) {
					multiedit.boxes.removeAttr('checked');
					multiedit.boxes.parents('tr').removeClass('active');
				}
				else {
					multiedit.boxes.attr('checked', true);
					multiedit.boxes.parents('tr').addClass('active');
				}
			});
			
			/*
				See if something has been selected
			*/
			
			$this.find('tbody td, thead th').live('click dblclick', function() {
				if(multiedit.boxes.is(':checked')) {
					multiedit.select.show();
				}
				else {
					multiedit.select.hide();
					multiedit.button.hide();
					multiedit.select.parent().find('#js').hide();
					multiedit.select.val('');
				}
			});
		});
	};
})(jQuery);