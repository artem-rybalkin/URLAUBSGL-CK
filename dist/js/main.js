// ////////////masonry
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  fitWidth: true,
  percentPosition: true
});

var zapros = 'cat' ;


function request( zapros ){
    
  var url = 'https://pixabay.com/api/?key=3531240-ec0d55581e7ceac4acc8e28c0&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q='+zapros;
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
    var zapros = document.getElementById('field_search').value;
    request( zapros );
   
    document.getElementById('field_search').value = "";

}

document.getElementById("form-inline").onsubmit=
 function() {
  search();
  return false;
 }

function createImages( data ) {
    var items = $('.grid-item');
    var text = document.querySelectorAll(".text");
    $('.grid-item').each(function(i){
      this.style.background = 'url('+data.hits[i].previewURL+')  center no-repeat';
      this.style.backgroundSize = 'cover';
    });
//     for ( var i = 0; i < 7; i++ ) {
//         items[i].css( {'background-image': 'url('+data.hits[i].previewURL+')'} );
// //         text[i].innerHTML = data.images[i].word;
//     }
}

request(zapros);


var $page = $('html, body');
  $('a[href*="#"]').click(function() { //при нажатии на ссылку с #
      $page.animate({
          scrollTop: $($.attr(this, 'href')).offset().top // идёт плавная прокрутка
      }, 400);
      return false;
  });