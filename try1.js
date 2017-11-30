function readyFn() {
    gethit();
}
var infowindow = new google.maps.InfoWindow();
var geocoder = new google.maps.Geocoder;

function gethit() {
    const mapOptions = {
        center: new google.maps.LatLng(28.644800, 77.216921),
        zoom: 11,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    }
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var city = "";
    $.ajax({
        url: "http://devapi.stashfin.com/Fos/services",
        type: 'POST',
        crossDomain: true,
        cache: false,
        data: {mode: "getFosLocation", city: city},
        dataType: "json",

        success: function (result) {

//console.log(result);
            $.each(result, function () {
                var point = this;
                if (point["lati"] != null && point["longi"] != null) {
                    console.log("if "+point["lati"] + " - " + point["longi"]);
                    var latlng = {lat: parseFloat(point["lati"]), lng: parseFloat(point["longi"])};
                    geocoder.geocode({'location': latlng}, function (results, status) {
                        //console.log(results[0].formatted_address);
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                console.log(results[1].formatted_address);
                                map.setZoom(11);
                                //var formattedlocation = results[0].formatted_address;
                                let marker = new google.maps.Marker({
                                    icon: {
                                        path: google.maps.SymbolPath.CIRCLE,
                                        fillColor: "Blue",
                                        fillOpacity: .8,
                                        strokeColor: "Black",
                                        strokeWeight: 4,
                                        strokeOpacity: 0.8,
                                        scale: 5
                                    },
                                    map: map,
                                    position: new google.maps.LatLng(parseFloat(point["lati"]), parseFloat(point["longi"])),
                                    title: point["agent_name"]
                                })
                                let name = point["user_name"];
                                let id = point["id"];
                                let agent_name = point["agent_name"];
                                let agent_id = point["agent_id"];
                                let time_stamp = point["date"];
                                let active_pickup = point["active_pickup"];
                                let content = `
                  <h2>${agent_name}<br/></h2>
                  <h4>${agent_id}</h4>
                  <p><b>User Name</b> ${name}<br/>
                  <b> User ID</b> ${id}</br>
                  <b> Time Stamp</b> ${time_stamp}</br>
                  <b> Active Pickup</b> ${active_pickup}</br>
                  <b> Current Location</b> ${results[1].formatted_address}</p>
                  `;
                                marker.addListener('click', function () {
                                    infowindow.setContent(content);
                                    infowindow.setOptions({pixelOffset: new google.maps.Size(0, -15)});
                                    infowindow.open(map, marker);
                                });
                            } else {
                                window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                } else {
                    //show agent as offline todayc
                    //infowindow.setContent("Agent is offline");
                    console.log("else "+point["lati"] + " - " + point["longi"]);
                }
            });
            return;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}
