import * as Radio from "backbone.radio";

export default class NotificationService{
    static channelNames = {
        "orders": "notifications::orders",
        "order": "notifications::order",
        "products": "notifications::products"
    };

    static actions = {
        ordersLoaded: "orders:loaded",
        orderLoaded: "order:loaded",
        productsLoaded: "products:loaded",
        addItemToOrder: "order:item:add",
        itemAdded: "order:item:added",
        orderUpdated: "order:updated"
    };

    ordersLoaded(result){
         Radio.channel(NotificationService.channelNames.orders).trigger(NotificationService.actions.ordersLoaded, result);
    }

    orderLoaded(result){
        Radio.channel(NotificationService.channelNames.order).trigger(NotificationService.actions.orderLoaded, result);
    }

    productsLoaded(result){
        Radio.channel(NotificationService.channelNames.products).trigger(NotificationService.actions.productsLoaded, result);
    }

    addItemToOrder(itemId){
        Radio.channel(NotificationService.channelNames.order).trigger(NotificationService.actions.addItemToOrder, itemId);
    }

    itemAdded(itemId){
        Radio.channel(NotificationService.channelNames.order).trigger(NotificationService.actions.itemAdded, itemId);
    }

    orderUpdated(result){
        Radio.channel(NotificationService.channelNames.order).trigger(NotificationService.actions.orderUpdated, result);
    }
}