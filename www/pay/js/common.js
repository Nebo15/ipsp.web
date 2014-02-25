$(document).ready(function() {

	$("select").selectBox();

	$(document).click(function() {
		$(".js-drop ul").hide();
		$(".js-select-list").hide();
		$(".js-select").removeClass("is-active");
	}); 

	function select() {
		$(".js-select").each(function(){
			var select_list = $(this).parent().find(".js-select-list");
			var text = select_list.find("li").first().text();
			$(this).find(".js-select-text").text(text);
			$(this).click(function(event){
				if ($(this).hasClass("is-active")) {
					$(this).removeClass("is-active");
					select_list.slideUp("fast");
				}
				else {
					$(".js-select").removeClass("is-active");
					$(".js-select-list").hide();
					select_list.slideDown("fast");
					$(this).addClass("is-active");
				}
				event.stopPropagation();
			});
			select_list.find("li").click(function(event) {
				var id = $(this).attr("data-id");
				var text = $(this).text();
				$(this).parent().parent().find(".js-select-text").text(text);
				$(this).parent().parent().find(".js-select-input").val(id);
				$(this).parent().hide();
				$(this).parents(".js-select").removeClass("is-active");
				event.stopPropagation();
			});
		});
	}
	select();
	$('.js-select').click(function(event){
		event.stopPropagation();
	}); 



	//masking card number
	//$("#card_number").mask("9999 9999 9999 9999");
	

	// removing error
	$("fieldset input").click(function(){$("fieldset label.error").remove()});
	
	// validates with validate plugin
	valid = $(".payment__form").validate({
		messages:{
			card_number:{
				minlength: "Номер карты должен содержать от 16 до 18 цифр"
			},
			code_cvv2:{
				minlength: "минимум 3"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "card_number") error.insertAfter($("input[name=card_number]"));
			if (element.attr("name") == "code_cvv2") error.insertAfter($("input[name=code_cvv2]"));
		}	
	});

	
	

	// validates - only numbers
	$('.input_onlynumber').bind('keyup', function() { 
		var value = $(this).val(); 
	    var rep = /[-\.;":'a-zA-Zа-яА-Я]/; 
	    if (rep.test(value)) { 
	        value = value.replace(rep, ''); 
	        $(this).val(value);
	    } 
	});
	// validates - only latin letters
	$('.input_latin').bind('keyup', function() { 
		var value = $(this).val(); 
		var rep = /[а-яА-Я]/; 
	    if (rep.test(value)) { 
	        value = value.replace(rep, ''); 
	        $(this).val(value);
	    } 
	});


	//actually Luhn check
	$('#card_number').blur(function(event) {
		// happens only if we have enough symbols
		if($(this).valid()){
			$('#card_number').validateCreditCard(function(result){
				if(result.luhn_valid){
					console.log(result.card_type.name);
					$('.card').html('<i class="'+result.card_type.name+'"></i>');
				}
				else{
					valid.showErrors({
					  "card_number": "Введите корректный номер карты"
					});
				}	
			});
		}
		
	});
	
	
});
