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
			this.setModel(new JSONModel() , "TempDataModel");
			this.getRouter().initialize();
			IconPool.addIcon("logoff", "fa", {fontFamily: "FontAwesome",	content: "f011"});
			IconPool.addIcon("back", "fa", {fontFamily: "FontAwesome",	content: "f048"});
			IconPool.addIcon("print", "fa", {fontFamily: "FontAwesome",	content: "f02f"});
			IconPool.addIcon("upload", "fa", {fontFamily: "FontAwesome",	content: "f093"});
			IconPool.addIcon("home", "fa", {fontFamily: "FontAwesome",	content: "f015"});
			 
		}

	});
});