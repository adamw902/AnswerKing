import * as Marionette from "backbone.marionette";
import * as Backbone from "backbone";
import * as Radio from "backbone.radio";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";
import {LoadingView} from "../../components/loadingView";
import {OrderItemsCompositeView} from "../orderItems/orderItemsCompositeView";
import {PaymentItemView} from "./paymentItemView";
import {ReceiptItemView} from "./receiptItemView";

export class ReviewOrderLayoutView extends Marionette.LayoutView<Backbone.Model>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/order/reviewOrderLayoutView.html");
        options.tagName = "div";
        options.className = "review-order-div";

        options.regions = {
            orderItemsRegion: "#orderItemsRegion",
            paymentRegion: "#paymentRegion",
            receiptRegion: "#receiptRegion"
        };

        super(options);

        this.handleNotifications();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.order), NotificationService.actions.orderLoaded, this.loadReview);
        this.listenTo(Radio.channel(NotificationService.channelNames.order), NotificationService.actions.orderUpdated, this.loadReview);
    }

    onShow(){
        this.loadOrder();
    }

    loadOrder(){
        this.showLoadingView(this.getRegion("orderItemsRegion"));
        new OrderService().getOne(this.model.get("id"));
    }

    showLoadingView(region: Marionette.Region){
        var loadingView = new LoadingView();
        region.show(loadingView);
    }

    showOrderItems(order: OrderModel){
        var orderItemsCompositeView = new OrderItemsCompositeView({
            collection: order.orderItems,
            model: order
        });
        
        this.getRegion("orderItemsRegion").show(orderItemsCompositeView);
    }

    loadReview(order: OrderModel){
        var orderItemsCompositeView = new OrderItemsCompositeView({
            collection: order.orderItems,
            model: order
        });
        this.getRegion("orderItemsRegion").show(orderItemsCompositeView);

        if (!order.get("paid")){
            var paymentItemView = new PaymentItemView({
                model: order
            });
            this.getRegion("paymentRegion").show(paymentItemView);
        }
        else {
            this.getRegion("paymentRegion").empty();
            $("#closeReviewOrderDiv").toggleClass("hidden");
            $("#closeOrderDiv").toggleClass("hidden");

            var receiptItemView = new ReceiptItemView({
                model: order.receipt
            });
            this.getRegion("receiptRegion").show(receiptItemView);
        }
    }
}