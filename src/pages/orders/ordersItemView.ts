import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";
import {RouterService} from "../../services/routerService";

export class OrdersItemView extends Marionette.ItemView<OrderModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/orders/orderItemView.html");
        options.tagName = "li";
        options.className = "list-group-item"
        options.events = {
            "click button.js-delete": "deleteOrder"
        };

        super(options);
    }

    deleteOrder(e){
        e.preventDefault();
        new OrderService().deleteOrder(this.model);
    }
}