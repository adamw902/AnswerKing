import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";
import {RouterService} from "../../services/routerService";
import * as Radio from "backbone.radio";

export class OrdersActionsView extends Marionette.ItemView<Backbone.Model>{
    constructor(options?: any){
        options = options || {};

        options.template = new TemplateLoader().loadTemplate("/src/pages/orders/ordersActionsView.html");
        options.regions = {
            actionsRegion: "#actionsRegion",
            ordersRegion: "#ordersRegion"
        };
        options.events = {
            "click button.js-new": "newOrder"
        };

        super(options);
    }

    newOrder(){
        new OrderService().newOrder();
        this.listenTo(Radio.channel(NotificationService.channelNames.order), NotificationService.actions.orderLoaded, this.showOrder);
    }

    showOrder(order: OrderModel){
        new RouterService().showOrder(order.get("id"));
    }
}