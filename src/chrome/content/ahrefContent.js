function keyDown(event){
    if ( event.ctrlKey ){
        chrome.extension.sendRequest( {
            "type"    : "keyevent",
            "ctrlkey" : "on"
        } );
    }
    if ( event.shiftKey ){
        chrome.extension.sendRequest( {
            "type"     : "keyevent",
            "shiftkey" : "on"
        } );
    }
    if ( event.altKey ){
        chrome.extension.sendRequest( {
            "type"    : "keyevent",
            "altkey"  : "on"
        } );
    }
    if ( event.keyCode == ahrefSettings.ahref_shortcutkey.charCodeAt(0) ){
        chrome.extension.sendRequest( {
            "type"        : "keyevent",
            "shortcutkey" : "on"
        } );
    }
    updateSelectedTexts();
}
document.addEventListener('keydown', keyDown , true);

function KeyUp(event){
    if ( event.keyCode == 16 ){
        chrome.extension.sendRequest( {
            "type"     : "keyevent",
            "shiftkey" : "off"
        } );
    }
    if ( event.keyCode == 17 ){
        chrome.extension.sendRequest( {
            "type"    : "keyevent",
            "ctrlkey" : "off"
        } );
    }
    if ( event.keyCode == 18 ){
        chrome.extension.sendRequest( {
            "type"    : "keyevent",
            "altkey"  : "off"
        } );
    }
    if ( event.keyCode == ahrefSettings.ahref_shortcutkey.charCodeAt(0) ){
        chrome.extension.sendRequest( {
            "type"        : "keyevent",
            "shortcutkey" : "off"
        } );
    }
    updateSelectedTexts();
}
document.addEventListener('keyup', KeyUp , true);

function updateSelectedTexts() {
    // 選択文字列を取得
    var urlText = window.getSelection().toString();

    if ( ahrefSettings.ahref_hyperlink == "on" ) {
        if (urlText) {
            // 選択文字列のHTMLを取得
            var range       = window.getSelection().getRangeAt(0);
            var rangeClone  = range.cloneContents();
            var tempDiv     = document.createElement("div");
            tempDiv.appendChild(rangeClone);
            // 選択文字列から a タグを取ってきて href 絶対パスを取得
            var getElementA = tempDiv.getElementsByTagName("a");
            for (var i = 0; i < getElementA.length; i++) {
                urlText = urlText + " " + getElementA[i].href;
            }
        }
    }

    chrome.extension.sendRequest( {
        "type"         : "selection",
        "selectedtext" : urlText
    } );
}
document.addEventListener('mouseup', updateSelectedTexts , true);

