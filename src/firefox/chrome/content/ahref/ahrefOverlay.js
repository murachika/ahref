var ctrlchk = 0;
var shiftchk = 0;

function ahrefstart() {

	var contextMenu = document.getElementById("contentAreaContextMenu");
	contextMenu.addEventListener("popupshowing", function(event) {gContextMenu.showItem("ahref-menuitem", gContextMenu.isContentSelected);}, false);

		function keychkdown(event){
			if (event.keyCode == 17) {
				ctrlchk = 1;
			}
			if (event.keyCode == 16) {
				shiftchk = 1;
			}
		}
		function keychkup(event){
			if (event.keyCode == 17) {
				ctrlchk = 0;
			}
			if (event.keyCode == 16) {
				shiftchk = 0;
			}
		}

		window.addEventListener('keydown', keychkdown , true);
		window.addEventListener('keyup', keychkup , true);

}

window.addEventListener("load" , ahrefstart , true);

function fix(url) {
	url = url.replace(/\n/ig, '');
	url = url.replace(/\b/ig, '');
	url = url.replace(/ /ig, '');
	url = url.replace(/　/ig, '');
	return url;
}

function zen2han(url) {
	zen = '！”＃＄％＆’（）＊＋，－．―／‐＾０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￥］＾＿‘ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～';
	han = '!"#$%&\'()*+,-.-/-^0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
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

function ahrefopen(url) {

		var focusedWindow = document.commandDispatcher.focusedWindow;
		var url = focusedWindow.getSelection().toString();
		list = new Array();

	if (ctrlchk == 1){
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
		list[0] = url;
	} else {
		url = zen2han(url);
		list = url.match(/((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\'\-\/\?\&\+\=\:\@\%\;\#\*\^]{5,}[=]+[！ぁ-んァ-ー一-龠ｦ-ﾟ]+[\w\.\,\~\'\-\/\?\&\+\=\:\@\%\;\#\*\^]*)|((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\'\-\/\?\&\+\=\:\@\%\;\#\*\^]{5,})/ig);
	}

	var n = 0;
	if (list != null) {
		do {
			if ( list[n].match(/^http|^ftp:/i) ) {
				;
			} else if ( list[n].match(/^ftp\./i) ) {
				list[n] = 'ftp://' + list[n];
			} else if ( list[n].match(/^ttp/i) ) {
				list[n] = 'h' + list[n];
			} else if ( list[n].match(/^tp/i) ) {
				list[n] = 'ht' + list[n];
			} else if ( list[n].match(/^www/i) ) {
				list[n] = 'http://' + list[n];
			} else {
				list[n] = '';
			}
		if ( (list[n].match(/http\/\//i)) ) {
			list[n] = list[n].replace(/http/i, 'http:');
		}
		if ( (list[n].match(/:\/[^\/]/i)) ) {
			list[n] = list[n].replace(/:\//i, '://');
		}
		if (shiftchk == 1 || (shiftchk == 1 && ctrlchk == 1)) {
			list[n] = list[n].replace(/:\/\//i, '://ime.nu/');
		}
		gBrowser.addTab(list[n]);
		n++
		} while (n < list.length);
	} else {
		alert ('No URLs Found.');
	}

	ctrlchk = 0;
	shiftchk = 0;

}
