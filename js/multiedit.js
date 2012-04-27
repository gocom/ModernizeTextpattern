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
				hidden : $this.find('tfoot .multi-edit input[type="hidden"]'),
				boxes : $this.find('tbody td input[type="checkbox"]'),
				lastcheck : null,
				form : $('<div class="multi-edit-form"></div>')
			};
			
			/*
				Remove extra options
			*/
			
			$this.find('tfoot .multi-edit').html(multiedit.form);
			multiedit.form.append(multiedit.select).append(' ').append(multiedit.button).append(multiedit.hidden).hide();
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
			
			$this.find('tbody td, tbody td *').live('click', function(e) {
				
				if(e.target != this || $(this).is('a, :input')){
					return true;
				}
				
				var box = $(this).parents('tr').find('input[type="checkbox"]');
				
				if(box.is(':checked') == false) {
				
					if(e.shiftKey && multiedit.lastcheck) {
						var start = multiedit.boxes.index(box);
						var end = multiedit.boxes.index(multiedit.lastcheck);
						
						multiedit.boxes.slice(Math.min(start, end), Math.max(start, end)+1).attr('checked', true).parents('tr').addClass('active');
					}
					
					box.attr('checked', true);
					$(this).parents('tr').addClass('active');
					multiedit.lastcheck = box;
				}
				
				else {
					box.removeAttr('checked');
					$(this).parents('tr').removeClass('active');
					multiedit.lastcheck = null;
				}
			});
			
			/*
				Double clicking heading selects all
			*/
			
			$this.find('thead th').live('dblclick', function(e) {
				
				if(e.target != this){
					return true;
				}
			
				if(multiedit.boxes.is(':checked')) {
					multiedit.boxes.removeAttr('checked');
					multiedit.boxes.parents('tr').removeClass('active');
				}
				else {
					multiedit.boxes.attr('checked', true);
					multiedit.boxes.parents('tr').addClass('active');
				}
				
				multiedit.lastcheck = null;
			});
			
			/*
				See if something has been selected
			*/
			
			$this.find('tbody td, thead th').live('click dblclick', function() {
				if(multiedit.boxes.is(':checked')) {
					multiedit.form.show();
				}
				else {
					multiedit.button.hide();
					multiedit.form.hide();
					multiedit.select.parent().find('#js').hide();
					multiedit.select.val('');
				}
			});
		});
	};
})(jQuery);