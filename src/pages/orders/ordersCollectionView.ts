import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {OrdersItemView} from "./ordersItemView";
import {OrderModel} from "../../models/orderModel";
import * as Radio from "backbone.radio";
import NotificationService from "../../services/notificationService";

export class OrdersCollectionView extends Marionette.CollectionView<OrderModel, OrdersItemView>{
    constructor(options?: any){
        options = options || {};
        options.tagName = "ul";
        options.className = "list-group"
        options.childView = OrdersItemView;

        super(options);
    }
}