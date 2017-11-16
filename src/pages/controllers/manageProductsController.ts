import {ManageProductsLayoutView} from "../products/manageProductsLayoutView";

export default class ManageProductsController{
    showManageProducts(mainRegion: Marionette.Region){
        let manageProductsLayoutView = new ManageProductsLayoutView();
        mainRegion.show(manageProductsLayoutView);
    }
}