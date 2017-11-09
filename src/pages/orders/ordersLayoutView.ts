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
    ns: NotificationService;

    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/orders/ordersLayoutView.html");
        options.regions = {
            actionsRegion: "#actionsRegion",
            ordersRegion: "#ordersRegion"
        };

        super(options);

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
        var actionsView = new OrdersActionsView();
        this.getRegion("actionsRegion").show(actionsView);
    }

    loadOrdersList(){
        this.showLoadingView(this.getRegion("ordersRegion"));
        new OrderService().getAll();
    }

    showOrdersList(orders: OrderCollection){
        if (orders){
            var filteredOrders = orders.models.filter(order => order.get("paid") === false);
            orders.models = filteredOrders;
        }
        var ordersCollectionView = new OrdersCollectionView({
            collection: orders
        });
        this.getRegion("ordersRegion").show(ordersCollectionView);
    }

    showLoadingView(region: Marionette.Region){
        var loadingView = new LoadingView();
        region.show(loadingView);
    }
}