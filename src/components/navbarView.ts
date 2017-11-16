import * as Backbone from "backbone";
import * as Marionette from "backbone.marionette";
import TemplateLoader from "../utilities/templateLoader";
import SessionHelper from "../utilities/sessionHelper";

export class NavbarView extends Marionette.ItemView<Backbone.Model>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/components/navbarView");
        options.className = "navbar-collapse collapse";
        options.id = "navbar";

        super(options);
    }

    onShow(){
        if (new SessionHelper().isAdmin){
            $("#products").toggleClass("hidden");
        }
        
        let page = Backbone.history.getFragment();
        
        page = page.match('([aA-z])+?(?=[^a-z])|.+[a-z]')[0];
        
        $(`#${page}`).toggleClass("active");
    }
}