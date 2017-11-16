import * as Marionette from "backbone.marionette";
import * as Syphon from "backbone.syphon";
import TemplateLoader from "../../utilities/templateLoader";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";

export class PaymentItemView extends Marionette.ItemView<OrderModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/order/paymentItemView");

        options.events = {
            "click button.js-pay": "pay"
        };

        super(options);
    }

    pay(e){
        let data = Syphon.serialize(this);
        this.model.set("payment", data.payment);
        
        if (this.model.isValid()){
            e.preventDefault();
            new OrderService().payForOrder(this.model);
        }
    }
}