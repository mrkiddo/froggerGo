/**
 * Created by luojiawei on 16/11/14.
 */
var baseUrl = "https://frogger.dominknow.com/default.asp";

var getBaseUrl = function () {
    return baseUrl;
};

var getSavedBaseUrl = function () {
    chrome.storage.sync.get('frogger-base-url', function (item) {
        if(item['frogger-base-url']) {
            baseUrl = item['frogger-base-url'];
        }
    });
};

var updateBaseUrl = function (newUrl) {
    baseUrl = newUrl;
};

var init = function () {
    getSavedBaseUrl();

    var contextMenuClickHandler = function (e) {
        var caseNumber = "",
            url = "";
        chrome.tabs.query({active: true}, function (tabs) {
            chrome.tabs.sendRequest(tabs[0].id, { method: "getSelectedText"}, function (response) {
                if(!response) {
                    return false;
                }
                caseNumber = response.data;
                if(caseNumber) {
                    url = baseUrl + "?" + encodeURI(caseNumber);
                }
                else {
                    url = baseUrl;
                }
                chrome.tabs.create({url: url});
            });
        });
        return false;
    };

    chrome.contextMenus.create({
        "title": "frogger Go: Go to case with this #",
        "contexts": ["selection"],
        "onclick" : contextMenuClickHandler
    });
};

init();