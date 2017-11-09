import Handlebars = require("handlebars");

export default class TemplateLoader{
    loadTemplate(path){
        // Handlebars.templates = Handlebars.templates || {};

        // if (Handlebars.templates[path] !== undefined){
        //     return Handlebars.templates[path];
        // }
        var template;
        $.ajax({
            url: path,
            success: function(fileContent){ template = Handlebars.compile(fileContent); },
            dataType: "html",
            async: false
        });

        return template;
    }
}