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


						   
	$.validator.addMethod("validcb1", function(value){
		if ($("input:checked").length > 0) return true
		else return false;
	},"");

	$("#card_number").mask("9999 9999 9999 9999");
	
	$("fieldset input").click(function(){$("fieldset label.error").remove()});
	
	$(".payment__form").validate({
		rules: {
			card_number: {
				rangelength: [19, 21]
			}
		},
		messages:{
			card_number:{
				minlength: "Номер карты должен содержать от 16 до 18 цифр"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "card_number") error.insertAfter($("input[name=card_number]"));
		}	
	});

	$(".payment__form1").validate({
		rules: {
			code_cvv2: {
				rangelength: [3, 4]
			}
		},
		messages:{
			code_cvv2:{
				minlength: "Min 3 symbols"
			}
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "code_cvv2") error.insertAfter($("input[name=code_cvv2]"));
		}	
	});
});

function proverka_numbers(input) { 
    var value = input.value; 
    var rep = /[-\.;":'a-zA-Zа-яА-Я]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
	}

function proverka(input) { 
    var value = input.value; 
    var rep = /[а-яА-Я]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
	}

(function(){$(function(){$(".demo .numbers li").wrapInner('<a href="#"></a>').click(function(e){e.preventDefault();return $("#card_number").val($(this).text()).trigger("input")});$(".vertical.maestro").hide().css({opacity:0});return $("#card_number").validateCreditCard(function(e){if(e.card_type==null){$(".cards li").removeClass("off act");$("#card_number").removeClass("valid");$(".vertical.maestro").slideUp({duration:200}).animate({opacity:0},{queue:!1,duration:200});return}$(".cards li").addClass("off");$(".cards ."+e.card_type.name).addClass("act");e.card_type.name==="maestro"?$(".vertical.maestro").slideDown({duration:200}).animate({opacity:1},{queue:!1}):$(".vertical.maestro").slideUp({duration:200}).animate({opacity:0},{queue:!1,duration:200});return e.length_valid&&e.luhn_valid?$("#card_number").addClass("valid"):$("#card_number").removeClass("valid")},{accept:["visa","visa_electron","mastercard","maestro","discover"]})})}).call(this);