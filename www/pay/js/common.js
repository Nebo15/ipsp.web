$(document).ready(function() {
    // jQuery SelectBox usage
    (function() {
    	$("select").selectBox();

    	$(document).click(function() {
    		$(".js-drop ul").hide();
    		$(".js-select-list").hide();
    		$(".js-select").removeClass("is-active");
    	});

        $(".js-select").each(function() {
            var select_list = $(this).parent().find(".js-select-list");
            var text = select_list.find("li").first().text();
            $(this).find(".js-select-text").text(text);
            $(this).click(function(event) {
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

    	$('.js-select').click(function(event) {
    		event.stopPropagation();
    	});
    })();

    // Validators
    (function() {
        var card_number_regexp = /[^0-9]/g;
        var card_number_visible_regexp = /[^0-9\-]/g;
        var cardholder_regexp = /[^ A-z]/g;

    	// Removing error
    	$("fieldset input").click(function() {
            $("fieldset label.error").remove();
        });

        // Special validators that ignores decorative parts of credit card number
        jQuery.validator.addMethod("rangelength_stripped", function(value, element, param) {
            var rep = card_number_regexp;
            return (this.optional(element) || jQuery.validator.methods.rangelength.call(this, value.replace(rep, ''), element, param));
        }, "Неправильная длинна номера карты");

        jQuery.validator.addMethod("creditcard_stripped", function(value, element, param) {
            var rep = card_number_regexp;
            return (this.optional(element) || jQuery.validator.methods.creditcard.call(this, value.replace(rep, ''), element, param));
        }, "Введён неверный номер карты");

    	// Validates with validate plugin
    	$(".payment__form").validate({
            rules: {
                card_number: {
                    required: true,
                    rangelength_stripped: [16, 16],
                    creditcard_stripped: true
                },
                cardholder: {
                    required: true
                }
            },
    		messages:{
    			card_number:{
                    required: "Введите номер карты",
    				rangelength_stripped: function(data) {
                        var text = "Номер карты должен содержать от {0} до {1} цифр";

                        if(data[0] == data[1]) {
                            text = "Номер карты должен содержать {0} цифр";
                        }

                        return jQuery.format(text, data)
                    },
                    creditcard_stripped: "Введён неверный номер карты"
    			},
    			code_cvv2:{
                    required: "Введите код",
    				minlength: "Неверный код"
    			},
                cardholder: {
                    required: "Введите имя на карте"
                }
    		},
    		errorPlacement: function(error, element) {
    			if (element.attr("name") == "card_number") error.insertAfter($("input[name=card_number]"));
                if (element.attr("name") == "code_cvv2") error.insertAfter($("input[name=code_cvv2]"));
    			if (element.attr("name") == "cardholder") error.insertAfter($("input[name=cardholder]"));
    		}
    	});

        var stripInputValue = function(regexp, input) {
            var $this = $(input);
            setTimeout(function() { // Hack
                var value = $this.val();
                if (regexp.test(value)) {
                    value = value.replace(regexp, '');
                    $this.val(value);
                }

                var double_space_regexp = /[ ]{2,}/g;
                if (double_space_regexp.test(value)) {
                    value = value.replace(double_space_regexp, ' ');
                    $this.val(value);
                }
            }, 1);
        };

    	// validates - only numbers
    	$('.input_onlynumber').on('keypress keyup', function() {
            stripInputValue(card_number_visible_regexp, $(this));
    	});

    	// validates - only latin letters
    	$('.input_latin').on('keypress keyup', function() {
            stripInputValue(cardholder_regexp, $(this));
    	});

        // Detect card type
        $('#card_number').on('keypress keyup', function(event) {
            var $this = $(this);

            $('#card_number').validateCreditCard(function(result) {
                if(result.card_type) {
                    $('.card').html('<i class="'+result.card_type.name+'"></i>');

                    var max_length = result.card_type.valid_length[result.card_type.valid_length.length - 1];

                    $this.rules('add', {
                        rangelength_stripped: [result.card_type.valid_length[0], max_length]
                    });

                    // Here we can change mask dynamically
                }
            });
        });
    })();

    // Masking card number
    (function() {
        $("#card_number").mask("0000-0000-0000-0000-999", {
            maxlength: false
        });
    })();
});
