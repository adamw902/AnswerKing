import * as Backbone from "backbone";
import {LoginItemView} from "../../pages/login/loginItemView";

export default class LoginController{
    showLogin(mainRegion: Marionette.Region){
        let loginItemView = new LoginItemView();
        mainRegion.show(loginItemView);
    }
}