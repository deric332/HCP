sap.ui.define([
    "sap/ui/core/UIComponent"
    ],function(UIComponent) {
    "use strict";
    return UIComponent.extend("MyApp.corpNavig.Component",{
      metadata : {
          manifest: "json"
      },
      init: function() {
          // call the supper class method before redefining
          UIComponent.prototype.init.apply(this,arguments);
      }
      
    });
    });