import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {OrderItemModel} from "../../models/orderItemsModel";

export class OrderItemsItemView extends Marionette.ItemView<OrderItemModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/orderItems/orderItemsItemView");
        options.tagName = "li";
        options.className = "list-group-item";
        
        super(options);
    }
}