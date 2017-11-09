import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import {LoadingView} from "../../components/loadingView";
import {ProductsGridView} from "../products/productsGridView";
import OrderService from "../../services/orderService";
import ItemService from "../../services/itemService";
import {ProductCollection} from "../../models/productModel";
import * as Radio from "backbone.radio";
import * as Backbone from "backbone";

export class OrderLayoutView extends Marionette.LayoutView<Backbone.Model>{
    ns: NotificationService;

    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/order/orderLayoutView.html");
        options.className = "order-div";
        options.regions = {
            productsRegion: "#productsRegion"
        };

        super(options);

        this.handleNotifications();
    }

    onShow(){
        this.loadProducts();
    }

    handleNotifications(){
        this.listenTo(Radio.channel(NotificationService.channelNames.products), NotificationService.actions.productsLoaded, this.showProducts);
        this.listenTo(Radio.channel(NotificationService.channelNames.order), NotificationService.actions.addItemToOrder, this.addItemToOrder);
    }

    showLoadingView(region: Marionette.Region){
        var loadingView = new LoadingView();
        region.show(loadingView);
    }

    loadProducts(){
        this.showLoadingView(this.getRegion("productsRegion"));
        new ItemService().getAll();
    }

    showProducts(products: ProductCollection){
        var productsGridView = new ProductsGridView({
            collection: products
        });
        this.getRegion("productsRegion").show(productsGridView);
    }

    addItemToOrder(itemId: Number){
        new OrderService().addItem(this.model.get("id"), itemId);
    }
}