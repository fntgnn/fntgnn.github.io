$(function(){   //doc ready

   $.ajax("./data/curriculum.json").done(function(curriculum){
       $('#container').html(compiledTemplate(curriculum));
   }); 

    var template= $('#template-container').html();
    var compiledTemplate = Handlebars.compile(template);
});
