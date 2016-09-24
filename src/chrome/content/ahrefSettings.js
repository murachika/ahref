if ("undefined" == typeof(ahrefSettings)) {
    var ahrefSettings = {};
};

ahrefSettings = {

    ahref_hyperlink        : "",
    ahref_threshold        : "",
    ahref_clipboard        : "",
    ahref_listwindow       : "",
    ahref_keyboardshortcut : "",
    ahref_ctrlshiftalt     : "",
    ahref_shortcutkey      : "",

    setahrefSettings : function () {
        chrome.extension.sendRequest("loadSettings", function (response) {
            ahrefSettings.ahref_hyperlink        = response["ahref-hyperlink"];
            ahrefSettings.ahref_threshold        = response["ahref-threshold"];
            ahrefSettings.ahref_clipboard        = response["ahref-clipboard"];
            ahrefSettings.ahref_listwindow       = response["ahref-listwindow"];
            ahrefSettings.ahref_keyboardshortcut = response["ahref-keyboardshortcut"];
            ahrefSettings.ahref_ctrlshiftalt     = response["ahref-ctrlshiftalt"];
            ahrefSettings.ahref_shortcutkey      = response["ahref-shortcutkey"];
        });
    }
}

ahrefSettings.setahrefSettings();
