import {OrderCollection, OrderModel} from "../models/orderModel";
import {OrderItemsCollection} from "../models/orderItemsModel";
import NotificationService from "./notificationService";
import {RouterService} from "./routerService";
import * as Backbone from "backbone";
import {ReceiptModel} from "../models/receiptModel";

export default class OrderService{
    getAll(){
        var orders = new OrderCollection();
        orders.fetch({
            success: function(result){
                new NotificationService().ordersLoaded(orders);
            }
        });
    }

    getOne(id: Number){
        var order = new OrderModel({id: id});
        order.fetch({
            success: function(result){
                new NotificationService().orderLoaded(order);
            }
        });
    }

    newOrder(){
        var order = new OrderModel();
        order.save(order.attributes, { 
            success: function(result){
                new NotificationService().orderLoaded(order);
            }
        });
    }

    deleteOrder(order: OrderModel){
        order.destroy({
            success: function(){
                new RouterService().showOrders();
            }
        });
    }

    payForOrder(order: OrderModel){
        order.save(order.attributes, {
            success: function(result){
                new NotificationService().orderUpdated(order);
            }
        });
    }

    addItem(orderId: Number, itemId: Number){
        var order = new OrderModel({
            id: orderId,
            itemId: itemId
        });
        order.save(order.attributes, {
            dataType: "text",
            success: function(result){
                new NotificationService().itemAdded(itemId);
            }
        });
    }
}