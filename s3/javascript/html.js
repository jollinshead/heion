var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

const wrap = document.getElementById('wrap');
const client = new HttpClient();
var images;
var i = 0;

function getMoreImages(){
    client.get('static-db/images.json', function(response) {
        images = JSON.parse(response)["images"];
        i = 0;
    });
}
getMoreImages();

// return if another image is available
function addNextImage(){
    if(i < images.length - 1) {
        wrap.innerHTML +=
            '<div class="scrollingImageContainer">' +
            '   <img class="scrollingImage" src=' + images[i]["url"] + ' onclick=" window.open(`' + images[i]["url"] + '`);return false;" >' +
            '   <button id="location" onclick=" window.open(`' + images[i]["alt-url"] + '`);return false;">' + images[i]["location"] + '</button>' +
            '   <br><br><br><br>' +
            '</div>';
        i++;
    } return i < images.length - 1;
}

function init() {
    var diff = wrap.offsetHeight - window.innerHeight;
    yHandler();
    diff -= wrap.offsetHeight - window.innerHeight;
    for(var ii = 0; ii < (wrap.offsetHeight - window.innerHeight) / diff; ++ii) {
        yHandler();
    }
}

function yHandler(){
    const contentHeight = wrap.offsetHeight;
    const yOffset = window.pageYOffset;
    const y = yOffset + window.innerHeight;
    if(y >= contentHeight){
        addNextImage();

        if(i >= images.length - 1) {
            getMoreImages();
        }
    }
}
window.onload = init;
window.onscroll = yHandler;