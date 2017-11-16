import * as Backbone from "backbone";
import {NavbarView} from "../components/navbarView";

export default class NavbarController{
    showHeader(headerRegion: Marionette.Region){
        let headerView = new NavbarView();
        headerRegion.show(headerView);
    }
}