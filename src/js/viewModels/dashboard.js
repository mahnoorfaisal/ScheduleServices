define([
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojarraydataprovider",
  "text!../chartData.json",
  "text!../barData.json",
  "text!../custData.json",
  "ojs/ojtable",
  "ojs/ojpagingcontrol",
  "ojs/ojselectcombobox",
  "ojs/ojcheckboxset",
  "ojs/ojknockout",
  "ojs/ojmessages",
  "ojs/ojbutton",
  "ojs/ojdialog",
  "ojs/ojchart",
  "ojs/ojformlayout",
  "oj-c/input-text",
], function (
  require,
  exports,
  ko,
  ojbootstrap_1,
  ArrayDataProvider,
  chartData,
  barData,
  custData
) {
  function DashboardViewModel() {
    var self = this;

    //1st
    self.serviceName = ko.observable("ANALYTICS");
    self.serviceDate = ko.observable("2023-12-07 00:00:00:00");
    self.serviceDescription = ko.observable("Analysis in Company 13");
    self.serviceCustomer = ko.observable("Jon Doe");
    self.serviceLastNote = ko.observable("Adding test note");
    self.serviceAddedBy = ko.observable("ADMIN");
    self.serviceAddedDate = ko.observable("2023-12-05 03:20:10:00");

    //2nd

    var initData = JSON.parse(chartData);
    self.dashboard2Array = ko.observableArray([]);
    self.dashboard2Array(initData);
    self.dataProvider = new ArrayDataProvider(self.dashboard2Array, {
      keyAttributes: "id",
    });

    //3rd
    var initData2 = JSON.parse(barData);
    self.dashboard3Array = ko.observableArray([]);
    self.dashboard3Array(initData2);
    self.dataProvider3 = new ArrayDataProvider(self.dashboard3Array, {
      keyAttributes: "id",
    });

    //4th
    var initData2 = JSON.parse(custData);
    self.dashboard4Array = ko.observableArray([]);
    self.dashboard4Array(initData2);
    self.dataProvider4 = new ArrayDataProvider(self.dashboard4Array, {
      keyAttributes: "id",
    });
  }

  return DashboardViewModel;
});
