export const setText = () =>
  (window.setText = function setText(selector, text) {
    document.querySelector(selector).innerHTML = text;
  });

export const setLastButtonDisabled = () =>
  (window.setLastButtonDisabled = function setLastButtonDisabled(disabled) {
    document.querySelector("#btLast").disabled = disabled;
  });

export const setRowData = () =>
  (window.setRowData = function setRowData(rowData) {
    allOfTheData = rowData;
    createNewDatasource();
  });
