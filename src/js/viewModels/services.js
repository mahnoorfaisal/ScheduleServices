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
  "ojs/ojarraydataprovider",
  "text!../servicesData.json",
  "ojs/ojtable",
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
  serviceData
) {
  function ServicesViewModel() {
    var self = this;
    var initData = JSON.parse(serviceData);
    this.serviceArray = ko.observableArray([]);
    this.serviceArray(initData);
    this.serviceName = ko.observable();
    this.serviceDesc = ko.observable();
    this.selectedIndex = ko.observable();
    this.serviceNameUpdate = ko.observable();
    this.serviceDescUpdate = ko.observable();
    this.messagesDataprovider = ko.observableArray([]);

    this.dataprovider = new ArrayDataProvider(this.serviceArray, {
      keyAttributes: "serviceName",
      implicitSort: [{ attribute: "serviceName", direction: "ascending" }],
    });

    this.selectedChangedListener = (event) => {
      const row = event.detail.value.row;

      if (row.values().size > 0) {
        row.values().forEach(function (key) {
          var selectedRow = self
            .serviceArray()
            .find((k) => k.serviceName == key);
          var selectedIndex = self
            .serviceArray()
            .findIndex((k) => k.serviceName == key);

          self.selectedIndex(selectedIndex);
          self.serviceNameUpdate(key);
          self.serviceDescUpdate(selectedRow.serviceDescription);
        });
      }
    };

    this.save = function () {
      if (self.serviceName() == "" || self.serviceDesc() == "") {
        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail: "Please enter service name and description",
          autoTimeout: 4000,
        });
      } else {
        document.getElementById("modalDialog1").close();
        var data = {
          serviceName: self.serviceName(),
          serviceDescription: self.serviceDesc(),
        };

        initData.push(data);

        self.serviceArray(initData);

        self.messagesDataprovider.push({
          severity: "confirmation",
          summary: "New Service",
          detail: "New service added successfully!",
          autoTimeout: 4000,
        });
      }
    };

    this.saveDelete = function () {
      document.getElementById("modalDialog3").close();

      initData.splice(self.selectedIndex(), 1);

      self.serviceArray(initData);

      self.messagesDataprovider.push({
        severity: "confirmation",
        summary: "Delete Service",
        detail: "Service deleted successfully!",
        autoTimeout: 4000,
      });
    };

    this.saveUpdate = function () {
      if (
        self.serviceNameUpdate() == undefined ||
        self.serviceDescUpdate() == undefined
      ) {
        self.messagesDataprovider.push({
          severity: "error",
          summary: "Error",
          detail: "Please enter service name and description",
          autoTimeout: 4000,
        });
      } else {
        document.getElementById("modalDialog2").close();
        var data = {
          serviceName: self.serviceNameUpdate(),
          serviceDescription: self.serviceDescUpdate(),
        };

        initData[self.selectedIndex()].serviceName = self.serviceNameUpdate();
        initData[self.selectedIndex()].serviceDescription =
          self.serviceDescUpdate();

        self.serviceArray(initData);

        self.messagesDataprovider.push({
          severity: "confirmation",
          summary: "Update Service",
          detail: "Service updated successfully!",
          autoTimeout: 4000,
        });
      }
    };

    this.cancel = function () {
      document.getElementById("modalDialog1").close();
    };

    this.cancelUpdate = function () {
      document.getElementById("modalDialog2").close();
    };

    this.cancelDelete = function () {
      document.getElementById("modalDialog3").close();
    };
    this.open = function () {
      self.serviceName("");
      self.serviceDesc("");
      document.getElementById("modalDialog1").open();
    };

    this.openUpdate = function () {
      self.serviceName("");
      self.serviceDesc("");
      document.getElementById("modalDialog2").open();
    };

    this.openDelete = function () {
      self.serviceName("");
      self.serviceDesc("");
      document.getElementById("modalDialog3").open();
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return ServicesViewModel;
});
