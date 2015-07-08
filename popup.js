document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
        var url = tabs[0].url;
        if (url.indexOf('youtube') > 0 && url.indexOf('watch') > 0){
            var toShow = document.getElementById('song');
            removeClass(toShow, "hidden");
            document.getElementById('songLink').value = url;

        }
        else if (url.indexOf('youtube.com') > 0 && url.indexOf('playlist') > 0){
            var toShow = document.getElementById('playlist');
            removeClass(toShow, "hidden");
            document.getElementById('playlistLink').value = url;

        }else{
            var toShow = document.getElementById('song');
            removeClass(toShow, "hidden");
        }
    });


    document.getElementById('songButton').onclick = function(){
        var toHide = document.getElementById('playlist');
        addClass(toHide, "hidden");

        var toShow = document.getElementById('song');
        removeClass(toShow, "hidden");
    };
    document.getElementById('playlistButton').onclick = function(){
        var toHide = document.getElementById('song');
        addClass(toHide, "hidden");

        var toShow = document.getElementById('playlist');
        removeClass(toShow, "hidden");
    };

    document.getElementById('songSubmit').addEventListener('click', function(e) {
        e.preventDefault();
        var info = {
            destination: "",
            quality: "",
            inputTitle: "",
            link: ""
        };

        info.link = document.getElementById('songLink').value;
        info.inputTitle = document.getElementById('songTitle').value;

        chrome.storage.sync.get({
            filepath: '',
        }, function(items) {
            info.destination = items.filepath;
            downloadVideo(info);
        });
    });

    document.getElementById('playlistSubmit').addEventListener('click', function(e) {
        e.preventDefault();
        var info = {
            destination: "",
            quality: "",
            inputTitle: "",
            link: ""
        };

        info.link = document.getElementById('songLink').value;
        info.inputTitle = document.getElementById('songTitle').value;

        chrome.storage.sync.get({
            filepath: '',
        }, function(items) {
            info.destination = items.filepath;
            downloadVideo(info);
        });

    });
});


function downloadVideo (info){
    var xmlhttp = new XMLHttpRequest();

    // turns info into a query string
    var queryString = "";
    for (var query in info){
        if (info.hasOwnProperty(query) && info[query]){
            queryString += encodeURIComponent(query) + '=' + encodeURIComponent(info[query]) + '&';
        }
    }
    queryString = queryString.substring(0, queryString.length-1); // removes fencepost "&"
    console.log(queryString);

    xmlhttp.open("GET","https://localhost:6299/?" + queryString, true);

    xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4) {
            console.log(xmlhttp.responseText);
            list.removeChild(li);
        } else {
            console.error(xmlhttp.statusText);
            list.removeChild(li);
        }
    };
    xmlhttp.send();
}

function addClass (obj, newClass){
    if (obj.className.indexOf(newClass) < 0){
        obj.className = obj.className + " " + newClass;
    }
}

function removeClass (obj, newClass){
    if (obj.className.indexOf(newClass) > 0)
        obj.className = obj.className.replace(" " + newClass, "");
}
