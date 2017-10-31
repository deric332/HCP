sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/IconPool"
], function(UIComponent, JSONModel, IconPool) {
	"use strict";
	// var oUIComponent;
	return UIComponent.extend("MyApp.corpNavig.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			IconPool.addIcon("loginUser", "fa", {
				fontFamily: "FontAwesome",
				content: "f2c0"
			});
			 
		}

	});
});