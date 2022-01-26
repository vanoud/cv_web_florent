
/* ****************************************
 * AJAX Contact Form Validation Plugin
 * - jqBootstrapValidation
 * 
 * Method: POST
 * Param name:
 *   name
 *   email
 *   subject
 *   message
 * 
 * ****************************************/

	// Add here your PHP Contact form URL
var CONTROLLER_URL 	= window.host + '/sendmail.php', 
	OK_MESSAGE 		= 'Message Sent!',
	ERR_MESSAGE 	= 'There was an error. Please, try again.';

$(function() {

	$("#f-email, #f-comment, #f-name, #f-subscribe").jqBootstrapValidation({
		preventSubmit : true,
		submitError : function($form, event, errors) {
			// perform actions on submit errors
		},
		submitSuccess : function($form, event) {
			event.preventDefault();
			
			$('#contactSubmit').prop('disabled', true);
			
			// get the form values
			var form_data = {
				type: $form.attr('id'),
				code : $form.find('#f-name').val(),
				email : $form.find('#f-email').val(),
				message : $form.find('#f-message').val()
			};

			// send the form data to the controller
			$.ajax({

				url : FORM_URL,
				type : "post",
				data : form_data

		  	}).done(function(data) {

		  		if(data) 
		  			showResult(OK_MESSAGE);
		  		else 
		  			showResult(ERR_MESSAGE);

		  	}).fail(function() {
		  		
		  		showResult(ERR_MESSAGE);
		  		
		  	}).always(function() {
		  		// performs actions always
		  	})
			
			function showResult(message) {
				$form.find('#result')
					.html('<strong>'+message+'</strong>').hide()
					.fadeIn().delay(5000).fadeOut('slow', function() {
						$('#contactSubmit').prop('disabled', false);
					});
			}		  	
		  					
		}
	});
})