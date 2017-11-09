import * as Marionette from "backbone.marionette";
import * as Radio from "backbone.radio";
import * as toastr from "toastr";
import NotificationService from "../../services/notificationService";
import {ProductItemView} from "./productItemView";
import {ProductModel} from "../../models/productModel";

export class ProductsGridView extends Marionette.CollectionView<ProductModel, ProductItemView>{
    constructor(options?: any){
        options = options || {};
        options.tagName = "div";
        options.className = "product-grid";
        options.childView = ProductItemView;

        super(options);

        this.listenTo(Radio.channel(NotificationService.channelNames.order), NotificationService.actions.itemAdded, this.showPopup);
    }

    showPopup(itemId: Number){
        var item = this.collection.find(product => product.get("id") == itemId);

        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-bottom-center",
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };

        toastr.success(item.get("name") + " added to order.");
    }
}