import * as Marionette from "backbone.marionette";
import TemplateLoader from "../utilities/templateLoader";

export class LoadingView extends Marionette.ItemView<Backbone.Model>{
    constructor(options?: any){
        if (!options){
            options = {};
        }
        options.tagName = "div";
        options.className = "loading-container";
        options.template = new TemplateLoader().loadTemplate("/src/components/loadingView.html");
        super(options);
    }
}