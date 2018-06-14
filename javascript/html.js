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
        if(images[i]["isVideo"]) {
            wrap.innerHTML +=
                '<div class="scrollingImageContainer">' +
                '   <iframe class="scrollingImage" width="1398" height="596" src="' + images[i]["url"] + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
                '   <button id="location" onclick=" window.open(`' + images[i]["alt-url"] + '`);return false;">' + images[i]["location"] + '</button>' +
                '   <br><br><br><br><br><br>' +
                '</div>';
        } else {
            wrap.innerHTML +=
                '<div class="scrollingImageContainer">' +
                '   <img class="scrollingImage" src=' + images[i]["url"] + ' onclick=" window.open(`' + images[i]["url"] + '`);return false;" >' +
                '   <button id="location" onclick=" window.open(`' + images[i]["alt-url"] + '`);return false;">' + images[i]["location"] + '</button>' +
                '   <br><br><br><br><br><br>' +
                '</div>';
        }
        i++;
    } else {
        getMoreImages();
    }
}

function yHandler(){
    const contentHeight = wrap.offsetHeight;
    const yOffset = window.pageYOffset;
    const y = yOffset + window.innerHeight;
    if(y >= contentHeight){
        addNextImage();
    }
}

window.onscroll = yHandler;
setInterval(yHandler, 200);