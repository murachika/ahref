// デフォルト設定
if ( !localStorage["ahref-hyperlink"] ){
    localStorage["ahref-hyperlink"]        = "off";
    localStorage["ahref-threshold"]        = "15";
    localStorage["ahref-clipboard"]        = "off";
    localStorage["ahref-listwindow"]       = "off";
    localStorage["ahref-keyboardshortcut"] = "off";
    localStorage["ahref-ctrlshiftalt"]     = "000";
    localStorage["ahref-shortcutkey"]      = "off";
}

function ahrefStart(info, tab){

    // URLがchromeから始まるページと、Chromeウェブストアは除外
    if ( !tab.url.search(/^chrome/) ) {
        // search は文頭からマッチすると 0（偽）を返す。無かったら -1（真）
        alert(chrome.i18n.getMessage("extAlertChrome"));
        return 0;
    }

    if (selectedText) {
//        console.log("Selected Text = " + selectedText);

        ahrefopen(selectedText);
    } else {
        
        if ( localStorage["ahref-clipboard"] == "on" ) {
            var clipboardBuffer = document.getElementById('clipboard-buffer');
            clipboardBuffer.select();
            clipboardBuffer.focus();
            document.execCommand('paste');

//            console.log("Clip Board Buffer Value");
//            console.log(clipboardBuffer.value);
            
            clipboard = 1;
            ahrefopen(clipboardBuffer.value);
        }
    }
}

function fix(url) {
    url = encodeURI(url);
    url = url.replace(/\b/ig, '');
    url = url.replace(/\s/ig, '');
    url = url.replace(/%0D/ig, '');
    url = url.replace(/%0A/ig, '');
    url = url.replace(/%20/ig, '');
    url = url.replace(/%E3%80%80/ig, '');
    return url;
}

function zen2han(url) {
    zenURIencode = '%EF%BC%81%E2%80%9D%EF%BC%83%EF%BC%84%EF%BC%85%EF%BC%86%E2%80%99%EF%BC%88%EF%BC%89%EF%BC%8A%EF%BC%8B%EF%BC%8C%E2%88%92%EF%BC%8E%E2%80%95%EF%BC%8F%E2%80%90%EF%BC%BE%EF%BC%90%EF%BC%91%EF%BC%92%EF%BC%93%EF%BC%94%EF%BC%95%EF%BC%96%EF%BC%97%EF%BC%98%EF%BC%99%EF%BC%9A%EF%BC%9B%EF%BC%9C%EF%BC%9D%EF%BC%9E%EF%BC%9F%EF%BC%A0%EF%BC%A1%EF%BC%A2%EF%BC%A3%EF%BC%A4%EF%BC%A5%EF%BC%A6%EF%BC%A7%EF%BC%A8%EF%BC%A9%EF%BC%AA%EF%BC%AB%EF%BC%AC%EF%BC%AD%EF%BC%AE%EF%BC%AF%EF%BC%B0%EF%BC%B1%EF%BC%B2%EF%BC%B3%EF%BC%B4%EF%BC%B5%EF%BC%B6%EF%BC%B7%EF%BC%B8%EF%BC%B9%EF%BC%BA%EF%BC%BB%EF%BF%A5%EF%BC%BD%EF%BC%BE%EF%BC%BF%E2%80%98%EF%BD%81%EF%BD%82%EF%BD%83%EF%BD%84%EF%BD%85%EF%BD%86%EF%BD%87%EF%BD%88%EF%BD%89%EF%BD%8A%EF%BD%8B%EF%BD%8C%EF%BD%8D%EF%BD%8E%EF%BD%8F%EF%BD%90%EF%BD%91%EF%BD%92%EF%BD%93%EF%BD%94%EF%BD%95%EF%BD%96%EF%BD%97%EF%BD%98%EF%BD%99%EF%BD%9A%EF%BD%9B%EF%BD%9C%EF%BD%9D%E3%80%9C%EF%BD%9E';
    zen = decodeURI(zenURIencode);
    han = '!"#$%&\'()*+,-.-/-^0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~~';
    str = '';
    for (i=0; i<url.length; i++) {
        c = url.charAt(i);
        n = zen.indexOf(c,0);
        if (n >= 0) c = han.charAt(n);
        str += c;
    }
    url = str
    return url;
}

function opentab(url){
    if ( popupfromwindow ) {
        chrome.tabs.create({"windowId":popupfromwindow.id, "url":url, "selected":false });
    } else {
        chrome.tabs.create({"url":url, "selected":false });
    }
}

function ahrefopen(url) {
    urllist = [];
    
    // ctrl オプション発動（キーボードショートカットからの実行時以外）
    if (ctrlchk == "on" && executecount == 0){
        url = fix(url);
        url = zen2han(url);
        if ( (url.match(/^http/i)) || (url.match(/^ftp:/i)) ) {
                ;
        } else if ( url.match(/^ttp/i) ) {
            url = 'h' + url;
        } else if ( url.match(/^tp/i) ) {
            url = 'ht' + url;
        } else if ( url.match(/^www/i) ) {
            url = 'http://' + url;
        } else {
            url = 'http://' + url;
        }
        urllist[0] = url;
    } else {
        url = zen2han(url);
        urllist = url.match(/((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\!\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10}\/[\!\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*[=]+[\u3005\u3007\u303B\u3040-\u309F\u30A0-\u30FF\u3200-\u9FFF\uFF00-\uFF9F]*[\!\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*)|((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\!\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10}[\!\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*)/ig);
    }

    var n = 0;
    var openedURL = [];
    var URLtoOpen = [];
    if (urllist != null) {
        do {
//            console.log("Collected URL = " + urllist[n]);
            if ( urllist[n].match(/^http|^ftp:/i) ) {
                ;
            } else if ( urllist[n].match(/^ftp\./i) ) {
                urllist[n] = 'ftp://' + urllist[n];
            } else if ( urllist[n].match(/^ttp/i) ) {
                urllist[n] = 'h' + urllist[n];
            } else if ( urllist[n].match(/^tp/i) ) {
                urllist[n] = 'ht' + urllist[n];
            } else if ( urllist[n].match(/^www/i) ) {
                urllist[n] = 'http://' + urllist[n];
            } else {
                urllist[n] = '';
            }
            
            if ( (urllist[n].match(/http\/\//i)) ) {
                urllist[n] = urllist[n].replace(/http/i, 'http:');
            }
            if ( (urllist[n].match(/:\/[^\/]/i)) ) {
                urllist[n] = urllist[n].replace(/:\//i, '://');
            }
            if ((shiftchk == "on" && executecount == 0) || (shiftchk == "on" && ctrlchk == "on" && executecount == 0)) {
                urllist[n] = urllist[n].replace(/:\/\//i, '://ime.nu/');
            }
            
            // 既に開いたURLじゃなければ開く
            if ( openedURL.indexOf(urllist[n]) < 0 ){
//                chrome.tabs.create({"url":urllist[n], "selected":false });
                URLtoOpen.push(urllist[n]);
                openedURL.push(urllist[n]);
                // ハイパーリンクも開く場合、同時に ime.nu も開いた事にする（2ch対策）
                if ( localStorage["ahref-hyperlink"] == "on" ) {
                    openedURL.push(urllist[n].replace(/:\/\//i, '://ime.nu/'));
                }
            }
            
            n++;
        } while (n < urllist.length);
        urllist = URLtoOpen;

        if ( (localStorage["ahref-listwindow"] == "on" && clipboard == 1) || localStorage["ahref-threshold"] < urllist.length ) {
            chrome.windows.getLastFocused(null, function (currentwindow){
                var popup_width  = Math.round(currentwindow.width * 0.5);
                var popup_height = Math.round(currentwindow.height * 0.75);
                popupfromwindow  = currentwindow;
                chrome.windows.create({url:'background/popup.html', width:popup_width, height:popup_height, type:'popup'});
            });
        } else {
            for ( var i=0; i<urllist.length; i++ ) {
                opentab(urllist[i]);
            }
        }

    } else {
        alert (chrome.i18n.getMessage("extAlertMessage"));
    }
    ctrlchk  = "off";
    shiftchk = "off";
    altchk   = "off";
    shortcutkey = "off";
    ctrlshiftalt  = "000";
    executecount = 0;
    clipboard = 0;
    popupfromwindow = "";
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if ( request.type == "keyevent" ) {

            if ( request.ctrlkey ) {
                ctrlchk   = request.ctrlkey;
                if ( ctrlchk == "on" && localStorage["ahref-ctrlshiftalt"].charAt(0) == "1" ) {
                    ctrlshiftalt = ctrlshiftalt.replace(/^\d(\d)(\d)$/, "1$1$2");
                } else {
                    ctrlshiftalt = ctrlshiftalt.replace(/^\d(\d)(\d)$/, "0$1$2");
                }
            }
            if ( request.shiftkey ) {
                shiftchk  = request.shiftkey;
                if ( shiftchk == "on" && localStorage["ahref-ctrlshiftalt"].charAt(1) == "1" ) {
                    ctrlshiftalt = ctrlshiftalt.replace(/^(\d)\d(\d)$/, "$11$2");
                } else {
                    ctrlshiftalt = ctrlshiftalt.replace(/^(\d)\d(\d)$/, "$10$2");
                }
            }
            if ( request.altkey ) {
                altchk   = request.altkey;
                if ( altchk == "on" && localStorage["ahref-ctrlshiftalt"].charAt(2) == "1" ) {
                    ctrlshiftalt = ctrlshiftalt.replace(/^(\d)(\d)\d$/, "$1$21");
                } else {
                    ctrlshiftalt = ctrlshiftalt.replace(/^(\d)(\d)\d$/, "$1$20");
                }
            }

            if ( request.shortcutkey ) {
                shortcutkey  = request.shortcutkey;
            }

            if ( localStorage["ahref-keyboardshortcut"] == "on" ) {
                if ( localStorage["ahref-ctrlshiftalt"] == ctrlshiftalt && shortcutkey == "on" && executecount == 0) {
                    executecount = 1;
                    ahrefStart("", {url : "dummy"});
                }
                if ( (localStorage["ahref-ctrlshiftalt"] != ctrlshiftalt || shortcutkey == "off") && executecount == 1 ) {
                    executecount = 0;
                }
            }

        } else if ( request.type == "selection" ) {
            selectedText = request.selectedtext;

        } else if ( request.type == "openurl" ) {
//            console.log("Selected URL = " + request.url);
            opentab(request.url);

        } else if ( request == "loadSettings" ) {
            sendResponse( {
                "ahref-hyperlink"        : localStorage["ahref-hyperlink"],
                "ahref-threshold"        : localStorage["ahref-threshold"],
                "ahref-clipboard"        : localStorage["ahref-clipboard"],
                "ahref-listwindow"       : localStorage["ahref-listwindow"],
                "ahref-keyboardshortcut" : localStorage["ahref-keyboardshortcut"],
                "ahref-ctrlshiftalt"     : localStorage["ahref-ctrlshiftalt"],
                "ahref-shortcutkey"      : localStorage["ahref-shortcutkey"]
            } );
        } else if ( request == "backgroundReload" ){
            if ( localStorage["ahref-clipboard"] == "on" ) {
                context  = "all";
            } else {
                context  = "selection";
            }
            chrome.contextMenus.update(id, {"contexts":[context]}) 
        } else if ( request == "getURLs" ) {
            sendResponse( urllist );
        }
    }
);

// 違うタブを選択した時、あるいは新しいタブを開いた時
chrome.tabs.onActivated.addListener(
    function() {
        // 拡張機能ページ、オプションページ以外（URLがchromeから始まるページは除外）
        chrome.tabs.query({active: true, currentWindow: true, status: "complete" },
            function(current) {
                // search は文頭からマッチすると 0（偽）を返す。無かったら -1（真）
                if ( typeof(current[0]) != 'undefined' && current[0].url.search(/^chrome/) && current[0].url.search(/^https:\/\/chrome\.google\.com\//) ) {
                    chrome.tabs.executeScript(null, {file: "content/ahrefSettings.js"});
                }
            }
        );
    }
);

var urllist  = new Array();
var ctrlchk  = "off";
var shiftchk = "off";
var altchk   = "off";
var shortcutkey = "off";
var ctrlshiftalt  = "000";
var executecount = 0;
var clipboard = 0;
var popupfromwindow = "";
var selectedText = "";
if ( localStorage["ahref-clipboard"] == "on" ) {
    context  = "all";
} else {
    context  = "selection";
}
var id       = chrome.contextMenus.create({"title": chrome.i18n.getMessage("extName"), "contexts":[context], "onclick": ahrefStart});
