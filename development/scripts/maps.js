// resize map depending on screen size
$( document ).ready(function() {
  $(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 60; // Calculate the top offset

    $('#map-canvas').css('height', (h - offsetTop));
  }).resize();

});

// buildings list and coordinates
var bldgsList = [
  {
    "latlng":[36.362368, -86.497277],
    name:"Ramer Administration",
    desc:"Academic Affairs, Administrative Offices, Admissions, Advising, Business Office, Cashier, Disability Services, Distributed Education, Financial Aid, Human Resources, Media Services, President's Office, Public Relations, Records & Registration, TV & Recording Studio, Veterans & Adult Learners, WVCP Radio, International Education",
    main:1,
    photo:"img/ramer.jpg"
  },
  {
    "latlng":[36.363101, -86.498032],
    name:"Wood Campus Center",
    desc:"Bookstore, Campus Police, Dining Rooms, Middle College, Plant Operations, Student Engagement & Support, Diversity & Inclusion, Student Government & Clubs, Student Services, TRIO Student Support Services Program, Vol State Grill, Information Technology (IT)",
    main:1,
    photo:"img/wood.jpg"
  },
  {
    "latlng":[36.362379, -86.498191],
    name:"Caudill Hall",
    desc:"Social Science & Education Division, Wemyss Auditorium",
    main:1,
    photo:"img/caudill.jpg"
  },
  {
    "latlng":[36.363281, -86.496656],
    name:"Warf",
    desc:"Math & Science Division, Science Labs, Testing",
    main:1,
    photo:"img/warf.jpg"
  },
  {
    "latlng":[36.364172, -86.496445],
    name:"Pickel Field House",
    desc:"Athletics, Health & Physical Education, Moore Gymnasium",
    main:1,
    photo:"img/pickel.jpg"
  },
  {
    "latlng":[36.364063, -86.497516],
    name:"Thigpen Library",
    desc:"Learning Commons, Rochelle Center, IT Help Desk",
    main:1,
    photo:"img/thigpen.jpg"
  },
  {
    "latlng":[36.363675, -86.498420],
    name:"Steinhauer-Rogan-Black (SRB) Humanities",
    desc:"Humanities Division, Recording Studio, Art Studios, Art Gallery, Music Rooms, Language Center, Honors Program",
    main:1,
    photo:"img/srb.jpg"
  },
  {
    "latlng":[36.364376, -86.499008],
    name:"Mattox",
    desc:"Business & Technology Division, Computer Labs",
    main:1,
    photo:"img/mattox.jpg"
  },
  {
    "latlng":[36.364923, -86.498108],
    name:"Wallace South",
    desc:"Diagnostic Medical Sonography, Emergency Medical Services, Medical Laboratory Technology, Ophthalmic Technology, Sleep Diagnostics",
    main:1,
    photo:"img/wallacesouth.jpg"
  },
  {
    "latlng":[36.365203, -86.497649],
    name:"Wallace North",
    desc:"Health Science Division, Chemistry Labs, Radiologic Technology Program, Respiratory Care Program",
    main:1,
    photo:"img/wallacenorth.jpg"
  },
  {
    "latlng":[36.365381, -86.494232],
    name:"Gibson Hall",
    desc:"The Foundation, TSU Nursing, TSU Education, Dual Enrollment & Off-Campus Events",
    main:1,
    photo:"img/gibson.jpg"
  },
  {
    "latlng":[36.364438, -86.493947],
    name:"100 Building",
    desc:"Physical Therapist Assistant Program",
    main:1,
    photo:"img/100.jpg"
  },
  {
    "latlng":[36.364860, -86.493911],
    name:"200 Building",
    desc:"Audio & Visual Services",
    main:1,
    photo:"img/200.jpg"
  },
  {
    "latlng":[36.364795, -86.493252],
    name:"300 Building",
    desc:"Continuing Education, Center of Emphasis, TSBDC, High School Equivalency Adult Education, Business & Industry Institute, OTIEC, Lindsey Wilson College, Trevecca Nazarene University",
    main:1,
    photo:"img/300.jpg"
  },
  {
    "latlng":[36.365369, -86.493621],
    name:"400 Building",
    desc:"Dental Assistant Program, Health Information Technology Program",
    main:1,
    photo:"img/400.jpg"
  },
  {
    "latlng":[36.366099, -86.497572],
    name:"Veterinary Technology",
    desc:"Veterinary Assistant, Veterinary Technology, Veterinary Medicine",
    main:1,
    photo:"img/vettech.jpg"
  }
];

// Create a infoWindow for all markers
var infoWnd = new google.maps.InfoWindow({ maxWidth: 375 });

// To control markers' visibility by radio buttons.
var markerController = new google.maps.MVCObject();

// Initialization
function initialize() {
  
  // Create a map
  var mapDiv = document.getElementById("map_canvas");
  var myOptions = {
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  mapCanvas = new google.maps.Map(mapDiv,myOptions);
  
  // selectChanged function will be involved when a radio button is clicked.
  var i, choice = [ 
    document.getElementById("main")
  ];
  for (i = 0; i < choice.length; i++) {
    google.maps.event.addDomListener(choice[i], "click", selectChanged);
  }
  
  // Putting markers onto the map
  var bounds = new google.maps.LatLngBounds();
  var campus, latlng;
  
  // loop through buildings
  for ( i = 0; i < bldgsList.length; i++) {
    campus = bldgsList[i];
    latlng = new google.maps.LatLng(campus.latlng[0], campus.latlng[1]);
    bounds.extend(latlng);
    var marker = createMarker({
      map : mapCanvas,
      position : latlng,
      others : campus
    });

    // Create side-bar buttons
    createMarkerButton(marker);
  }
  // Fits the viewport to the bounds.
  mapCanvas.fitBounds(bounds);
  
  
  // Sets the initial selected value
  markerController.set("select", "main");
  google.maps.event.trigger(choice[0], "click");
}

// This function will be involved when a radio button is clicked.
// select_changed events will be fired for every markers when the markerController's property is updated.
function selectChanged() {
  var selectedVal = this.value;
  markerController.set("select", selectedVal);
  
  // Changes visibilities for each <ul>.
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

// Create a marker.
function createMarker(params) {
  var marker = new google.maps.Marker(params);

  // When the marker is clicked or hovered, the infoWindow is displayed.
  google.maps.event.addListener(marker, "click", function() {
    popup(params, marker);
  });
  google.maps.event.addListener(marker, "mouseover", function() {
    popup(params, marker);
  });

  // Binds the select properties between marker and markerController.
  // If markerController.select is changed, then marker.select would be changed, and
  // a select_changed event is fired.
  marker.bindTo("select", markerController, "select");
  google.maps.event.addListener(marker, "select_changed", changeMarkerVisibility);
  return marker;
}

// Content of infoWindow
function popup(params, marker) {
  infoWnd.setContent("<div class='popup'><img src='" + params.others.photo + "'><p><strong>" + params.others.name + "</strong></p><p>" + params.others.desc + "</p></div>");
  infoWnd.open(params.map, marker);
}

// If markerController.select is changed, 
// then check the each value of params.others,
// and change the visibility of the marker.
function changeMarkerVisibility() {
  // "this" means "marker".
  var marker = this;
  var others = marker.get("others");
  
  // The selected value of radio buttons
  var selectedVal = marker.get("select");
  
  // Determine the marker's visibility.
  marker.setVisible( others[selectedVal] ? true : false );
}

// Create buttons each <ul>s.
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
      
      // If the button is clicked, then the marker would be clicked.
      google.maps.event.addDomListener(li, "click", function() {
        google.maps.event.trigger(marker, "click");
      });
    }
  }
  
}

google.maps.event.addDomListener(window, "load", initialize);