import * as Backbone from "backbone";
import * as _ from "underscore";
import {OrderItemModel, OrderItemsCollection} from "./orderItemsModel";
import {ReceiptModel} from "./receiptModel";

export class OrderModel extends Backbone.Model{
    errors;

    constructor(options?: any){
        options = options || {};
        super(options);
        this.urlRoot = "http://localhost:8888/order";
        this.attributes = this.customParse(options);
    }

    validate(attributes, options){
        this.errors = {};
        
        if (attributes.payment !== undefined && (attributes.payment === "" || attributes.payment == 0)){
            this.errors.payment = "Payment must be greater than zero!";
        }
        if (!_.isEmpty(this.errors)){
            return this.errors;
        }
    }

    customParse(attributes){
        var orderItems = new OrderItemsCollection();
        orderItems.set(attributes.lineItems);

        attributes.lineItems = orderItems;
        attributes.receipt = new ReceiptModel(attributes.receipt);
        attributes.totalOrderCost = orderItems.totalCost;

        return attributes;
    }

    parse(response){
        return this.customParse(response); 
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