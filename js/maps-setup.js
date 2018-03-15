// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(43.662607, -79.395784); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1>Legend</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 13,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.TERRAIN // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(43.655119, -79.377052),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "- St. Michael’s Cathedral Basilica",
              window_content: "<h5> St. Michael’s Cathedral Basilica</h1><p>Catholic, with 110 ratings</p>"
             },
             {position: new google.maps.LatLng(43.651273, -79.374370),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map
              title: "- The Cathedral Church of St. James",
              window_content: "<h5> The Cathedral Church of St. James</h1><p>Anglican, with 71 ratings <a href='http://something'>this would</a> </p>"
             },
             {position: new google.maps.LatLng(43.657482, -79.393621),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map
              title: "- Holy Trinity Russian Orthodox Church",
              window_content: "<h5> Holy Trinity Russian Orthodox Church </h1><p>Russian Orthodox, with 50 ratings <a href='http://something'>this would</a> </p>"
             },
             {position: new google.maps.LatLng(43.655038, -79.391414),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map
              title: "- St. Patrick’s Catholic Church",
              window_content: "<h5> St. Patrick’s Catholic Church  </h1><p>Catholic, with 45 ratings </p>"
             },
             {position: new google.maps.LatLng(43.68939, -79.417419),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "- Russian Orthodox Christ the Saviour Cathedral",
              window_content: "<h5> Russian Orthodox Christ the Saviour Cathedral </h1><p>Russian Orthodox, with 38 ratings </p>"
             },
             {position: new google.maps.LatLng(43.666541, -79.388981),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "- St. Basil’s Catholic Parish at the University of St. Michael’s College",
              window_content: "<h5> St. Basil’s Catholic Parish at the University of St. Michael’s College </h1><p>Catholic, with 35 ratings </p>"
             },
             {position: new google.maps.LatLng(43.646964, -79.384366),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "- St. Andrew’s Church",
              window_content: "<h5> St. Andrew’s Church </h1><p>Presbyterian, with 34 ratings </p>"
             },
             {position: new google.maps.LatLng(43.668832, -79.375514),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "- Our Lady of Lourdes ",
              window_content: "<h5> Our Lady of Lourdes </h1><p>Catholic, with 31 ratings </p>"
             },
            {position: new google.maps.LatLng(43.654133, -79.376655),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "- Metropolitan United Church",
             window_content: "<h5> Metropolitan United Church </h1><p>United, with 30 ratings</p>"
           }
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.title + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var romeCircle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    // in general, we always have to *set the map* when we
    // add features.
    map: my_map,
    bounds: {
      north: 42.685,
      south: 40.671,
      east: 12.501,
      west: 12.485
    },

    center: {"lat": 41.9000, "lng":12.5000},
    radius: 1000
  });
  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
