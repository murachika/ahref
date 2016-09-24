document.getElementById("all-check").addEventListener("click", allcheck);
function allcheck() {
    var input_obj = document.getElementsByTagName("input");
    for(var i=0; i<input_obj.length; i++){
        if ( input_obj[i].id != "img-check" ) {
            input_obj[i].checked = document.getElementById("all-check").checked;
        }
    }
}
document.getElementById("img-check").addEventListener("click", imgcheck);
function imgcheck() {
    var input_obj = document.getElementsByTagName("input");
    for(var i=0; i<input_obj.length; i++){
        var url = input_obj[i].value;
        if ( url.match(/\.(jpg|jpeg|bmp|png|gif|jpe|ico)$/i) ) {
            input_obj[i].checked = document.getElementById("img-check").checked;
        } else if ( input_obj[i].id != "img-check" ) {
            input_obj[i].checked = false;
        }
    }
}

document.getElementById("ahref_openurl").addEventListener("click", openurl);
function openurl() {
    var input_obj = document.getElementsByTagName("input");
    for(var i=0; i<input_obj.length; i++){
        if ( input_obj[i].checked && input_obj[i].name == "ahref-urlwindow-checkbox" ) {
//            console.log("URL = " + input_obj[i].value);
            chrome.extension.sendRequest({ type : 'openurl', url : input_obj[i].value });
        }
    }
    chrome.windows.getLastFocused(null, function (currentwindow){
        chrome.windows.remove(currentwindow.id);
    });
}

document.getElementById("ahref_cancel").addEventListener("click", cancel);
function cancel() {
    chrome.windows.getLastFocused(null, function (currentwindow){
        chrome.windows.remove(currentwindow.id);
    });
}

chrome.extension.sendRequest("getURLs", function (urllist) {
    var n = 0;
    do {
        var element = document.createElement('div');
        element.setAttribute('class', 'urllist');
        element.innerHTML = '<input type="checkbox" name="ahref-urlwindow-checkbox" value="' + urllist[n] + '" checked> ' + urllist[n];
        if ( urllist[n].match(/\.(jpg|jpeg|bmp|png|gif|jpe|ico)$/i) ) {
            element.innerHTML += '<br>　　　<a href="' + urllist[n] + '"><img src="' + urllist[n] + '" width="75" class="thumbnail"></a>'
        }
        document.getElementById("ahref_urllist").appendChild(element);
        
        n++;
    } while (n < urllist.length);
});

window.addEventListener("load", set_i18n_text);
function set_i18n_text() {
    document.getElementById("popupPagedesc").innerHTML     = chrome.i18n.getMessage("popupPagedesc");
    document.getElementById("popupPagecheckimg").innerHTML = chrome.i18n.getMessage("popupPagecheckimg");
    document.getElementById("popupPagecheckall").innerHTML = chrome.i18n.getMessage("popupPagecheckall");
    document.getElementById("ahref_openurl").innerHTML     = chrome.i18n.getMessage("ahref_openurl");
    document.getElementById("ahref_cancel").innerHTML      = chrome.i18n.getMessage("ahref_cancel");
}

document.getElementById("ahref_urllist").addEventListener("click", function(event) { 
    if ( event.target.src ) {
        chrome.extension.sendRequest({ type : 'openurl', url : event.target.src });
    };
    event.preventDefault();
} ,true);
