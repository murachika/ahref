// EventListener
window.addEventListener("load", restore_options);
document.getElementById("savebutton").addEventListener("click", save_options);
document.getElementById("defaultsettings").addEventListener("click", restore_default);

document.getElementById("clipboard").addEventListener("click", clipboard);
function clipboard() {
    if ( document.getElementById("clipboard").checked ) {
        document.getElementById("listwindow").disabled = false;
        document.getElementById("span-listwindow").className = "on";
        document.getElementById("span-listwindow-text").className = "on";
    } else {
        document.getElementById("listwindow").disabled = true;
        document.getElementById("span-listwindow").className = "off";
        document.getElementById("span-listwindow-text").className = "off";
    }
}
document.getElementById("keyboardshortcut").addEventListener("click", keyboardshortcut);
function keyboardshortcut() {
    if ( document.getElementById("keyboardshortcut").checked ) {
        document.getElementById("alt").disabled = false;
        document.getElementById("ctrl").disabled = false;
        document.getElementById("shift").disabled = false;
        document.getElementById("shortcutkey").disabled = false;
        document.getElementById("ahrefAlt").src = "../img/Alt.png";
        document.getElementById("ahrefCtrl").src = "../img/Ctrl.png";
        document.getElementById("ahrefShift").src = "../img/Shift.png";
        document.getElementById("shortcutkey").className = "on";
    } else {
        document.getElementById("alt").disabled = true;
        document.getElementById("ctrl").disabled = true;
        document.getElementById("shift").disabled = true;
        document.getElementById("shortcutkey").disabled = true;
        document.getElementById("ahrefAlt").src = "../img/AltOff.png";
        document.getElementById("ahrefCtrl").src = "../img/CtrlOff.png";
        document.getElementById("ahrefShift").src = "../img/ShiftOff.png";
        document.getElementById("shortcutkey").className = "off";
    }
}

// Saves options to localStorage.
function save_options() {
    if ( document.getElementById("hyperlink").checked ) {
        localStorage["ahref-hyperlink"] = "on";
    } else {
        localStorage["ahref-hyperlink"] = "off";
    }
    
    if (document.getElementById("threshold").value && document.getElementById("threshold").value >= 0 && document.getElementById("threshold").value <= 100) {
        localStorage["ahref-threshold"] = document.getElementById("threshold").value;
    } else if ( document.getElementById("threshold").value < 0 ) {
        localStorage["ahref-threshold"] = 0;
    } else if ( document.getElementById("threshold").value > 100 ) {
        localStorage["ahref-threshold"] = 100;
    } else {
        localStorage["ahref-threshold"] = 15;
    }
    
    if ( document.getElementById("clipboard").checked ) {
        localStorage["ahref-clipboard"] = "on";
    } else {
        localStorage["ahref-clipboard"] = "off";
    }
    
    if ( document.getElementById("listwindow").checked ) {
        localStorage["ahref-listwindow"] = "on";
    } else {
        localStorage["ahref-listwindow"] = "off";
    }
    
    if ( document.getElementById("keyboardshortcut").checked ) {
        localStorage["ahref-keyboardshortcut"] = "on";
    } else {
        localStorage["ahref-keyboardshortcut"] = "off";
    }
    
    if ( document.getElementById("ctrl").checked ) {
        localStorage["ahref-ctrlshiftalt"] = "1";
    } else {
        localStorage["ahref-ctrlshiftalt"] = "0";
    }
    if ( document.getElementById("shift").checked ) {
        localStorage["ahref-ctrlshiftalt"] = localStorage["ahref-ctrlshiftalt"] + "1";
    } else {
        localStorage["ahref-ctrlshiftalt"] = localStorage["ahref-ctrlshiftalt"] + "0";
    }
    if ( document.getElementById("alt").checked ) {
        localStorage["ahref-ctrlshiftalt"] = localStorage["ahref-ctrlshiftalt"] + "1";
    } else {
        localStorage["ahref-ctrlshiftalt"] = localStorage["ahref-ctrlshiftalt"] + "0";
    }
    
    if ( document.getElementById("shortcutkey") ) {
        localStorage["ahref-shortcutkey"] = document.getElementById("shortcutkey").options[document.getElementById("shortcutkey").selectedIndex].value;
    } else {
        localStorage["ahref-shortcutkey"] = "";
    }
    
    if ( document.getElementById("keyboardshortcut").checked && localStorage["ahref-ctrlshiftalt"] === "000" ) {
        alert(chrome.i18n.getMessage("optionPageKeyboardAlert"));
        return;
    }
    chrome.extension.sendRequest("backgroundReload");
    alert(chrome.i18n.getMessage("savebuttonalert"));
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    set_i18n_text();
    
    if (localStorage["ahref-hyperlink"] == "on") {
        document.getElementById("hyperlink").checked = true;
    } else {
        document.getElementById("hyperlink").checked = false;
    }

    if (localStorage["ahref-threshold"]) {
        document.getElementById("threshold").value = localStorage["ahref-threshold"];
    } else {
        document.getElementById("threshold").value = 15;
    }

    if (localStorage["ahref-clipboard"] == "on") {
        document.getElementById("clipboard").checked = true;
    } else {
        document.getElementById("clipboard").checked = false;
    }

    if (localStorage["ahref-listwindow"] == "on") {
        document.getElementById("listwindow").checked = true;
    } else {
        document.getElementById("listwindow").checked = false;
    }

    if (localStorage["ahref-keyboardshortcut"] == "on") {
        document.getElementById("keyboardshortcut").checked = true;
    } else {
        document.getElementById("keyboardshortcut").checked = false;
    }

    if (localStorage["ahref-ctrlshiftalt"].charAt(0) == "1") {
        document.getElementById("ctrl").checked = true;
    } else {
        document.getElementById("ctrl").checked = false;
    }
    if (localStorage["ahref-ctrlshiftalt"].charAt(1) == "1") {
        document.getElementById("shift").checked = true;
    } else {
        document.getElementById("shift").checked = false;
    }
    if (localStorage["ahref-ctrlshiftalt"].charAt(2) == "1") {
        document.getElementById("alt").checked = true;
    } else {
        document.getElementById("alt").checked = false;
    }

    if (localStorage["ahref-shortcutkey"]) {
        for ( i = 0; i < document.getElementById("shortcutkey").length; i++ ) {
            if( document.getElementById("shortcutkey").options[i].value == localStorage["ahref-shortcutkey"]){
                document.getElementById("shortcutkey")[i].selected = true;
                break;
            }
        }
    } else {
        document.getElementById("shortcutkey").value = "A";
    }

    clipboard();
    keyboardshortcut();
}

function restore_default(){
    localStorage["ahref-hyperlink"]        = "off";
    localStorage["ahref-threshold"]        = "15";
    localStorage["ahref-clipboard"]        = "off";
    localStorage["ahref-listwindow"]       = "off";
    localStorage["ahref-keyboardshortcut"] = "off";
    localStorage["ahref-ctrlshiftalt"]     = "000";
    localStorage["ahref-shortcutkey"]      = "off";
    restore_options();
    chrome.extension.sendRequest("backgroundReload");
    alert(chrome.i18n.getMessage("defaultsettingsalert"));
}

function set_i18n_text() {
    document.getElementById("optionPageH1").innerHTML              = chrome.i18n.getMessage("optionPageH1");
    document.getElementById("optionPageH2hyperlink").innerHTML     = chrome.i18n.getMessage("optionPageH2hyperlink");
    document.getElementById("optionPageHyperlinkDesc").innerHTML   = chrome.i18n.getMessage("optionPageHyperlinkDesc");
    document.getElementById("optionPageH2listwindow").innerHTML    = chrome.i18n.getMessage("optionPageH2listwindow");
    document.getElementById("optionPageListwindowDesc1").innerHTML = chrome.i18n.getMessage("optionPageListwindowDesc1");
    document.getElementById("optionPageListwindowDesc2").innerHTML = chrome.i18n.getMessage("optionPageListwindowDesc2");
    document.getElementById("optionPageListwindowDesc3").innerHTML = chrome.i18n.getMessage("optionPageListwindowDesc3");
    document.getElementById("optionPageListwindowDesc4").innerHTML = chrome.i18n.getMessage("optionPageListwindowDesc4");
    document.getElementById("optionPageH2clipboard").innerHTML     = chrome.i18n.getMessage("optionPageH2clipboard");
    document.getElementById("optionPageClipboardDesc1").innerHTML  = chrome.i18n.getMessage("optionPageClipboardDesc1");
    document.getElementById("optionPageClipboardDesc2").innerHTML  = chrome.i18n.getMessage("optionPageClipboardDesc2");
    document.getElementById("optionPageClipboardDesc3").innerHTML  = chrome.i18n.getMessage("optionPageClipboardDesc3");
    document.getElementById("optionPageclipboardDesc4").innerHTML  = chrome.i18n.getMessage("optionPageclipboardDesc4");
    document.getElementById("optionPageH2keyboard").innerHTML      = chrome.i18n.getMessage("optionPageH2keyboard");
    document.getElementById("optionPageKeyboardDesc1").innerHTML   = chrome.i18n.getMessage("optionPageKeyboardDesc1");
    document.getElementById("optionPageKeyboardDesc2").innerHTML   = chrome.i18n.getMessage("optionPageKeyboardDesc2");
    document.getElementById("savebutton").innerHTML                = chrome.i18n.getMessage("savebutton");
    document.getElementById("defaultsettings").innerHTML           = chrome.i18n.getMessage("defaultsettings");
    document.getElementById("optionPageExtName").innerHTML         = chrome.i18n.getMessage("extName");
}
