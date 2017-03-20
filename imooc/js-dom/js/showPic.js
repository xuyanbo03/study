function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return false;
    }
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        if (whichpic.getAttribute("title")) {
            var text = whichpic.getAttribute("title");
        } else {
            var text = "";
        }
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

// function countBodyChildren() {
//     var body_element = document.getElementsByName("body")[0];
//     alert(body_element.childNodes.length);
// }
// window.onload = countBodyChildren;

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementsById) return false;
    if (!document.getElementsById("imagegallery")) return false;
    var gallery = document.getElementsById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function {
            return showPic(this) ? false : true;
        }
        links[i].onkeypress = links[i].onclick;
    }
}
