sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller,UIComponent) {
	"use strict";

	return Controller.extend("MyApp.corpNavig.controller.oView", {
		onInit: function() {

		},
		
	onTileCrm: function(){
	var oRouter = UIComponent.getRouterFor(this);
	   oRouter.navTo("toDash");
		
	}
	});
});