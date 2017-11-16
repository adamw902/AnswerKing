import * as Marionette from "backbone.marionette";
import TemplateLoader from "../utilities/templateLoader";
import NotificationService from "../services/notificationService";

export class ConfirmDeleteView extends Marionette.ItemView<Backbone.Model>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/components/confirmDeleteView");
        options.className = "my-modal";

        options.events = {
            "click button.js-delete": "confirmDelete",
            "click button.js-cancel": "cancelDelete"
        };

        super(options);
    }

    confirmDelete(){
        new NotificationService().deleteConfirmed(this.model.get("channel"), this.model.get("id"));
    }

    cancelDelete(){
        new NotificationService().closeModal(this.model.get("channel"));
    }
}