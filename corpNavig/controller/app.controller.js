sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment"
], function(Controller, JSONModel, Filter, FilterOperator, MessageBox, MessageToast, Router, UIComponent,Fragment) {
	" use strict";
	var oController;
	var pImage;
	return Controller.extend("MyApp.corpNavig.controller.app", {
		
		
		onRegisterSubmit: function(oEvent){
			var oCtx = oEvent.getSource().getBindingContext();
			var oFirstName = Fragment.byId("registration","firstName");
			var oLastName  = Fragment.byId("registration","lastName");
			var oEmail  = Fragment.byId("registration","email");
			var oPass  = Fragment.byId("registration","pass");
			var oCPass  = Fragment.byId("registration","cPass");
			$.ajax({
				type: "POST",
				content:"application/json",
				url: "https://corporatenavigas00172717327112.hanatrial.ondemand.com/CorporateNavigator/registration",
				data: {"id": "130",
						"firstName":oFirstName.mProperties.value,
						"lastName":oLastName.mProperties.value,
						"userName":oLastName.mProperties.value,
						"prImage":window.pImage,
						"email":oEmail.mProperties.value,
						"password":oPass.mProperties.value
				},
						
        		processData: false,
				success: function(data, textStatus, jqXHR){
					alert("Done");
				},
				error:function(data, textStatus, jqXHR){
					alert("Error");
				}
			});
			// var fileName =ofileUploader.getValue()
			
			debugger;
		},
	    onFileChanged : function(oEvent) {
				debugger;
				var oFileUploader = oEvent.getSource();
				var reader = new FileReader(); //
				reader.readAsDataURL(oEvent.getParameters().files[0]);
				reader.onload = function() {
					window.pImage = reader.result;
				};
			},
		onRegister: function(oEvent){
				if (!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("registration","MyApp.corpNavig.view.register", this);
					this.getView().addDependent(this._oPopover);
				}

				var oButton = oEvent.getSource();
				jQuery.sap.delayedCall(0, this, function() {
					this._oPopover.openBy(oButton);
				});
			
		},
		
		onExcla: function(oEvent){
			// if (!this._oPopover) {
			// 		this._oPopover = sap.ui.xmlfragment("MyApp.corpNavig.view.resetPassword", this);
			// 		this.getView().addDependent(this._oPopover);
			// 	}

			// 	var oButton = oEvent.getSource();
			// 	jQuery.sap.delayedCall(0, this, function() {
			// 		this._oPopover.openBy(oButton);
			// 	});
		},

		onDrive: function() {
			gapi.savetodrive.render('__xmlview0--render-link', {
				src: './img/Leads.png',
				filename: 'MyImage.png',
				sitename: 'My Company Name'
			});
			// document.getElementById("__xmlview0--render-link").addEventListener("click", renderSaveToDrive);
		},
		onLogin: function() {
			oController = this;
			var userName = this.getView().getModel("login").getProperty("/userName");
			this.getView().getModel("TempDataModel").setProperty("/", {
				"FirstName": userName
			});
			var password = this.getView().getModel("login").getProperty("/password");

			if ((userName && null || userName != "") && (password != null && password != "")) {

				$.ajax({
					type: "GET",
					//url: https://corporatenavigas0017271710tria.hanatrial.ondemand.com/CorporateNavigator/callLoginProc?userName=test&password=test 
					url: "https://corporatenavigas00172717327112.hanatrial.ondemand.com/CorporateNavigator/getAllUserNamedQueryWithParam?" +
						"userName=" + (userName) + "&" + "password=" + (password),
					// url: "https://corporatenavigas0017271710tria.hanatrial.ondemand.com/CorporateNavigator/getUsersNamedQueryWithParam?"+"userName="+(userName)+"&"+"password="+(password),
					dataType: "json",
					// data: userName,
					success: function(data, textStatus, jqXHR) {
						if (data.status == "Valid") {
							window.image = data.prImage;
							MessageToast.show(userName + " succesfully authenticated", {
								duration: 5000, // default
								width: "33%", // default
								my: "center bottom", // default
								at: "center bottom", // default
								of: window, // default
								offset: "0 0", // default
								collision: "fit fit", // default
								onClose: null, // default
								autoClose: true, // default
								animationTimingFunction: "ease", // default
								animationDuration: 10000, // default
								closeOnBrowserNavigation: true // default
							}); // succesfully authenticated
							var oRouter = UIComponent.getRouterFor(oController);
							oRouter.navTo("second");
							// Router.getRouter();		
						} else {
							var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
							MessageBox.error("Inavlid username or password", {
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							});

						}
					},
					error: function(jqXHR, textStatus, errorThrown) {
						alert("Service broken ");
						// var oRouter = UIComponent.getRouterFor(oController);
						// oRouter.navTo("second",{appData:this},true);
					}
				});
			} else if (userName == null || userName == "") {
				var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.alert("Username cannot be empty", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});
			} else if (password == null || password == "") {
				var bCompact = !!oController.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.alert("Please enter the password", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				});
			}

		}

	});
});