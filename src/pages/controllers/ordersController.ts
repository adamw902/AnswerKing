import * as Backbone from "backbone";
import NotificationService from "../../services/notificationService";
import {OrderModel} from "../../models/orderModel";
import {OrdersLayoutView} from "../orders/ordersLayoutView";
import {OrderLayoutView} from "../order/orderLayoutView";
import {ReviewOrderLayoutView} from "../order/reviewOrderLayoutView";

export default class OrdersController{
    listOrders(mainRegion: Marionette.Region, paid: boolean){
        let ordersLayoutView = new OrdersLayoutView(paid);
        mainRegion.show(ordersLayoutView);
    }

    showOrder(mainRegion: Marionette.Region, id: Number){
        let orderLayoutView = new OrderLayoutView({model: new OrderModel({"id":id})});
        mainRegion.show(orderLayoutView);
    }

    showOrderReview(mainRegion: Marionette.Region, id: Number){
        let reviewOrderItemView = new ReviewOrderLayoutView({model: new Backbone.Model({"id": id})});
        mainRegion.show(reviewOrderItemView);
    }
}