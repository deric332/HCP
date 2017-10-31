sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",
	"sap/ui/core/UIComponent"
], function(Controller,JSONModel,Filter,FilterOperator,MessageBox,MessageToast,Router,UIComponent) {
	" use strict";
	 var oController;
	return Controller.extend("MyApp.corpNavig.controller.app", {
          
        onInit: function(){
        	alert("controller called"); 
        }   ,  

		onLogin: function() {
			oController = this;
			var userName = this.getView().getModel("login").getProperty("/userName"); 
			var password = this.getView().getModel("login").getProperty("/password");
			// var customUrl =  
			if ((userName && null || userName != "") && (password != null && password != "")){
				
				$.ajax({
				type: "GET",
				url: "https://corporatenavigas0017271710tria.hanatrial.ondemand.com/corporate-navigator2/getUsersNamedQueryWithParam?"+"userName="+(userName)+"&"+"password="+(password),
				dataType: "json",
				// data: userName,
				success: function(data, textStatus, jqXHR) {
					if (data.status == "Valid"){
				MessageToast.show(userName + " succesfully authenticated", {
												    duration: 5000,                  // default
												    width: "33%",                   // default
												    my: "center bottom",             // default
												    at: "center bottom",             // default
												    of: window,                      // default
												    offset: "0 0",                   // default
												    collision: "fit fit",            // default
												    onClose: null,                   // default
												    autoClose: true,                 // default
												    animationTimingFunction: "ease", // default
												    animationDuration: 10000,         // default
												    closeOnBrowserNavigation: true   // default
								}); // succesfully authenticated
						var oRouter = UIComponent.getRouterFor(oController);
							oRouter.navTo("second");
						// Router.getRouter();		
					} else {
						var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.error("Inavlid username or password",{
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						});
						
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("Service broken ");
				}
			});
			}else if(userName == null || userName == ""){
				var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.alert("Username cannot be empty",{
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						});
					}else if(password == null || password == ""){
						var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
						MessageBox.alert("Please enter the password",{
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						});
					}
			

		}

	});
});