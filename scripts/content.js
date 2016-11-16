/**
 * Created by luojiawei on 16/11/14.
 */
var getSelectedText = function () {
    return window.getSelection().toString().replace(" ", "");
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "getSelectedText") {
        var text = getSelectedText();
        if(/^\d+$/.test(text)) {
            sendResponse({data: text});
        }
        else {
            sendResponse({});
        }
    }
    else {
        sendResponse({});
    }
});