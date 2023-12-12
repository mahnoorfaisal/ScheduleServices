/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define([
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
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
], function (
  require,
  exports,
  ko,
  ojbootstrap_1,
  ArrayDataProvider,
  PagingDataProviderView,
  serviceData
) {
  function UsersViewModel() {
    var self = this;
    var initData = JSON.parse(serviceData);
    this.usersArray = ko.observableArray([]);
    this.usersArray(initData);
    this.userName = ko.observable();
    this.userDisplay = ko.observable();
    this.userType = ko.observable("USER");
    this.userActive = ko.observable();
    this.messagesDataprovider = ko.observableArray([]);

    this.pagingDataProvider = new PagingDataProviderView(
      new ArrayDataProvider(this.usersArray, {
        keyAttributes: "userName",
        implicitSort: [{ attribute: "userName", direction: "ascending" }],
      })
    );

    this.save = function () {
      if (
        self.userName() == "" ||
        self.userDisplay() == "" ||
        self.userType() == "" ||
        self.userActive() == ""
      ) {
        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail:
            "Please enter user name , display name , user type and activation status",
          autoTimeout: 4000,
        });
      } else {
        document.getElementById("modalDialog1").close();
        var data = {
          userName: self.userName(),
          displayName: self.userDisplay(),
          userType: self.userType(),
          userActive: self.userActive(),
        };

        console.log("Data" + JSON.stringify(data));

        initData.push(data);
        console.log("Data" + JSON.stringify(initData));

        self.usersArray(initData);

        self.messagesDataprovider.push({
          severity: "confirmation",
          summary: "New Service",
          detail: "New service added successfully!",
          autoTimeout: 4000,
        });
      }
    };

    this.cancel = function () {
      document.getElementById("modalDialog1").close();
    };

    this.open = function () {
      self.userActive("");
      self.userDisplay("");
      self.userDisplay("");
      self.userName("");
      document.getElementById("modalDialog1").open();
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return UsersViewModel;
});
