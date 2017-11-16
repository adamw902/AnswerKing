import * as Marionette from "backbone.marionette";
import NotificationService from "../../services/notificationService";
import TemplateLoader from "../../utilities/templateLoader";
import {ProductModel} from "../../models/productModel";

export class EditProductItemView extends Marionette.ItemView<ProductModel> {
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/products/editProductItemView");
        options.tagName = "div";
        options.className = "product-card";

        options.events = {
            "click button.js-edit": "editProduct"
        };

        super(options);
    }

    editProduct(){
        new NotificationService().editProduct(this.model.id);
    }
}