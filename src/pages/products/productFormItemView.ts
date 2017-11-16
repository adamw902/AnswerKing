import * as Marionette from "backbone.marionette";
import * as Syphon from "backbone.syphon";
import TemplateLoader from "../../utilities/templateLoader";
import NotificationService from "../../services/notificationService";
import ProductService from "../../services/productService";
import {ProductModel} from "../../models/productModel";

export class ProductFormItemView extends Marionette.ItemView<ProductModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/pages/products/productFormItemView")
        options.tagName = "div";
        options.className = "my-modal";

        options.events = {
            "click button.js-save": "saveProduct",
            "click button.js-delete": "deleteProduct",
            "click button.js-cancel": "closeModal"
        };

        super(options);

        this.ui = {
            addTitle: "#addTitle",
            editTitle: "#editTitle",
            nameInput: "#name",
            priceInput: "#price",
            deleteButton: "#deleteButton"
        };
    }

    onShow(){
        if (this.model.id){
            this.ui.editTitle.toggleClass("hidden");
            this.ui.nameInput.prop("value", this.model.name);
            this.ui.nameInput.prop("disabled", true);
            this.ui.priceInput.prop("value", this.model.price);
            this.ui.deleteButton.toggleClass("hidden");
        }
        else {
            this.ui.addTitle.toggleClass("hidden");
        }
    }

    saveProduct(e){
        let data = Syphon.serialize(this);
        if (this.model.id){
            this.model.set(data);
        }
        else {
            this.model = new ProductModel(data);
        }
        if (this.model.isValid()){
            e.preventDefault();
            new ProductService().save(this.model);
            new NotificationService().closeModal(NotificationService.channelNames.products);
        }
    }

    deleteProduct(e){
        e.preventDefault();
        new NotificationService().deleteModel(NotificationService.channelNames.products, this.model.id);
    }

    closeModal(e){
        e.preventDefault();
        new NotificationService().closeModal(NotificationService.channelNames.products);
    }
}