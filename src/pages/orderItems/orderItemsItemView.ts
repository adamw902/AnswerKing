import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {OrderItemModel} from "../../models/orderItemsModel";

export class OrderItemsItemView extends Marionette.ItemView<OrderItemModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/orderItems/orderItemsItemView.html");
        options.tagName = "li";
        options.className = "list-group-item";

        // options.events = {
        //     "click button.js-add": "addItem"
        // };
        
        super(options);
    }

    // addItem(){
    //     debugger;
    //     var itemId = this.model.get("item").id; 
    // }
}