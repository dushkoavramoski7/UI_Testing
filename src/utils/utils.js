import {utils, writeFile} from "xlsx";
import {ExportToCsv} from "export-to-csv";

export const replaceArray = function (object, oldObject, array) {
    let index = array.findIndex(x => x === oldObject);
    let firstPart = array.slice(0, index);
    let secondPart = array.slice(index + 1);
    return [...firstPart, object, ...secondPart];
};

export const addElementToArrayIfNotExist = function (object, array) {
    if(array.filter(element => element === object).length === 0) {
        array.push(object)
    }
    return array
}

export const removeElementFromArray = function (object, array) {
    if(array.filter(element => element === object).length !== 0) {
        return array.filter(item => item !== object)
    }
}

export const exportToExcel = function(fileName, data, headers, sheetName) {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headers);
    utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, sheetName);
    writeFile(wb, fileName);
}

export const exportToCSV = function (fileName, data, headers) {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        useTextFile: false,
        useBom: true,
        showLabels: true,
        filename: fileName,
        headers: headers
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
}

export const reloadPageTwice = function (reloadCount) {
    if(reloadCount < 2) {
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
    } else {
        sessionStorage.removeItem('reloadCount');
    }
}

export const loadJS = function () {
    //every js that begins/contains '$(document).ready' needs to be added here
    const script = document.createElement('script');
    script.src = 'js/plugins/slimscroll/draggableScript.js';
    script.async = true;
    document.body.appendChild(script);

    const script1 = document.createElement('script');
    script1.src = 'js/inspinia.js';
    script1.async = true;
    document.body.appendChild(script1);
}