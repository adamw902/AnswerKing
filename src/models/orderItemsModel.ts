import * as Backbone from "backbone";

export class OrderItemModel extends Backbone.Model {
    constructor(options?: any){
        options = options || {};
        super(options);
    }

    get name(){
        return this.get("name");
    }

    get price(){
        return this.get("price");
    }

    get quantity(){
        return this.get("quantity");
    }

    get itemId(){
        return this.get("itemId");
    }
}

export class OrderItemsCollection extends Backbone.Collection<OrderItemModel>{
    constructor(options?: any){
        options = options || {};
        super(options);
        
        this.model = OrderItemModel;
    }

    get totalCost(){
        var sum: number = 0.00;
        if (this.models){
            this.models.forEach(function(orderItem: OrderItemModel){
                sum += (orderItem.price * orderItem.quantity);
            });
        }
        return sum;
    }
}