import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import {OrdersActionsView} from "./ordersActionsView";
import {OrdersCollectionView} from "./ordersCollectionView";
import {LoadingView} from "../../components/loadingView";
import {OrderCollection} from "../../models/orderModel";
import OrderService from "../../services/orderService";
import * as Radio from "backbone.radio";

export class OrdersLayoutView extends Marionette.LayoutView<Backbone.Model>{
    paid: boolean;
    orders: OrderCollection;

    constructor(paid: boolean, options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/orders/ordersLayoutView");
        options.regions = {
            actionsRegion: "#actionsRegion",
            ordersRegion: "#ordersRegion"
        };

        super(options);

        this.paid = paid;

        this.handleNotifications();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.ordersLoaded, this.showOrdersList);
    }

    onShow(){
        this.showActionsPanel();
        this.loadOrdersList();
    }

    showActionsPanel(){
        let actionsView = new OrdersActionsView(this.paid);
        let region = this.getRegion("actionsRegion");
        region.show(actionsView);
    }

    loadOrdersList(){
        this.showLoadingView(this.getRegion("ordersRegion"));
        this.orders = new OrderService().getAll(this.paid);
    }

    showOrdersList(){
        let ordersCollectionView = new OrdersCollectionView({
            collection: this.orders
        });
        let region = this.getRegion("ordersRegion");
        region.show(ordersCollectionView);
    }

    showLoadingView(region: Marionette.Region){
        let loadingView = new LoadingView();
        region.show(loadingView);
    }
}