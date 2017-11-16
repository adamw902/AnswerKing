import * as Marionette from "backbone.marionette";
import * as Syphon from "backbone.syphon";
import TemplateLoader from "../../utilities/templateLoader";
import {RouterService} from "../../services/routerService";

export class LoginItemView extends Marionette.ItemView<Backbone.Model>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/login/loginItemView");

        options.events = {
            "click button.js-login": "login"
        };

        super(options);
    }

    login(e){
        e.preventDefault();
        let data = Syphon.serialize(this);

        if (data.username === "manager"){
            sessionStorage.setItem("isAdmin", "true");
        }
        else {
            sessionStorage.removeItem("isAdmin");
        }

        new RouterService().showOrders(false);
    }
}