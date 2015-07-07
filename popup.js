document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('butt');

    // onClick's logic below:
    link.addEventListener('click', function(e) {
        e.preventDefault();

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {

            var info = {
                destination: "",
                quality: "",
                inputTitle: "",
                link: ""
            };

            var url = tabs[0].url;
            info.link = encodeURIComponent(url);

            if (document.getElementById("filename").value != "*Leave blank for video title") {
                info.inputTitle = "=" + encodeURIComponent(document.getElementById("filename").value);
            }

            chrome.storage.sync.get({
                filepath: '',
            }, function(items) {
                console.log(items.filepath);
                info.destination = encodeURIComponent(items.filepath);

                downloadVideo(info);
            });
        });
    });
});

function downloadVideo (info){
    var xmlhttp = new XMLHttpRequest();

    // turns info into a query string
    var queryString = "";
    for (var query in info){
        if (info.hasOwnProperty(query) && info[query]){
            queryString += query + '=' + info[query] + '&';
        }
    }
    queryString = queryString.substring(0, queryString.length-1); // removes fencepost "&"
    console.log(queryString);

    xmlhttp.open("GET","https://localhost:6299/?" + queryString, true);

    xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4) {
            console.log(xmlhttp.responseText);
        } else {
            console.error(xmlhttp.statusText);
        }
    };
    xmlhttp.send();
}
