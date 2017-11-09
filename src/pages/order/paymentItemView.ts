import * as Marionette from "backbone.marionette";
import * as Syphon from "backbone.syphon";
import TemplateLoader from "../../utilities/templateLoader";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";

export class PaymentItemView extends Marionette.ItemView<OrderModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/order/paymentItemView.html");
        options.tagName = "form";
        options.className = "pay-form";

        options.events = {
            "click button.js-pay": "pay"
        };

        super(options);
    }

    pay(e){
        e.preventDefault();
        var data = Syphon.serialize(this);
        this.model.set("payment", data.payment);
        new OrderService().payForOrder(this.model);
    }
}