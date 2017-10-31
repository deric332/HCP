sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/UIComponent",
		"sap/ui/model/json/JSONModel",
		"sap/ui/unified/FileUploader"
	],
	function(Controller, UIComponent, JSONModel,FileUploader) {
		"use strict";
		var oController;
		// var image;
		var content;
		return Controller.extend("MyApp.corpNavig.controller.dash", {
			inputId: '',

			onInit: function() {
				oController = this;
				var adata = JSON.parse(JSON.stringify(getLastFiveYears()));
				var oModelYears = new JSONModel(adata);
				var oModel1 = new JSONModel("model/month.json");
				oModelYears.setData({
					yearlist: adata
				});
				if (window.image !== undefined) {
					var imageData = JSON.parse(JSON.stringify(window.image));
					var oModelPImage = new JSONModel(imageData);
					oModelPImage.setData({
						image: imageData
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
			onExit: function() {
				if (this._oPopover) {
					this._oPopover.destroy();
				}
			},
		
			onFileChanged: function(oEvent) {
				debugger;
				var oFileUploader = oEvent.getSource();
				var reader = new FileReader();
				reader.readAsDataURL(oEvent.getParameters().files[0]);
				reader.content= oEvent.getParameters().files[0].type;
				reader.onload = function(image) {
					image = reader.result;
					var blob = b64toBlob(image,reader.content);
					var blobUrl = URL.createObjectURL(blob);
					// var url = blobUrl.substring(5,blobUrl.length);
					console.log(blobUrl);
					gapi.savetodrive.render('render-link', {
						src: blobUrl,
						filename: 'tester.jpg',
						sitename: 'MyTest'
					});
				};
				reader.onerror = function(error) {
					console.log('Error: ', error);
				};
				// var img = oFileUploader.getProperty("value");

			},
			
			onUploadStart: function(oEvent) {
				debugger;
				var oFileUploader = oEvent.getSource();
				var reader = new FileReader(); //
				reader.readAsDataURL(oEvent.getParameters().fileName);
				reader.onload = function() {
					console.log(reader.result);
				};
				// var img = oFileUploader.getProperty("value");

			},
			handleUploadPress: function(oEvent) {
				var oFileUploader = this.getView().byId("fileUploader");
				oFileUploader.upload();

			},
			handleUploadComplete: function(oEvent) {
				// debugger;
				var oFileUploader = oController.getView().byId("fileUploader");
				oFileUploader.upload();
			},
			onUpload: function(oEvent) {
				if (!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("MyApp.corpNavig.view.upload", this);
					this.getView().addDependent(this._oPopover);
				}

				var oButton = oEvent.getSource();
				jQuery.sap.delayedCall(0, this, function() {
					this._oPopover.openBy(oButton);
				});

			},
			onHome: function() {
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

		function setFinancialData(bUnit, months, year, state, tab) {
			var view;
			if (state == true) {
				view = "YTD";
			} else {
				view = "monthly";
			}

			if (tab == "") {
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

					switch (tab.substr(tab.length - 4, tab.length)) {
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

		function b64toBlob(b64Data, contentType, sliceSize) {
			function convertDataURIToBinaryBuffer(dataURI) {
				var BASE64_MARKER = ';base64,';
				var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
				var base64 = dataURI.substring(base64Index);
				var buf = Buffer.from(base64, 'base64');
				return buf;
			}
			debugger;
			contentType = contentType || '';
			sliceSize = sliceSize || 512;
			// var arr = convertDataURIToBinaryBuffer(b64Data);
			
			var blob = new Blob([b64Data], { type: 'image/png' });
			return blob;

			
		}
	});