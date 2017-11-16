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
    order: OrderModel;

    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/order/reviewOrderLayoutView");
        options.tagName = "div";
        options.className = "review-order-div";

        options.regions = {
            orderItemsRegion: "#orderItemsRegion",
            paymentRegion: "#paymentRegion",
            receiptRegion: "#receiptRegion"
        };

        super(options);

        this.ui = {
            closeReviewOrderDiv: "#closeReviewOrderDiv",
            closeOrderDiv: "#closeOrderDiv"
        };

        this.handleNotifications();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.orderLoaded, this.loadReview);
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.orderUpdated, this.loadPaymentOrReceipt);
    }

    onShow(){
        this.loadOrder();
    }

    loadOrder(){
        this.showLoadingView(this.getRegion("orderItemsRegion"));
        this.order = new OrderService().getOne(this.model.get("id"));
    }

    showLoadingView(region: Marionette.Region){
        let loadingView = new LoadingView();
        region.show(loadingView);
    }

    showOrderItems(){
        let orderItemsCompositeView = new OrderItemsCompositeView({
            collection: this.order.orderItems,
            model: this.order
        });
        let region = this.getRegion("orderItemsRegion");
        region.show(orderItemsCompositeView);
    }

    loadReview(){
        this.loadItems();
        this.loadPaymentOrReceipt();
    }

    loadItems(){
        let orderItemsCompositeView = new OrderItemsCompositeView({
            collection: this.order.orderItems,
            model: this.order
        });
        let region = this.getRegion("orderItemsRegion");
        region.show(orderItemsCompositeView);
    }

    loadPaymentOrReceipt(){
        if (this.order.orderItems.length > 0){
            if (!this.order.get("paid")){
                let paymentItemView = new PaymentItemView({
                    model: this.order
                });
                let region = this.getRegion("paymentRegion");
                region.show(paymentItemView);
            }
            else {
                let region = this.getRegion("paymentRegion");
                region.empty();
                this.ui.closeReviewOrderDiv.toggleClass("hidden");
                this.ui.closeOrderDiv.toggleClass("hidden");
    
                let receiptItemView = new ReceiptItemView({
                    model: this.order.receipt
                });
                region = this.getRegion("receiptRegion");
                region.show(receiptItemView);
            }
        }
    }
}