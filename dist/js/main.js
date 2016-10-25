// ////////////masonry
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  fitWidth: true,
  percentPosition: true
});

var zapros ;


function request( zapros ){
    
  var url = 'https://pixabay.com/api/?key=3168519-28357a1b07f864f5473734c78&q='+zapros;
//for IE8
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function( data ) {

        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            createImages(data);
//imageLoaded for masonry
            imagesLoaded( grid ).on( 'progress', function() {
                 msnry.layout();
            });
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

//search
function search() {
    var zapros = document.getElementById('field1').value;
    request( zapros );
   
    document.getElementById('field1').value = "";

}

document.getElementById("form-inline").onsubmit=
 function() {
  search();
  return false;
 }

function createImages( data ) {
    var items = document.querySelectorAll(".grid-item-img");
    var text = document.querySelectorAll(".text");

    for ( var i = 0; i < 7; i++ ) {
        items[i].setAttribute( 'src', data.images[i].imageurl );
        text[i].innerHTML = data.images[i].word;
    }
}

request(zapros);
