import * as Marionette from "backbone.marionette";
import * as Backbone from "backbone";
import {RouterService} from "./services/routerService";
import {HandleBarHelper} from "./utilities/handleBarHelper";

export class AnswerKing extends Marionette.Application {
    routerService: RouterService;

    constructor(){
        super();
        super.addRegions({
            mainRegion: "#mainRegion"
        });
        super.on("start", this.startApplication);
    }

    startApplication(){
        HandleBarHelper.bootstrap();
        
        this.routerService = new RouterService();
        this.routerService.setMainRegion(this.getRegion("mainRegion"));

        if(Backbone.history){
            Backbone.history.start();
        }
    }
}

$(document).ready(function(){
    var app = new AnswerKing();
    app.start();
});