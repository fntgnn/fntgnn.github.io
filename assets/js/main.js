$(function(){   //doc ready


    Handlebars.registerHelper('formatDate', function (date, format) {
        var mmnt = moment(date);
        return mmnt.format(format);
    });

   $.ajax("./data/curriculum.json").done(function(curriculum){
       $('#container').html(compiledTemplate(curriculum));
   }); 

    var template= $('#template-container').html();
    var compiledTemplate = Handlebars.compile(template);
});
