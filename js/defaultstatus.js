/*!
 * Sets default article status to Draft
 */

$(document).ready(function(){
	if(textpattern.event === 'article' && textpattern.step === 'create') {
		$('[name=Status]').val(1);
	}
});