'Copyright (C) 2010 Murachika All rights reserved.
'http://irts.jp/

Dim FS
Dim WSHShell
Dim DesktopPath
Dim InstallPath
Dim InstallFile
Dim AppName
Dim HtmlFileName

Set FS       = CreateObject("scripting.FileSystemObject")
Set WSHShell = WScript.CreateObject("WScript.Shell")
AppName      = "A HREF++"
HtmlFileName = "\ahref.html"

DesktopPath = WSHShell.SpecialFolders("Desktop")
InstallPath = FS.GetSpecialFolder(0)

If Mid(DesktopPath,4,5) = "Users" Then
	Set regEx     = New RegExp
	regEx.Pattern = "\Desktop"
	repStr        = "\AppData\Local"
	InstallPath   = regEx.Replace(DesktopPath,repStr)
End If

InstallFile = InstallPath & HtmlFileName

Dim instMsg
instMsg=MsgBox ("If you install  " + AppName + "  click 'Yes'" + vbCr + "  or uninstall  " + AppName + "  click 'No'",vbYesNoCancel,AppName + " Setup")
If instMsg=vbYes Then
	call install
	WScript.Quit
ElseIf instMsg=vbNo Then
	call uninstall
	WScript.Quit
Else
	WScript.Quit
End If

Sub install
	If FS.FileExists(InstallFile) = True Then
		MsgBox AppName + "  is already installed.",vbInformation,AppName + " Setup"
		Exit Sub
	End If

	Dim CTF
	Set CTF = FS.CreateTextFile(InstallFile, True)
	CTF.WriteLine "<SCRIPT language='JavaScript' charset='UTF-8'>"
	CTF.WriteLine "/*"
	CTF.WriteLine "Copyright (C) 2010 murachika All rights reserved."
	CTF.WriteLine "http://irts.jp/"
	CTF.WriteLine "*/"
	CTF.WriteLine "function fix() {"
	CTF.WriteLine "	url = url.replace(/<br[\b]*>/ig, ' ');"
	CTF.WriteLine "	url = url.replace(/<[^>]*>/ig, '');"
	CTF.WriteLine "	url = url.replace(/&amp;/ig, '&');"
	CTF.WriteLine "	url = url.replace(/&lt;/ig, ' ');"
	CTF.WriteLine "	url = url.replace(/&gt;/ig, ' ');"
	CTF.WriteLine "	url = url.replace(/&quot;/ig, ' ');"
	CTF.WriteLine "}"
	CTF.WriteLine "function fix2() {"
	CTF.WriteLine "	url = encodeURI(url);"
	CTF.WriteLine "	url = url.replace(/\b/ig, '');"
	CTF.WriteLine "	url = url.replace(/\s/ig, '');"
	CTF.WriteLine "	url = url.replace(/%0D/ig, '');"
	CTF.WriteLine "	url = url.replace(/%0A/ig, '');"
	CTF.WriteLine "	url = url.replace(/%20/ig, '');"
	CTF.WriteLine "	url = url.replace(/%E3%80%80/ig, '');"
	CTF.WriteLine "	url = decodeURI(url);"
	CTF.WriteLine "}"
	CTF.WriteLine "function zen2han() {"
	CTF.WriteLine "	zenURIencode = '%EF%BC%81%E2%80%9D%EF%BC%83%EF%BC%84%EF%BC%85%EF%BC%86%E2%80%99%EF%BC%88%EF%BC%89%EF%BC%8A%EF%BC%8B%EF%BC%8C%E2%88%92%EF%BC%8E%E2%80%95%EF%BC%8F%E2%80%90%EF%BC%BE%EF%BC%90%EF%BC%91%EF%BC%92%EF%BC%93%EF%BC%94%EF%BC%95%EF%BC%96%EF%BC%97%EF%BC%98%EF%BC%99%EF%BC%9A%EF%BC%9B%EF%BC%9C%EF%BC%9D%EF%BC%9E%EF%BC%9F%EF%BC%A0%EF%BC%A1%EF%BC%A2%EF%BC%A3%EF%BC%A4%EF%BC%A5%EF%BC%A6%EF%BC%A7%EF%BC%A8%EF%BC%A9%EF%BC%AA%EF%BC%AB%EF%BC%AC%EF%BC%AD%EF%BC%AE%EF%BC%AF%EF%BC%B0%EF%BC%B1%EF%BC%B2%EF%BC%B3%EF%BC%B4%EF%BC%B5%EF%BC%B6%EF%BC%B7%EF%BC%B8%EF%BC%B9%EF%BC%BA%EF%BC%BB%EF%BF%A5%EF%BC%BD%EF%BC%BE%EF%BC%BF%E2%80%98%EF%BD%81%EF%BD%82%EF%BD%83%EF%BD%84%EF%BD%85%EF%BD%86%EF%BD%87%EF%BD%88%EF%BD%89%EF%BD%8A%EF%BD%8B%EF%BD%8C%EF%BD%8D%EF%BD%8E%EF%BD%8F%EF%BD%90%EF%BD%91%EF%BD%92%EF%BD%93%EF%BD%94%EF%BD%95%EF%BD%96%EF%BD%97%EF%BD%98%EF%BD%99%EF%BD%9A%EF%BD%9B%EF%BD%9C%EF%BD%9D%E3%80%9C%EF%BD%9E';"
	CTF.WriteLine "	zen = decodeURI(zenURIencode);"
	CTF.WriteLine "	han = '!""#$%&\'()*+,-.-/-^0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~~';"
	CTF.WriteLine "	str = '';"
	CTF.WriteLine "	for (i=0; i<url.length; i++) {"
	CTF.WriteLine "		c = url.charAt(i);"
	CTF.WriteLine "		n = zen.indexOf(c,0);"
	CTF.WriteLine "		if (n >= 0) c = han.charAt(n);"
	CTF.WriteLine "		str += c;"
	CTF.WriteLine "	}"
	CTF.WriteLine "	url = str;"
	CTF.WriteLine "}"
	CTF.WriteLine "function listing() {"
	CTF.WriteLine "	list = url.match(/((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10}\/[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*[=]+[\u3005\u3007\u303B\u3040-\u309F\u30A0-\u30FF\u3200-\u9FFF\uFF00-\uFF9F]*[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*)|((http:\/|ftp|ttp:\/|tp:\/|tps:\/|www|http\/\/)[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]{2,}\.[\w]{2,10}[\w\.\,\~\-\/\?\&\+\=\:\@\%\;\#\*\^]*)/ig);"
	CTF.WriteLine "}"
	CTF.WriteLine "function exec() {"
	CTF.WriteLine "	var n = 0;"
	CTF.WriteLine "	if (list != null) {"
	CTF.WriteLine "		do {"
	CTF.WriteLine "			if ( list[n].match(/^http|^ftp:/i) ) {"
	CTF.WriteLine "				;"
	CTF.WriteLine "			} else if ( list[n].match(/^ftp\./i) ) {"
	CTF.WriteLine "				list[n] = 'ftp://' + list[n];"
	CTF.WriteLine "			} else if ( list[n].match(/^ttp/i) ) {"
	CTF.WriteLine "				list[n] = 'h' + list[n];"
	CTF.WriteLine "			} else if ( list[n].match(/^tp/i) ) {"
	CTF.WriteLine "				list[n] = 'ht' + list[n];"
	CTF.WriteLine "			} else if ( list[n].match(/^www/i) ) {"
	CTF.WriteLine "				list[n] = 'http://' + list[n];"
	CTF.WriteLine "			} else {"
	CTF.WriteLine "				list[n] = '';"
	CTF.WriteLine "			}"
	CTF.WriteLine "		if ( (list[n].match(/http\/\//i)) ) {"
	CTF.WriteLine "			list[n] = list[n].replace(/http/i, 'http:');"
	CTF.WriteLine "		}"
	CTF.WriteLine "		if ( (list[n].match(/:\/[^\/]/i)) ) {"
	CTF.WriteLine "			list[n] = list[n].replace(/:\//i, '://');"
	CTF.WriteLine "		}"
	CTF.WriteLine "		if (external.menuArguments.window.event.shiftKey) {"
	CTF.WriteLine "			list[n] = list[n].replace(/:\/\//i, '://ime.nu/');"
	CTF.WriteLine "		}"
	CTF.WriteLine "		var w = external.menuArguments.window.open(list[n],'_blank');"
	CTF.WriteLine "		w.focus();"
	CTF.WriteLine "		n++"
	CTF.WriteLine "		} while (n < list.length);"
	CTF.WriteLine "	} else {"
	CTF.WriteLine "	alert ('No URLs Found.');"
	CTF.WriteLine "	}"
	CTF.WriteLine "}"
	CTF.WriteLine "function exet() {"
	CTF.WriteLine "		if ( (url.match(/^http/i)) || (url.match(/^ftp:/i)) ) {"
	CTF.WriteLine "			;"
	CTF.WriteLine "		} else if ( url.match(/^ttp/i) ) {"
	CTF.WriteLine "			url = 'h' + url;"
	CTF.WriteLine "		} else if ( url.match(/^tp/i) ) {"
	CTF.WriteLine "			url = 'ht' + url;"
	CTF.WriteLine "		} else if ( url.match(/^www/i) ) {"
	CTF.WriteLine "			url = 'http://' + url;"
	CTF.WriteLine "		} else {"
	CTF.WriteLine "			url = 'http://' + url;"
	CTF.WriteLine "		}"
	CTF.WriteLine "	if ( url.match(/http\/\//i) ) {"
	CTF.WriteLine "		url = url.replace(/http/i, 'http:');"
	CTF.WriteLine "	}"
	CTF.WriteLine "	if ( url.match(/:\/[^\/]/i) ) {"
	CTF.WriteLine "		url = url.replace(/:\//i, '://');"
	CTF.WriteLine "	}"
	CTF.WriteLine "	if (external.menuArguments.window.event.shiftKey) {"
	CTF.WriteLine "		url = url.replace(/:\/\//i, '://ime.nu/');"
	CTF.WriteLine "	}"
	CTF.WriteLine "	var wt = external.menuArguments.window.open(url,'_blank');"
	CTF.WriteLine "	wt.focus();"
	CTF.WriteLine "}"
	CTF.WriteLine "if (external.menuArguments.window.event.ctrlKey) {"
	CTF.WriteLine "		var url = external.menuArguments.document.selection.createRange().text;"
	CTF.WriteLine "		fix2();"
	CTF.WriteLine "		zen2han();"
	CTF.WriteLine "		exet();"
	CTF.WriteLine "	} else {"
	CTF.WriteLine "		var url = external.menuArguments.document.selection.createRange().htmlText;"
	CTF.WriteLine "		var list = '';"
	CTF.WriteLine "		fix();"
	CTF.WriteLine "		zen2han();"
	CTF.WriteLine "		listing();"
	CTF.WriteLine "		exec();"
	CTF.WriteLine "}"
	CTF.WriteLine "</SCRIPT>"
	CTF.Close

	WSHShell.RegWrite "HKCU\Software\Microsoft\Internet Explorer\MenuExt\" + AppName + "\", InstallFile, "REG_SZ"
	WSHShell.RegWrite "HKCU\Software\Microsoft\Internet Explorer\MenuExt\" + AppName + "\contexts", "52", "REG_DWORD"
	
	MsgBox AppName + "  install completed successfully." + vbCr + "Please restart your Internet Explorer.",vbInformation,AppName + " Setup"
	Exit Sub
End Sub

Sub uninstall
	If FS.FileExists(InstallFile) = False Then
		MsgBox AppName + "  is not yet installed.",vbInformation,AppName + " Setup"
		Exit Sub
	Else
		If FS.FileExists(InstallFile) = True Then
			FS.DeleteFile InstallFile
		End If
		
		WSHShell.RegDelete "HKCU\Software\Microsoft\Internet Explorer\MenuExt\" + AppName + "\"
		
		MsgBox AppName + "  uninstall completed successfully.",vbInformation,AppName + " Setup"
	End If
End Sub
