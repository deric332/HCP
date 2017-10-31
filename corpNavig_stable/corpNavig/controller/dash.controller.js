sap.ui.define([

		"sap/ui/core/mvc/Controller",
		"sap/ui/core/UIComponent",
		"sap/ui/model/json/JSONModel"
	],
	function(Controller, UIComponent, JSONModel) {
		"use strict";
		var oController;
		
		// var oRouter = UIComponent.getRouterFor(this);
		
		function getLastFiveYears() {
			var startYear = new Date().getFullYear();
			var sl = startYear;
			var objyear = [];
			for (var i = 0; i <= 5; i++) {
				var b = {
					key: startYear,
					year: startYear
				};
				objyear.push(b);
				sl++;
				startYear--;
			}
			return objyear;
		}

		function setFinancialData(bUnit, months, year, state, tab) {
			var view;
			if (state == true) {
				view = "YTD";
			} else {
				view = "monthly";
			}
			
			if (tab == ""){
			tab = "__xmlview0--FINA";	
			}

			$.ajax({
				type: "GET",
				url: "https://corporatenavigas00172717327112.hanatrial.ondemand.com/CorporateNavigator/getKpiDetails?month=" + months + "&year=" +
					year + "&bu=" + bUnit + "&view=" + view + "&tabData=" + tab.substr(
						tab.length - 4, tab.length),
				dataType: "json",
				success: function(data, textStatus, jqXHR) {
					for (var i = 0; i < data.length; i++) {
						data[i].ccApPcent = Math.round(data[i].ccApPcent);
					}
					var oModelSales = new JSONModel(data);
					
					switch(  tab.substr(tab.length - 4, tab.length)){
						case "FINA":
							oController.getView().byId("salesList").setModel(oModelSales);
							break;
						case "CALM":
							oController.getView().byId("cashLiquidity").setModel(oModelSales);
							break;
						case "MAPE":
							oController.getView().byId("manAcc").setModel(oModelSales);
							break;
						case "NSAR":
							oController.getView().byId("compProg").setModel(oModelSales);
							break;
						case "NSAC":
							oController.getView().byId("netSale").setModel(oModelSales);
							break;
					}
					
					oController.getView().byId("salesList").setModel(oModelSales);
				}
			});
		}
		return Controller.extend("MyApp.corpNavig.controller.dash", {
			inputId: '',
			beforeRouteMatched : function(oEvent){
			debugger;
		},

			onInit: function() {
				oController = this;
				var adata = JSON.parse(JSON.stringify(getLastFiveYears()));
				var oModelYears = new JSONModel(adata);
				var oModel1 = new JSONModel("model/month.json");
				oModelYears.setData({
					yearlist: adata
				});
				if (window.image !== undefined){
				var imageData = JSON.parse(JSON.stringify(window.image));
				var oModelPImage = new JSONModel(imageData);
				oModelPImage.setData({
					image:imageData
				});
					oController.getView().byId("pImage").setModel(oModelPImage);
				}
				oController.getView().byId("mycom").setModel(oModel1);
				oController.getView().byId("lastYears").setModel(oModelYears);
			
				

				$.ajax({
					type: "GET",
					url: "https://corporatenavigas00172717327112.hanatrial.ondemand.com/CorporateNavigator/getAllBusinessUnit",
					dataType: "json",
					success: function(data, textStatus, jqXHR) {
						var oModel = new JSONModel(data);
						oController.getView().setModel(oModel);
					}
				});
			},
			onHome : function(){
				 var oRouter = UIComponent.getRouterFor(this);
				 oRouter.navTo("home");
			},
			onTabSelect: function() {
				
				
				setFinancialData(oController.getView().byId("bUnit").getModel().oData.bUnit,
					oController.getView().byId("mycom").getProperty("selectedKey"),
					oController.getView().byId("lastYears").getProperty("selectedKey"),
					oController.getView().byId("id_switch").getState(),
					oController.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey")
					);
			},
			onChangeMonth: function() {
				setFinancialData(oController.getView().byId("bUnit").getModel().oData.bUnit,
					oController.getView().byId("mycom").getProperty("selectedKey"),
					oController.getView().byId("lastYears").getProperty("selectedKey"),
					oController.getView().byId("id_switch").getState(),
					oController.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey")
					);
			},

			onChangeYear: function() {
				setFinancialData(oController.getView().byId("bUnit").getModel().oData.bUnit,
					oController.getView().byId("mycom").getProperty("selectedKey"),
					oController.getView().byId("lastYears").getProperty("selectedKey"),
					oController.getView().byId("id_switch").getState(),
					oController.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey"));
			},

			onChangeYTD: function() {
				setFinancialData(oController.getView().byId("bUnit").getModel().oData.bUnit,
					oController.getView().byId("mycom").getProperty("selectedKey"),
					oController.getView().byId("lastYears").getProperty("selectedKey"),
					oController.getView().byId("id_switch").getState(),
					oController.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey"));
			},

			handleValueHelp: function(oEvent) {
				var sInputValue = oEvent.getSource().getValue();
				this.inputId = oEvent.getSource().getId();

				// create value help dialog
				if (!this._valueHelpDialog) {
					this._valueHelpDialog = sap.ui.xmlfragment(
						"MyApp.corpNavig.view.Dialog",
						this
					);
					this.getView().addDependent(this._valueHelpDialog);
				}
				this._valueHelpDialog.open(sInputValue);
			},
			handleClose: function(oEvent) {
				var value = {
					bUnit: oEvent.mParameters.selectedItem.mProperties.description,
					bUnitCode: oEvent.mParameters.selectedItem.mProperties.title
				};
				JSON.parse(JSON.stringify(value));
				var oModelBunit = new JSONModel(value);
				oController.getView().byId("bUnit").setModel(oModelBunit);
				if (oEvent.mParameters.selectedItem.mProperties.title != null) { 

					setFinancialData(oController.getView().byId("bUnit").getModel().oData.bUnit,
						oController.getView().byId("mycom").getProperty("selectedKey"),
						oController.getView().byId("lastYears").getProperty("selectedKey"),
						oController.getView().byId("id_switch").getState(),
					oController.getView().byId("idIconTabBarNoIcons").getProperty("selectedKey"));

				}

			}
		});
	});