function loadMap() {
  // Initialize Google Maps
  const mapOptions = {
    center:new google.maps.LatLng(28.644800, 77.216921),
    zoom: 10
  }
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Load JSON Data
  //const pointMarkers = gethit();

}  // Initialize Google Markers

$(window).on( "load", readyFn );

function readyFn(){

  loadMap();
  gethit();
}


function gethit(){
  var city ="";
    $.ajax({
        url: "<enter location>",
        type:'POST',
        crossDomain:true,
        cache: false,
        data:{mode:"getFosLocation",city:city} , 
        dataType: "json",
        
        success: function(result){

result = getJSONMarkers();

$.each(result, function() {
point = this;
    console.log(point['lati'])
    console.log(typeof(point))
    let marker = new google.maps.Marker({
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  strokeColor: "Black",
                  strokeWeight: 4,
                  strokeOpacity: 0.8,
                  scale: 10
                },
                setMap: map,
                position: new google.maps.LatLng(parseFloat(point["lati"]), parseFloat(point["longi"])),
                //title: point.name
              
            });
            var infowindow = new google.maps.InfoWindow({
                  content: infocontent
                });
            
            var infocontent='<h3>'+point["user_name"]+'</h3>';

            marker.addListener('click', function() {
                  infowindow.open(map, marker);
                });    
});
return;
         
        },
        error: function (xhr, textStatus, errorThrown){
         
          console.log('Error in Operation');
        }          

           
    });
  }

function getJSONMarkers(){

  const markers = [
    {
        "id": "11",
        "user_name": "pk",
        "agent_name": "Vikas",
        "city": "Delhi",
        "agent_id": "11",
        "lati": "28.644800",
        "longi": "77.216921",
        "date": "2017-11-27 17:06:05",
        "active_pickup": "112"
    },
    {
        "id": "15",
        "user_name": "pd",
        "agent_name": "Pradeep",
        "city": "Delhi",
        "agent_id": "15",
        "lati": "28.5774016",
        "longi": "77.2784707",
        "date": "2017-11-27 16:06:05",
        "active_pickup": "105"
    },
    {
        "id": "16",
        "user_name": "ab",
        "agent_name": "Insar Khan",
        "city": "Delhi",
        "agent_id": null,
        "lati": null,
        "longi": null,
        "date": null,
        "active_pickup": null
    },
    {
        "id": "17",
        "user_name": "kc",
        "agent_name": "umesh",
        "city": "Delhi",
        "agent_id": "17",
        "lati": "28.5724515",
        "longi": "77.2276972",
        "date": "2017-11-27 17:06:05",
        "active_pickup": null
    }
];
  return markers;
}
