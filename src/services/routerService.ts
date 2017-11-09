import * as Marionette from "backbone.marionette";
import * as Backbone from "backbone";
import {OrdersController} from "../pages/controllers/ordersController";

export class RouterService extends Marionette.AppRouter{
    static mainRegion: Marionette.Region;
    ordersController: OrdersController;

    constructor(){
        super();

        this.processAppRoutes(this, {
            "orders": "showOrders",
            "orders/:id": "showOrder",
            "orders/:id/review": "showOrderReview"
        });

        this.ordersController = new OrdersController();
    }

    setMainRegion(mainRegion: Marionette.Region){
        RouterService.mainRegion = mainRegion;
    }

    showOrders(){
        this.navigate("orders");
        this.ordersController.listOrders(RouterService.mainRegion);
    }

    showOrder(id: Number){
        this.navigate("orders/" + id);
        this.ordersController.showOrder(RouterService.mainRegion, id);
    }

    showOrderReview(id: Number){
        this.navigate("orders/" + id + "/review");
        this.ordersController.showOrderReview(RouterService.mainRegion, id);
    }
}