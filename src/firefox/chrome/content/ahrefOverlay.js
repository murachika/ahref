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
	zenURIencode = '%EF%BC%81%E2%80%9D%EF%BC%83%EF%BC%84%EF%BC%85%EF%BC%86%E2%80%99%EF%BC%88%EF%BC%89%EF%BC%8A%EF%BC%8B%EF%BC%8C%E2%88%92%EF%BC%8E%E2%80%95%EF%BC%8F%E2%80%90%EF%BC%BE%EF%BC%90%EF%BC%91%EF%BC%92%EF%BC%93%EF%BC%94%EF%BC%95%EF%BC%96%EF%BC%97%EF%BC%98%EF%BC%99%EF%BC%9A%EF%BC%9B%EF%BC%9C%EF%BC%9D%EF%BC%9E%EF%BC%9F%EF%BC%A0%EF%BC%A1%EF%BC%A2%EF%BC%A3%EF%BC%A4%EF%BC%A5%EF%BC%A6%EF%BC%A7%EF%BC%A8%EF%BC%A9%EF%BC%AA%EF%BC%AB%EF%BC%AC%EF%BC%AD%EF%BC%AE%EF%BC%AF%EF%BC%B0%EF%BC%B1%EF%BC%B2%EF%BC%B3%EF%BC%B4%EF%BC%B5%EF%BC%B6%EF%BC%B7%EF%BC%B8%EF%BC%B9%EF%BC%BA%EF%BC%BB%EF%BF%A5%EF%BC%BD%EF%BC%BE%EF%BC%BF%E2%80%98%EF%BD%81%EF%BD%82%EF%BD%83%EF%BD%84%EF%BD%85%EF%BD%86%EF%BD%87%EF%BD%88%EF%BD%89%EF%BD%8A%EF%BD%8B%EF%BD%8C%EF%BD%8D%EF%BD%8E%EF%BD%8F%EF%BD%90%EF%BD%91%EF%BD%92%EF%BD%93%EF%BD%94%EF%BD%95%EF%BD%96%EF%BD%97%EF%BD%98%EF%BD%99%EF%BD%9A%EF%BD%9B%EF%BD%9C%EF%BD%9D%E3%80%9C';
	zen = decodeURI(zenURIencode);
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
		list = url.match(/((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10}\/[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*[=]+[\u3005\u3007\u303B\u3040-\u309F\u30A0-\u30FF\u3200-\u9FFF\uFF00-\uFF9F]*[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*)|((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10})/ig);
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
