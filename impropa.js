var settings = {
	server_hostname: "asdasd.be",
	server_port: 3000,
	server_protocol: "http",
	context_menu_title: "Send it awaaaaay (impropa)"
};

function getMeSomeExtensionYo(filename) {
	var found = filename.match(/(\.[a-zA-Z]{1,4})$/i);
	
	if (found == null) {
		found = filename.match(/(\.[a-zA-Z]{1,4})\?/i);
	}

	if (found.length > 1) {
		return found[1];
	}

	return "";
}

function clickityOnThemMenuItems(info, tab) {

	var image_url = info.srcUrl;
	var extension = getMeSomeExtensionYo(image_url);
	var new_filename = prompt("New filename", extension);
	if (new_filename != null) {
	    var secret_handshake = prompt("secret handshake. Shh.");
	    sendAllTheThings(image_url, new_filename, secret_handshake);
	}
}

function sendAllTheThings(image_url, new_filename, secret_handshake) {

	var endpoint = settings.server_protocol + '://' + settings.server_hostname + ":" + settings.server_port + "/set-impropa/";
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		if (req.readyState != 4) {
			return;
		}
		if (req.status != 200) {
			return;
		}
		
		alert(req.responseText);
	}

	req.open("POST", endpoint, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send("image_url=" + encodeURIComponent(image_url) + "&new_filename=" + encodeURIComponent(new_filename) + "&secret_handshake=" + encodeURIComponent(secret_handshake));
}

var contexts = ["image"];
for (var c = 0; c < contexts.length; c++) {
	var context = contexts[c];
	var title = settings.context_menu_title;
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": clickityOnThemMenuItems});
}