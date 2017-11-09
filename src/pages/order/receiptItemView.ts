import * as Marionette from "backbone.marionette";
import TemplateLoader from "../../utilities/templateLoader";
import {ReceiptModel} from "../../models/receiptModel";

export class ReceiptItemView extends Marionette.ItemView<ReceiptModel>{
    constructor(options?: any){
        options = options || {};
        options.template = new TemplateLoader().loadTemplate("/src/pages/order/receiptItemView.html");

        super(options);
    }
}