/**
 * Created by luojiawei on 16/11/14.
 */
var openNewCaseTab = function (caseNumber) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        var baseUrl = backgroundPage.getBaseUrl();
        var url = baseUrl + '?' + encodeURI(caseNumber);
        chrome.tabs.create({url: url});
    });
};

var inputKeyDownHandler = function (e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        return false;
    }
};

var inputKeyUpHandler = function (e) {
    var keyCode = e.which || e.keyCode;
    var text = $(this).val();
    if(keyCode == 13 && text) {
        openNewCaseTab(text);
    }
    return false;
};

var submitButtonClick = function (e) {
    var el = e.data.el;
    var text = el.val();
    if(text) {
        openNewCaseTab(text);
    }
    return false;
};

$(document).ready(function () {
    $('.container')
        .on('keypress', 'input#case-number', inputKeyDownHandler)
        .on('keyup', 'input#case-number', inputKeyUpHandler)
        .on('click', 'button#case-submit', {el: $('input#case-number')}, submitButtonClick);
});