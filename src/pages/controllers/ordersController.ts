import {OrdersLayoutView} from "../orders/ordersLayoutView";
import {OrderLayoutView} from "../order/orderLayoutView";
import {ReviewOrderLayoutView} from "../order/reviewOrderLayoutView";
import NotificationService from "../../services/notificationService";
import * as Backbone from "backbone";

export class OrdersController{
    constructor(){}

    listOrders(mainRegion: Marionette.Region){
        var ordersLayoutView = new OrdersLayoutView();
        mainRegion.show(ordersLayoutView);
    }

    showOrder(mainRegion: Marionette.Region, id: Number){
        var orderLayoutView = new OrderLayoutView({model: new Backbone.Model({"id":id})});
        mainRegion.show(orderLayoutView);
    }

    showOrderReview(mainRegion: Marionette.Region, id: Number){
        var reviewOrderItemView = new ReviewOrderLayoutView({model: new Backbone.Model({"id": id})});
        mainRegion.show(reviewOrderItemView);
    }
}