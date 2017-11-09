import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {ProductModel} from "../../models/productModel";
import NotificationService from "../../services/notificationService";

export class ProductItemView extends Marionette.ItemView<ProductModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/products/productItemView.html");
        options.tagName = "div";
        options.className = "product-card";

        options.events = {
            "click button.js-add": "addItemToOrder"
        };

        super(options);
    }

    addItemToOrder(){
        new NotificationService().addItemToOrder(this.model.get("id"));
    }
}