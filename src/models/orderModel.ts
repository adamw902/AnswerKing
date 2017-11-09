import * as Backbone from "backbone";
import {OrderItemModel, OrderItemsCollection} from "./orderItemsModel";
import {ReceiptModel} from "./receiptModel";

export class OrderModel extends Backbone.Model{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.urlRoot = "http://localhost:8888/order";
    }

    parse(response){
        var orderItems = new OrderItemsCollection();
        orderItems.set(response.lineItems);

        var attributes = {
            id: response.id,
            paid: response.paid,
            lineItems: orderItems,
            receipt: new ReceiptModel(response.receipt),
            totalOrderCost: orderItems.totalCost
        };
        return attributes;
    }

    get id(){
        return this.get("id");
    }

    get orderItems(){
        return this.get("lineItems");
    }

    get receipt(){
        return this.get("receipt");
    }

    get paid(){
        return this.get("paid");
    }
}

export class OrderCollection extends Backbone.Collection<OrderModel>{
    constructor(options?: any){
        options = options || {};
        super(options);
        this.model = OrderModel;
        this.url = "http://localhost:8888/order";
    }
}