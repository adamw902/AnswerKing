import {OrderCollection, OrderModel} from "../models/orderModel";
import {OrderItemsCollection} from "../models/orderItemsModel";
import NotificationService from "./notificationService";
import {RouterService} from "./routerService";
import * as Backbone from "backbone";
import {ReceiptModel} from "../models/receiptModel";

export default class OrderService{
    getAll(paid: boolean){
        let orders = new OrderCollection();
        orders.fetch({
            data: $.param({paid: paid}),
            success: function(result){
                new NotificationService().ordersLoaded();
            }
        });
        return orders;
    }

    getOne(id: Number){
        let order = new OrderModel({id: id});
        order.fetch({
            success: function(result){
                new NotificationService().orderLoaded();
            }
        });
        return order;
    }

    newOrder(){
        let order = new OrderModel();
        order.save(order.attributes, { 
            success: function(result){
                new NotificationService().orderCreated(order.id);
            }
        });
    }

    deleteOrder(order: OrderModel){
        order.destroy({
            success: function(){
                new RouterService().showOrders(false);
            }
        });
    }

    payForOrder(order: OrderModel){
        order.save(order.attributes, {
            success: function(result){
                new NotificationService().orderUpdated();
            }
        });
        return order;
    }

    addItem(orderId: Number, itemId: Number){
        let order = new OrderModel({
            id: orderId,
            itemId: itemId
        });
        order.save(order.attributes, {
            success: function(result){
                new NotificationService().itemAdded(itemId);
            }
        });
    }
}