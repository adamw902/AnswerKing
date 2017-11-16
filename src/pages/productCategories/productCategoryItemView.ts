import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {CategoryModel} from "../../models/categoryModel";
import NotificationService from "../../services/notificationService";

export class ProductCategoryItemView extends Marionette.ItemView<CategoryModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/productCategories/productCategoryItemView");
        options.tagName = "div";
        options.className = "product-card";

        options.events = {
            "click button.js-select": "selectCategory"
        };

        super(options);
    }

    selectCategory(){
        new NotificationService().categorySelected(this.model.id);
    }
}