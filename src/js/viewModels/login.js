/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

define([
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "appController",
  "ojs/ojarraydataprovider",
  "ojs/ojpagingdataproviderview",
  "text!../userData.json",
  "ojs/ojtable",
  "ojs/ojpagingcontrol",
  "ojs/ojselectcombobox",
  "ojs/ojcheckboxset",
  "ojs/ojknockout",
  "ojs/ojmessages",
  "ojs/ojbutton",
  "ojs/ojdialog",
  "oj-c/input-text",
], function (require, exports, ko, ojbootstrap_1, app) {
  function LoginViewModel() {
    var self = this;
    self.username = ko.observable();
    self.password = ko.observable();
    this.messagesDataprovider = ko.observableArray([]);

    this.login = function () {
      if (self.username() && self.password()) {
        app.goToPage("dashboard");
        app.isConnected(true);
      } else {
        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail: "Please enter username and password",
          autoTimeout: 4000,
        });
      }
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return LoginViewModel;
});
