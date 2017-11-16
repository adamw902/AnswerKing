import * as Marionette from "backbone.marionette";
import * as Backbone from "backbone";
import NavbarController from "../components/navbarController";
import OrdersController from "../pages/controllers/ordersController";
import LoginController from "../pages/controllers/loginController";
import ManageProductsController from "../pages/controllers/manageProductsController";

export class RouterService extends Marionette.AppRouter{
    static mainRegion: Marionette.Region;
    static navbarRegion: Marionette.Region;
    navbarController: NavbarController;
    ordersController: OrdersController;
    loginController: LoginController;
    manageProductsController: ManageProductsController;

    constructor(){
        super();

        this.processAppRoutes(this, {
            "": "showLogin",
            "login": "showLogin",
            "orders": "showOrders",
            "orders?:paid": "showOrders",
            "orders/:id": "showOrder",
            "orders/:id/review": "showOrderReview",
            "products": "showManageProducts"
        });

        this.navbarController = new NavbarController();
        this.ordersController = new OrdersController();
        this.loginController = new LoginController();
        this.manageProductsController = new ManageProductsController();
    }

    setMainRegion(mainRegion: Marionette.Region){
        RouterService.mainRegion = mainRegion;
    }

    setNavbarRegion(navbarRegion: Marionette.Region){
        RouterService.navbarRegion = navbarRegion;
    }

    showLogin(){
        this.navigate("login");
        this.loginController.showLogin(RouterService.mainRegion);
    }

    showOrders(paidParam){
        let paid = paidParam === "paid" ? true : false;
        let url = paid ? "orders?paid" : "orders";
        this.navigate(url);
        this.showHeader();
        this.ordersController.listOrders(RouterService.mainRegion, paid);
    }

    showOrder(id: Number){
        this.navigate(`orders/${id}`);
        this.showHeader();
        this.ordersController.showOrder(RouterService.mainRegion, id);
    }

    showOrderReview(id: Number){
        this.navigate(`orders/${id}/review`);
        this.showHeader();
        this.ordersController.showOrderReview(RouterService.mainRegion, id);
    }

    showManageProducts(){
        this.navigate("products");
        this.showHeader();
        this.manageProductsController.showManageProducts(RouterService.mainRegion);
    }

    showHeader(){
        this.navbarController.showHeader(RouterService.navbarRegion);
    }
}