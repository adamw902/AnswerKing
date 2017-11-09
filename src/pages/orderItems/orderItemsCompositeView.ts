import * as Marionette from "backbone.marionette";
import Syphon from "backbone.syphon";
import TemplateLoader from "../../utilities/templateLoader";
import {OrderItemModel, OrderItemsCollection} from "../../models/orderItemsModel";
import {OrderItemsItemView} from "./orderItemsItemView";
import OrderService from "../../services/orderService";
import {OrderModel} from "../../models/orderModel";
import NotificationService from "../../services/notificationService";
import * as Radio from "backbone.radio";

export class OrderItemsCompositeView extends Marionette.CompositeView<OrderItemModel, OrderItemsItemView>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/orderItems/orderItemsCompositeView.html");
        options.childView = OrderItemsItemView;
        options.childViewContainer = "ul"

        super(options);
    }
}