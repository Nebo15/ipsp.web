function viewport(){
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
viewport();
$(window).resize(function(){
	viewport();
});

head.ready(function() {
	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});

    // cycle init
	$(".js-slider").cycle({
		timeout: 4000,
		slides: '> div',
		speed: 800,
		pager: '.cycle-pager'
	});

    // select
    function select() {
        $(".js-select").each(function(){
            var select_list = $(this).find(".js-select-list");
            var text = select_list.find("li").first().text();
            select_list.hide();
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
                return false;
            });
            $(".help").on('click', function(event){
                $(".js-select-list").hide();
                event.stopPropagation();
            });
        });

    }
    select();
    $('.js-select').click(function(event){
        event.stopPropagation();
    });

    // menu dropdown
	function menu_dropdown() {
		var btn = $(".js-menu-btn");
		var menu = $(".js-menu");
		var window_width = viewport().width;

		if (window_width <= 1024){
			menu.hide();
			btn.show();
			btn.on('click', function(){
				$(this).toggleClass('is-active');
				menu.toggleClass('is-open').toggle();
			});
		}
		else{
			menu.show();
			btn.hide();
		}
	}
	menu_dropdown();

    var $header = $('.header');
    var $menu = $header.find('.menu');
    var $logo = $header.find('.logo');
    var $logo_img = $logo.find('.logo-img');
    var $header__topper = $header.find('.header__topper');
    var $user = $header__topper.find('.user');
    var $lang = $header__topper.find('.lang');
    var $moving_parts = $user.add($lang);

    function setCSSIfNotEqal($element, properties) {
        for (var property in properties) {
            if(properties.hasOwnProperty(property)) {
                console.log(property);
                if(parseInt($element.css(property), 10) != properties[property]) {
                    $element.css(property, properties[property]);
                }
            }
        }
        // $element.css(properties);
    }

    var menu_min_position;

	function menu_hide(){
        if($(document).width() > 1024) {
            menu_min_position = -50;
        } else {
            menu_min_position = -30;
        }

		if($(window).scrollTop() > 122){
            // Container height
            var header_height = 122 - $(window).scrollTop() + 122;
            if(header_height > 122) {
                header_height == 122;
            } else if(header_height < 50) {
                header_height = 50;
            }
            $header.css({
                height: header_height,
            });
            // setCSSIfNotEqal($header, {
            //     height: header_height,
            // });

            // Lang and User
            var moving_parts_position = 122 - $(window).scrollTop();
            if(moving_parts_position < -50) {
                moving_parts_position = -50;
            }
            $moving_parts.css({
                position: "relative",
                top: moving_parts_position,
            });

            // Menu
            var menu_position = 122 - $(window).scrollTop();
            if(menu_position < menu_min_position) {
                menu_position = menu_min_position;
            }
            $menu.css({
                position: "relative",
                top: menu_position
            });


            // Menu logo img
            var logo_img_height = (122 + 50 - $(window).scrollTop()*0.55)/1.2;
            if(logo_img_height <= 65) {
                logo_img_height = 65;
            } else if(logo_img_height > 78) {
                logo_img_height = 78;
            }
            var logo_img_width = 2.20512821 * logo_img_height;
            $logo_img.css({
                width: logo_img_width,
                height: logo_img_height,
            });

            // Menu logo
            var logo_position = $(window).scrollTop() - 122; //+ $(window).scrollTop()
            console.log(logo_position);
            if(logo_position <= 0) {
                logo_position = 0;
            } else if (logo_position > 18) {
                logo_position = 18;
            }
            $logo_img.css({
                top: logo_position,
            });

            // Opacity
            // $header.css('opacity', '0.8');
            // $header.data('animate_opacity', true);

            // $(".header").addClass('is-hidden');
        } else {
            $header.css({
                height: 122
            });
            $moving_parts.css({
                position: "relative",
                top: 0,
            });
            $menu.css({
                position: "relative",
                top: 0,
            });
            $logo_img.css({
                top: 0,
                width: 173,
                height: 78,
            });
            // $header.css('opacity', '1');
            // $header.data('animate_opacity', false);
			// $(".header").removeClass('is-hidden');
		}
	}
	menu_hide();

    //menu navigation
	function scrollNav(){
	    $('.js-section').each(function(){
	        var pos = $(this).offset().top;
	        var id = $(this).attr('id');
	        if( $(window).scrollTop() >= (pos - 89)){
	            $('.menu__list li a').removeClass('is-active');
	            $('[href = #'+id+']').addClass('is-active');
	        }
	    });
	}

	$(".menu__list a, .join, .js-scroll-top").click(function (){
	    var page = $(this).attr("href");

	    $('html, body').stop(true,true).animate({
	        scrollTop: $(page).offset().top - 145
	    }, 500);
	    return false;
	});

    $('.subscription-form').submit(function(event) {
        event.preventDefault();

        var $this = $(this);
        var $input = $this.find('input[name=email]');
        var $btn = $this.find('button[type=submit]');
        var $msg = $this.find('.success-msg');

        var email = $input.val();

        if(!validateEmail(email)) {
            $input.css('color', '#cc3333');
            $input.focus();
            $btn.add($input).attr('disabled', null);
        } else {
            $btn.add($input).attr('disabled', 'true');
            $.post('/form.php', {email: email, type:'json', action: 'subscribe'}).done(function() {
                $msg.show('slow');
                $input.css('color', '#000');
            });
        }

        return false;
    });

    $('.contacts-form').submit(function(event) {
        event.preventDefault();

        var $this = $(this);
        var $btn = $this.find('.contacts-btn-submit');
        var $msg = $this.find('.success-msg');

        var $email = $this.find('input[name=email]');
        var $phone = $this.find('input[name=phone]');
        var $name = $this.find('input[name=name]');
        var $message = $this.find('input[name=message]');
        var $type = $this.find('input[name=type]');
        var $fields = $btn.add($email).add($phone).add($name).add($message).add($type);

        var email = $email.val();
        var phone = $phone.val();
        var name = $name.val();
        var message = $message.val();
        var type = $type.val();

        if(!validateEmail(email)) {
            $email.css('color', '#cc3333');
            $email.focus();
            $fields.attr('disabled', null);
        } else {
            $fields.attr('disabled', 'true');

            $.post('/form.php', {email:email, phone:phone, name:name, message:message, user_type:type, type:'json', action: 'contact'}).done(function() {
                $msg.show('slow');
                $email.css('color', '#000');
            });
        }

        return false;
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Catch resizes
	$(window).scroll(function(){
    	menu_hide();
    });

	$(window).resize(function(){
        setTimeout(function() {
        	menu_dropdown();
        }, 1);
    });
});
