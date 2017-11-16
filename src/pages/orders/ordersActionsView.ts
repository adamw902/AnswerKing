import * as Marionette from "backbone.marionette";
import * as Radio from "backbone.radio";
import TemplateLoader from "../../utilities/templateLoader";
import SessionHelper from "../../utilities/sessionHelper";
import NotificationService from "../../services/notificationService";
import {RouterService} from "../../services/routerService";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";

export class OrdersActionsView extends Marionette.ItemView<Backbone.Model>{
    paid: boolean;

    constructor(paid: boolean, options?: any){
        options = options || {};

        options.template = new TemplateLoader().loadTemplate("/pages/orders/ordersActionsView");

        options.events = {
            "click button.js-new": "newOrder"
        };

        super(options);

        this.ui = {
            openOrdersButton: "#openOrdersButton",
            closedOrdersButton: "#closedOrdersButton"
        };

        this.paid = paid;
    }

    onShow(){
        if (new SessionHelper().isAdmin){
            if (this.paid){
                this.ui.openOrdersButton.toggleClass("hidden");
            }
            else{
                this.ui.closedOrdersButton.toggleClass("hidden");
            }
        }
    }

    newOrder(){
        new OrderService().newOrder();
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.orderCreated, this.showOrder);
    }

    showOrder(orderId: Number){
        new RouterService().showOrder(orderId);
    }
}