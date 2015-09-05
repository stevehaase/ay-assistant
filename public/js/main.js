$(document).ready(function() {

				var completeTodo = function(num){

					var done = document.getElementsByName('completed')[num];
					var spinner = done.nextSibling;
					console.log(spinner);
					spinner.innerHTML = "<i class='fa fa-spinner fa-pulse'></i>";
					
					
					$.ajax({
						type: 'POST',
						beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
						url: '/todoComplete',
						data: {item: num},
						success: function() {
							window.location.reload(true);
						}
					});
			
				}

				$('#notesfrm').hide()
				$('[data-toggle="tooltip"]').tooltip();
				CKEDITOR.replace('notes');
});