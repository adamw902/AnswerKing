import * as Marionette from "backbone.marionette";
import * as Radio from "backbone.radio";
import * as toastr from "toastr";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";

export class ProductsGridView extends Marionette.CollectionView<Backbone.Model, Marionette.ItemView<Backbone.Model>>{
    constructor(options?: any){
        options = options || {};
        options.tagName = "div";
        options.className = "product-grid";

        super(options);

        this.listenTo(Radio.channel(NotificationService.channelNames.orders), NotificationService.actions.itemAdded, this.showPopup);
    }

    showCategories(){
        new NotificationService().showCategories();
    }

    showPopup(itemId: Number){
        let item = this.collection.find(product => product.get("id") == itemId);

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