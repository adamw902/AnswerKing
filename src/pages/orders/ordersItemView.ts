import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";
import {RouterService} from "../../services/routerService";

export class OrdersItemView extends Marionette.ItemView<OrderModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/orders/ordersItemView");
        options.tagName = "li";
        options.className = "list-group-item"
        options.events = {
            "click button.js-delete": "deleteOrder"
        };

        super(options);

        this.ui = {
            ordersItemActions: "#ordersItemActions",
            ordersItemTotal: "#ordersItemTotal"
        };
    }

    onShow(){
        if (this.model.paid){
            this.ui.ordersItemActions.toggleClass("hidden");
            this.ui.ordersItemTotal.toggleClass("hidden");
        }
    }

    deleteOrder(e){
        e.preventDefault();
        new OrderService().deleteOrder(this.model);
    }
}