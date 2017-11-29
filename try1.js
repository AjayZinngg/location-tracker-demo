function readyFn(){
  gethit();
}
function gethit(){
  const mapOptions = {
    center:new google.maps.LatLng(<x>, <y>),
    zoom: 11
  }
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var city ="";
    $.ajax({
        url: "<enter_your_api_url>",
        type:'POST',
        crossDomain:true,
        cache: false,
        data:{mode:"getFosLocation",city:city},
        dataType: "json",

        success: function(result){




$.each(result, function() {
point = this;
var latarr = point["lati"]
var lonarr = point["longi"];
    console.log(latarr);
    console.log(lonarr);

    let marker = new google.maps.Marker({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          strokeColor: "Black",
          strokeWeight: 4,
          strokeOpacity: 0.8,
          scale: 4
        },
        map: map,
        position: new google.maps.LatLng(parseFloat(latarr), parseFloat(lonarr)),
        title: point["user_name"]

    })

            var infowindow = new google.maps.InfoWindow({
                  content: infocontent
                });

            var infocontent='<h3>'+point["user_name"]+'</h3>';

            marker.addListener('click', function() {
                  infowindow.open(map, marker);
                });
});

return ;

        },
        error: function (xhr, textStatus, errorThrown){

          console.log('Error in Operation');
        }


    });
  }
