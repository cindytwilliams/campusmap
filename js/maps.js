var bldgsList = [
  {"latlng":[36.362368, -86.497277],name:"Ramer Admin Building", main : 1},
  {"latlng":[36.363101, -86.498032],name:"Wood Campus Center", main : 1},
  {"latlng":[36.362379, -86.498191],name:"Caudill Hall", main : 1},
  {"latlng":[36.363281, -86.496656],name:"Warf Building", main : 1},
  {"latlng":[36.364172, -86.496445],name:"Pickel Field House", main : 1},
  {"latlng":[36.364063, -86.497516],name:"Thigpen Library", main : 1},
  {"latlng":[36.363675, -86.498420],name:"Steinhauer-Rogan-Black (SRB) Humanities", main : 1},
  {"latlng":[36.364376, -86.499008],name:"Mattox Building", main : 1},
  {"latlng":[36.364923, -86.498108],name:"Wallace Health Science Building - South", main : 1},
  {"latlng":[36.365203, -86.497649],name:"Wallace Health Science Building - North", main : 1},
  {"latlng":[36.365381, -86.494232],name:"Gibson Hall", main : 1},
  {"latlng":[36.364438, -86.493947],name:"100 Building", main : 1},
  {"latlng":[36.364860, -86.493911],name:"200 Building", main : 1},
  {"latlng":[36.364795, -86.493252],name:"300 Building", main : 1},
  {"latlng":[36.365369, -86.493621],name:"400 Building", main : 1}
];

//Create a infoWindow for all markers
var infoWnd = new google.maps.InfoWindow();

//To control markers' visibility by radio buttons.
var markerController = new google.maps.MVCObject();

//Initialization
function initialize() {
  //Create a map
  var mapDiv = document.getElementById("map_canvas");
  mapCanvas = new google.maps.Map(mapDiv);
  mapCanvas.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  
  //selectChanged function will be involved when a radio button is clicked.
  var i, choice = [ 
    document.getElementById("main")
  ];
  for (i = 0; i < choice.length; i++) {
    google.maps.event.addDomListener(choice[i], "click", selectChanged);
  }
  

  //Putting markers onto the map
  var bounds = new google.maps.LatLngBounds();
  var campus, latlng;
  
  for ( i = 0; i < bldgsList.length; i++) {
    campus = bldgsList[i];
    latlng = new google.maps.LatLng(campus.latlng[0], campus.latlng[1]);
    bounds.extend(latlng);
    var marker = createMarker({
      map : mapCanvas,
      position : latlng,
      others : campus
    });

    //Create side-bar buttons
    createMarkerButton(marker);
  }
  //Fits the viewport to the bounds.
  mapCanvas.fitBounds(bounds);
  
  
  //Sets the initial selected value
  markerController.set("select", "main");
  google.maps.event.trigger(choice[0], "click");
}

//This function will be involved when a radio button is clicked.
//select_changed events will be fired for every markers when the markerController's property is updated.
function selectChanged() {
  var selectedVal = this.value;
  markerController.set("select", selectedVal);
  
  //Changes visibilities for each <ul>.
  var i, ul, listNames = ["main"];
  for (i = 0; i < listNames.length; i++) {
    ul = document.getElementById(listNames[i] + "_list");
    if (listNames[i] === selectedVal) {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  }
}

//Create a marker.
function createMarker(params) {
  var marker = new google.maps.Marker(params);

  //When the marker is clicked, the infoWindow is displayed.
  google.maps.event.addListener(marker, "click", function() {
    infoWnd.setContent("<strong>" + params.others.name + "</strong>");
    infoWnd.open(params.map, marker);
  });

  // Binds the select properties between marker and markerController.
  // If markerController.select is changed, then marker.select would be changed, and
  // a select_changed event is fired.
  marker.bindTo("select", markerController, "select");
  google.maps.event.addListener(marker, "select_changed", changeMarkerVisibility);
  return marker;
}

//If markerController.select is changed, 
//then check the each value of params.others,
//and change the visibility of the marker.
function changeMarkerVisibility() {
  //"this" means "marker".
  var marker = this;
  var others = marker.get("others");
  
  //The selected value of radio buttons
  var selectedVal = marker.get("select");
  
  //Determine the marker's visibility.
  marker.setVisible( others[selectedVal] ? true : false );
}

//Create buttons each <ul>s.
function createMarkerButton(marker) {
  var others = marker.get("others"),
      i, name, ul, li,
      listNames = ["main"];
      
  
  // Only creates a button when the propery is 1
  for (i = 0; i < listNames.length; i++) {
    name = listNames[i];
    if (others[ name ]) {
      ul = document.getElementById( name + "_list" );
      li = document.createElement("li");
      li.innerHTML = others.name;
      ul.appendChild(li);
      
      //If the button is clicked, then the marker would be clicked.
      google.maps.event.addDomListener(li, "click", function() {
        google.maps.event.trigger(marker, "click");
      });
    }
  }
  
}

google.maps.event.addDomListener(window, "load", initialize);