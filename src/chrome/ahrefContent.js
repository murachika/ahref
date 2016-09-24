
function mouseclick(event){
	if (event.button == 2) {
		if ( event.ctrlKey && event.shiftKey ) {
			chrome.extension.sendRequest("ctrlshiftkey");
		} else if ( event.ctrlKey ){
			chrome.extension.sendRequest("ctrlkey");
		} else if ( event.shiftKey ){
			chrome.extension.sendRequest("shiftkey");
		}
	}
}

document.addEventListener('mousedown', mouseclick , true);
