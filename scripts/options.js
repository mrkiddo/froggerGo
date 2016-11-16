/**
 * Created by luojiawei on 16/11/15.
 */
var saveBtnHandler = function (e) {
    var el = e.data.el;
    var text = $(el).val();
    if(text) {
        chrome.storage.sync.set({
            'frogger-base-url': text
        }, function () {
            chrome.runtime.getBackgroundPage(function (backgroundPage) {
                backgroundPage.updateBaseUrl(text);
            });
        });
    }
    return false;
};

$(document).ready(function () {

    var deferred = $.Deferred();

    $(".container").on('click', '#save-settings', {el: $('#base-url')}, saveBtnHandler);

    chrome.runtime.getBackgroundPage(function (backgroundPage) {
        var baseUrl = backgroundPage.getBaseUrl();
        deferred.resolve(baseUrl);
    });

    deferred.then(function (data) {
        $("#base-url").text(data);
    });
});