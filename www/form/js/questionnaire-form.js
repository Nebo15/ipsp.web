var form = $("#questionnaire-form"), // form
    data = [];                       // form data

form.validate({
    errorPlacement: function errorPlacement(error, element) { 
        element.before(error);
    },
});

form.on('click', '#business-address-check', function(){
    if (this.checked){
        adrs = $( "#legal-address :input" ).serializeArray();
        $.each($( "#business-address :input" ).serializeArray(), function (i, field) { 
            $( "input[name='" + field.name + "']" ).val(adrs[i].value); 
            $('.checkbox').css('backgroundImage','url("/img/check.png")');
        });
    } else {
        $( "#business-address :input" ).val('');
        $('.checkbox').css('backgroundImage','url("/img/uncheck.png")');
    }     
});

form.steps({
    headerTag       : "h3",
    bodyTag         : "section",
    transitionEffect: "slideLeft",
    stepsOrientation: "horizontal",
    labels: { next: 'next', previous: 'back', finish: 'submit' },
    
    onStepChanging: function (event, currentIndex, newIndex) {
        form.validate().settings.ignore = ":disabled,:hidden";
        return newIndex < currentIndex ? true : form.valid(); // Step validation
        //return true; 
    },

    onStepChanged: function (event, currentIndex, priorIndex) {
        currentIndex++;
        priorIndex++;
        $('#questionnaire-form-step-label').html('step ' + currentIndex);
        $('#step-' + currentIndex).css('display','block');
        $('#step-' + priorIndex).css('display','none');
    },

    onFinishing: function (event, currentIndex)
    {
        if ( form.valid() ) {
            $.each(form.serializeArray(), function (i, field) {
                item = {};
                item["field"] = field.name;
                item["value"] = field.value;
                data.push(item);
            });
            console.log(JSON.stringify(data));

            $.ajax({
                type: "POST",
                url: 'send.php',
                data: {'data' : JSON.stringify(data)},
                success: function (data) {  
                    $( ".questionnaire-form-conteiner" ).css('display','none');
                    $( ".pop-up" ).slideDown("fast");
                }    
            });
        }  
    }
}); 