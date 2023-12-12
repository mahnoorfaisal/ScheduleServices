define([
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojarraydataprovider",
  "ojs/ojlistdataproviderview",
  "text!../customerData.json",
  "ojs/ojdataprovider",
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
  ListDataProviderView,
  serviceData,
  ojdataprovider_1
) {
  function CustomersViewModel() {
    var self = this;
    var initData = JSON.parse(serviceData);
    this.customersArray = ko.observableArray([]);
    this.customersArray(initData);
    this.filter = ko.observable();

    this.dataprovider = ko.computed(function () {
      let filterCriterion = null;
      if (this.filter() && this.filter() != "") {
        filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
          filterDef: { text: this.filter() },
        });
      }
      const arrayDataProvider = new ArrayDataProvider(self.customersArray, {
        keyAttributes: "CustomerId",
      });
      return new ListDataProviderView(arrayDataProvider, {
        filterCriterion: filterCriterion,
      });
    }, this);
    this.handleValueChanged = () => {
      this.filter(document.getElementById("filter").rawValue);
    };

    this.highlightingCellRenderer = (context) => {
      let field = null;
      if (context.columnIndex === 0) {
        field = "CustomerId";
      } else if (context.columnIndex === 1) {
        field = "CustomerName";
      } else if (context.columnIndex === 2) {
        field = "CustomerEmail";
      } else if (context.columnIndex === 3) {
        field = "CustomerAddress";
      } else if (context.columnIndex === 4) {
        field = "CustomerDescription";
      } else if (context.columnIndex === 5) {
        field = "CustomerPhone";
      } else if (context.columnIndex === 6) {
        field = "CustomerWebsite";
      }
      let data = context.row[field].toString();
      const filterString = this.filter();
      let textNode;
      let spanNode = document.createElement("span");
      if (filterString && filterString.length > 0) {
        const index = data.toLowerCase().indexOf(filterString.toLowerCase());
        if (index > -1) {
          const highlightedSegment = data.substr(index, filterString.length);
          if (index !== 0) {
            textNode = document.createTextNode(data.substr(0, index));
            spanNode.appendChild(textNode);
          }
          let bold = document.createElement("b");
          textNode = document.createTextNode(highlightedSegment);
          bold.appendChild(textNode);
          spanNode.appendChild(bold);
          if (index + filterString.length !== data.length) {
            textNode = document.createTextNode(
              data.substr(index + filterString.length, data.length - 1)
            );
            spanNode.appendChild(textNode);
          }
        } else {
          textNode = document.createTextNode(data);
          spanNode.appendChild(textNode);
        }
      } else {
        textNode = document.createTextNode(data);
        spanNode.appendChild(textNode);
      }
      context.parentElement.appendChild(spanNode);
    };

    this.columnArray = [
      {
        headerText: "Customer Id",
        renderer: this.highlightingCellRenderer,
        id: "CustomerId",
      },
      {
        headerText: "Name",
        renderer: this.highlightingCellRenderer,
        id: "CustomerName",
      },
      {
        headerText: "Email",
        renderer: this.highlightingCellRenderer,
        id: "CustomerEmail",
      },
      {
        headerText: "Address",
        renderer: this.highlightingCellRenderer,
        id: "CustomerAddress",
      },
      {
        headerText: "Description",
        renderer: this.highlightingCellRenderer,
        id: "CustomerDescription",
      },
      {
        headerText: "Phone",
        renderer: this.highlightingCellRenderer,
        id: "CustomerPhone",
      },
      {
        headerText: "Website",
        renderer: this.highlightingCellRenderer,
        id: "CustomerWebsite",
      },
    ];
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return CustomersViewModel;
});
