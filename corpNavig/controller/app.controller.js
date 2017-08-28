sap.ui.define([
   "sap/ui/core/mvc/Controller"], function(Controller) {
      " use strict";
      return Controller.extend("MyApp.corpNavig.controller.app", {
           onLogin : function() { 
                alert("My Button worked");
               
           } 
          
      });
   });