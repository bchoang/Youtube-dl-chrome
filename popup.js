document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('butt');

    var xmlhttp = new XMLHttpRequest();
    // onClick's logic below:
    link.addEventListener('click', function(e) {
        e.preventDefault();

        var url = "";

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
            var url = tabs[0].url;
            url = encodeURIComponent(url);

            var filepath = document.getElementById("filepath").value;
            filepath = encodeURIComponent(filepath);

            document.getElementById("status").innerHTML = "DOWNLOADING";
        
            xmlhttp.open("GET","https://localhost:6299/?destination=" + filepath + "&quality=1080p&filter&format=audio+only&title&link=" + url,true);
        
            xmlhttp.onload = function() {
                if (xmlhttp.readyState === 4) {
                    console.log(xmlhttp.responseText);
                } else {
                    console.error(xmlhttp.statusText);
                }
            }

            xmlhttp.send();

        });
    });
});
