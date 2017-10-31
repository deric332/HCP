sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(Controller, UIComponent, JSONModel) {
	"use strict";

	return Controller.extend("MyApp.corpNavig.controller.oView", {
		onInit: function() {
			if (window.image !== undefined) {
				var imageData = JSON.parse(JSON.stringify(window.image));
				var oModelPImage = new JSONModel(imageData);
				oModelPImage.setData({
					image: imageData
				});
				this.getView().byId("pImage_oView").setModel(oModelPImage);
			}

		},

		onTileCrm: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("toDash");

		}
	});
});