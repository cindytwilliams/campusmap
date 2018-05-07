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
  },
  {
    "latlng":[36.366649, -86.503639, -86.497572],
    name:"Watlington Science Field Station",
    desc:"Mechatronics",
    main:1,
    photo:"img/watlington.jpg"
  }
];


// create the map
var mymap = L.map('map_canvas').setView([36.364063, -86.497516], 18);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidnNjY3dlYm1hc3RlciIsImEiOiJjamd3Z2pveGkxc3lxMnFydG5maTMxeHo4In0.fvbc2agbtqpmge8ASFPeRg', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.satellite'
}).addTo(mymap);

var ul, li, markers = [];
ul = document.getElementById( "main_list" );

 // loop through the buildings
for ( i = 0; i < bldgsList.length; i++) {
  building = bldgsList[i];
  
  // create a marker on the map
  /*var marker = L.marker([building.latlng[0], building.latlng[1]]).addTo(mymap);
  marker.bindPopup(popupContent).openPopup();*/
  
  popupContent = "<div class='popup'><img src='" + building.photo + "'><strong>" + building.name + "</strong><p>" + building.desc + "</p></div>";
  var marker = L.marker([building.latlng[0], building.latlng[1]],{title:"marker_" + i}).addTo(mymap).bindPopup(popupContent);
  markers.push(marker);   // add to markers array
  
  // Create a sidebar link
  li = document.createElement("li");
  li.setAttribute('id', 'marker_' + i);
  li.setAttribute('tabindex', i+1);
  li.innerHTML = building.name;
  ul.appendChild(li);
}

// put keyboard focus on sidebar list
ul = document.getElementById( "main_list" );
ul.focus();

// open popup when you click or focus on a sidebar link
$("li").click(function(){
  markerFunction($(this)[0].id);
});
$("li").focus(function(){
  markerFunction($(this)[0].id);
});

// bind popup to sidebar link
function markerFunction(id){
  for (var i in markers){
      var markerID = markers[i].options.title;
      if (markerID == id){
          markers[i].openPopup();
      };
  }
}