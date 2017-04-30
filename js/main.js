function createMap(){
    // initialize the map
    var map = L.map('map').setView([39, -96], 4);

    // basemap layers
    var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map),
    streets= L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });



    // create blank geojson layers for all pest data
    var bebb =  L.geoJson();
    var bc =  L.geoJson();
    var eab =  L.geoJson();
    var gm =  L.geoJson();
    var hwa =  L.geoJson();
    var jb =  L.geoJson();
    var wpbr =  L.geoJson();
    
    // create blank geojson layers for all tree data
    var butternut =  L.geoJson();
    var elms =  L.geoJson();
    var hemlocks =  L.geoJson();
    var pines =  L.geoJson();
    var whitepines =  L.geoJson();
    var ashes = L.geoJson();
    
    allLayers = {bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitepines, ashes}
   
    
    //function to call each data layer and add it to the json layers above
    getData(bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitepines, ashes);

    createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitepines, ashes);
    
    console.log(bebb);

//CREATE GROUPED LAYER CONTROL 
    //group of basemaps
    var basemaps = {
        "Grayscale": grayscale,
        "Streets": streets
    };
    
    
    var options = {
      //keep panel popped open
      collapsed:false,
    };

    
// MOVE LAYER CONTROL OUT OF MAP
    var layerControl = L.control.layers(basemaps);
    map.addControl(layerControl)
    
    
// SEARCH BAR
   //sample data values define in us-states.js
	var data = us_states;

	var featuresLayer = new L.GeoJSON(data, {
			style: function(feature) {
				return {color: feature.properties.color };
			},
			onEachFeature: function(feature, marker) {
				marker.bindPopup('<h4 style="color:'+feature.properties.color+'">'+ feature.properties.name +'</h4>');
			}
		});

	map.addLayer(featuresLayer);

	var searchControl = new L.Control.Search({
		container: 'search',
        layer: featuresLayer,
		propertyName: 'name',
		marker: false,
        collapsed: false,
        initial: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});

	searchControl.on('search:locationfound', function(e) {
		
		//console.log('search:locationfound', );

		//map.removeLayer(this._markerSearch)

		e.layer.setStyle({color: '#ebff08', opacity: 0.5});
		//if(e.layer._popup)
			//e.layer.openPopup();

	}).on('search:collapsed', function(e) {

		featuresLayer.eachLayer(function(layer) {	//restore feature color
			featuresLayer.resetStyle(layer);
		});	
	});
	
	map.addControl( searchControl );//inizialize search control

    
    //map.addControl(searchControl);

    
//RETURN
    home(map);
    zoom(map, bebb, bc, eab, gm, hwa, jb, wpbr);
    modal();
    return allLayers;
};

function home(map){
    $("#home").click(function(event) {
        event.preventDefault();
        map.setView([39, -96], 4);
    });
};

// function to zoom to the affected area
function zoom(map, bebb, bc, eab, gm, hwa, jb, wpbr){
    $("#zoom").click(function(event,latlng) {
        // grabs button selected
        var newElem = $('.selected');
        // takes only the first element
        var firstElm = newElem[0];
        //gets the id of the first element
        var id = firstElm.id;
        // if statements to test if the id is a layer
        console.log(firstElm.id);
        if (id == "bebb"){
            extent = bebb.getBounds();
        } else if (id == "bc") {
            extent = bc.getBounds();
        } else if (id == "eab") {
            extent = eab.getBounds();
        } else if (id == "gm") {
            extent = gm.getBounds();
        } else if (id == "hwa") {
            extent = hwa.getBounds();
        } else if (id == "jb") {
            extent = jb.getBounds();
        } else if (id == "wpbr") {
            extent = wpbr.getBounds();
        } else {
            // if the id is none 
            extent = map.getBounds();
        };

        var neLat = extent._northEast.lat;
        var neLng = extent._northEast.lng
        var swLat = extent._southWest.lat;
        var swLng = extent._southWest.lng
        map.fitBounds([
            [neLat,neLng], [swLat,swLng]
        ]);
    });
};

function modal(){
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("info");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        
        desc = document.getElementById("desc");
        title = document.getElementById("t");
        
        // grabs button selected
        var newElem = $('.selected');
        // takes only the first element
        var firstElm = newElem[0];
        //gets the id of the first element
        if (firstElm){
            var id = firstElm.id;
            if (id == "bebb"){
                title.innerHTML = "<h5>Pest Name: Banded Elm Bark Beetle</h5>"
                desc.innerHTML = "<li>Scientific Name: Scolytus schevyrewi</li><li>Affects: Elm Species</li><li>Native to: northern China, central Asia, and Russia</li><li>The Banded Elm Bark Beetle likely arrived on shipping pallets or containers and was first discovered in 2003 in Colorado and Utah. "
            } else if (id == "bc") {
                title.innerHTML = "<h5>Pest Common Name: Butternut Canker</h5>"
                desc.innerHTML = "<li>Scientific Name: Sirococcus clavigignenti juglandacearum</li><li>Affects: Butternut Species (severely) and other members of the Juglans genus</li><li>Native to: Asia</li><li>The Butternut Canker is depleting already sparse populations of Butternuts in the eastern US. This fungal disease affects all above-ground portions of the tree and can eventually lead to death.</li>"

            } else if (id == "eab") {
                title.innerHTML = "<h5>Pest Common Name: Emerald Ash Borer</h5>"
                desc.innerHTML = "<li>Scientific Name: Agrilus planipennis</li><li>Affects: Ash Species</li><li>Native to: Asia</li><li>The Emerald Ash Borer was discovered in North America in 2002 in Detroit. It's spread since that time has been largely aided by human activity such as the movement of nursery trees and logs for firewood.</li>" 

            } else if (id == "gm") {
                title.innerHTML = "<h5>Pest Common Name: Gypsy Moth</h5>"
                desc.innerHTML = "<li>Scientific Name: Lymantria dispar</li><li>Affects: Most Deciduous Trees and Shrubs</li><li>Native to: temperate Europe and Asia</li><li>The Gypsy Moth was introduced in the Northeastern United states in the mid-1800s. The larvae cause extreme damage to foliage by feeding on leaves. </li>"
            } else if (id == "hwa") {
                title.innerHTML = "<h5>Pest Common Name: Hemlock Woolly Adelgid</h5>"
                desc.innerHTML = "<li>Scientific Name: Adelges tsugae</li><li>Affects: Eastern and Carolina Hemlocks</li><li>Native to: Asia</li><li>The Hemlock Woolly Adelgid has caused devastation to Hemlocks in the northeastern United States. It depletes nutrients from the base of the tree's needles. Warmer winters make Hemlocks in the Southern US more likely to die from the pest.</li>"
            } else if (id == "jb") {
                title.innerHTML = "<h5>Pest Common Name: Japanese Beetle </h5>"
                desc.innerHTML = "<li>Scientific Name: Popillia japonica</li><li>Affects: Many Species of Trees, Shrubs, and Garden Crops</li><li>Native to: Japan</li><li>The Japanese Beetle is a double threat. Its larva feed on the root system of trees and plants while the adults do severe damage above ground. It was first discovered in New Jersey in 1916 and is a major threat to American crops.</li>"
            } else if (id == "wpbr") {
                title.innerHTML = "<h5>Pest Common Name: White Pine Blister Rust </h5>"
                desc.innerHTML = "<li>Scientific Name: Cronartium ribicola</li><li>Affects: Pines and White Pines</li><li>Native to: Asia</li><li>The White Pine Blister Rust has very specific reproductive needs but spores can be easily spread. The entire life cycle last 3 to 6 years. The fungus causes swelling and cankers which can kill branches and entire trees.</li>"
            } else {
                // if the id is none 
                title.innerHTML = "<h5>No Data Selected</h5>"
                desc.innerHTML = ""
            };
        } else{
            // if the id is none 
            title.innerHTML = "<h5>No Data Selected</h5>"
            desc.innerHTML = ""
        };
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

function removeAll(map, allLayers){
    for (i in allLayers){
        map.removeLayer(allLayers[i]);
        $("#"+i).removeClass('selected'); 
    };
};

function createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitepines, ashes){
    $("#bebb").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(bebb)) {
            $(this).removeClass('selected');
            $("#elms").removeClass('selected');
            map.removeLayer(bebb);
            map.removeLayer(elms);
        } else {
            removeAll(map, allLayers);
            map.addLayer(elms);
            map.addLayer(bebb);
            $(this).addClass('selected');
            $("#elms").addClass('selected');
        }
    });
    $("#bc").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(bc)) {
            $(this).removeClass('selected');
            $("#butternut").removeClass('selected');
            map.removeLayer(bc);
            map.removeLayer(butternut);
        } else {
            removeAll(map, allLayers);
            map.addLayer(butternut);
            map.addLayer(bc);
            $(this).addClass('selected');
            $("#butternut").addClass('selected');
        }
    });
    $("#eab").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(eab)) {
            $(this).removeClass('selected');
            $("#ashes").removeClass('selected');
            map.removeLayer(eab);
            map.removeLayer(ashes);
        } else {
            removeAll(map, allLayers);
            map.addLayer(ashes);
            map.addLayer(eab);
            $(this).addClass('selected');
            $("#ashes").addClass('selected');
        }
    });
    
    $("#gm").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(gm)) {
            $(this).removeClass('selected');
            $("#elms").removeClass('selected');
            map.removeLayer(gm);
            map.removeLayer(elms);
        } else {
            removeAll(map, allLayers);
            map.addLayer(elms);
            map.addLayer(gm);
            $(this).addClass('selected');
            $("#elms").addClass('selected');
        }
    });
    $("#hwa").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(hwa)) {
            $(this).removeClass('selected');
            $("#hemlocks").removeClass('selected');
            map.removeLayer(hwa);
            map.removeLayer(hemlocks);
        } else {
            removeAll(map, allLayers);
            map.addLayer(hemlocks);
            map.addLayer(hwa);
            $(this).addClass('selected');
            $("#hemlocks").addClass('selected');
        }
    });
    $("#jb").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(jb)) {
            $(this).removeClass('selected');
            $("#elms").removeClass('selected');
            map.removeLayer(jb);
            map.removeLayer(elms);
        } else {
            removeAll(map, allLayers);
            map.addLayer(elms);
            map.addLayer(jb);
            $(this).addClass('selected');
            $("#elms").addClass('selected');
        }
    });
    $("#wpbr").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(wpbr)) {
            $(this).removeClass('selected');
            $("#pines").removeClass('selected');
            $("#whitepines").removeClass('selected');
            map.removeLayer(wpbr);
            map.removeLayer(pines);
            map.removeLayer(whitepines);
        } else {
            removeAll(map, allLayers);
            map.addLayer(pines);
            map.addLayer(whitepines);
            map.addLayer(wpbr);
            $(this).addClass('selected');
            $("#pines").addClass('selected');
            $("#whitepines").addClass('selected');
        }
    });
    $("#butternut").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(butternut)) {
            $(this).removeClass('selected');
            $("#bc").removeClass('selected');
            map.removeLayer(butternut);
            map.removeLayer(bc);
        } else {
            removeAll(map, allLayers);
            map.addLayer(butternut);
            map.addLayer(bc);
            $(this).addClass('selected');
            $("#bc").addClass('selected');
        }
    });
    $("#elms").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(elms)) {
            $(this).removeClass('selected');
            $("#bebb").removeClass('selected');
            $("#jb").removeClass('selected');
            map.removeLayer(elms);
            map.removeLayer(bebb);
            map.removeLayer(jb);
        } else {
            removeAll(map, allLayers);
            map.addLayer(elms);
            map.addLayer(bebb);
            map.addLayer(jb);
            $(this).addClass('selected');
            $("#bebb").addClass('selected');
            $("#jb").addClass('selected');
        }
    });
    $("#hemlocks").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(hemlocks)) {
            $(this).removeClass('selected');
            $("#hwa").removeClass('selected');
            map.removeLayer(hemlocks);
            map.removeLayer(hwa);
        } else {
            removeAll(map, allLayers);
            map.addLayer(hemlocks);
            map.addLayer(hwa);
            $(this).addClass('selected');
            $("#hwa").addClass('selected');
        }
    });
    $("#pines").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(pines)) {
            $(this).removeClass('selected');
            $("#wpbr").removeClass('selected');
            map.removeLayer(pines);
            map.removeLayer(wpbr);
        } else {
            removeAll(map, allLayers);
            map.addLayer(pines);
            map.addLayer(wpbr);
            $(this).addClass('selected');
            $("#wpbr").addClass('selected');
        }
    });
    $("#whitepines").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(whitepines)) {
            $(this).removeClass('selected');
            $("#wpbr").removeClass('selected');
            map.removeLayer(whitepines);
            map.removeLayer(wpbr);
        } else {
            removeAll(map, allLayers);
            map.addLayer(whitepines);
            map.addLayer(wpbr);
            $(this).addClass('selected');
            $("#wpbr").addClass('selected');
        }
    });
    $("#ashes").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(ashes)) {
            $(this).removeClass('selected');
            $("#eab").removeClass('selected');
            map.removeLayer(eab);
            map.removeLayer(ashes);
        } else {
            removeAll(map, allLayers);
            map.addLayer(ashes);
            map.addLayer(eab);
            $(this).addClass('selected');
            $("#eab").addClass('selected');
        }
    });
};

function getData( bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitepines, ashes){
    //  LOAD DATA TREE
    $.ajax("data/Butternut.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(butternut)
        }
    });
    $.ajax("data/Elms.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(elms)
        }
    });
    $.ajax("data/Hemlocks.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(hemlocks)
        }
    });
    $.ajax("data/Pines.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(pines)
        }
    });
    $.ajax("data/WhitePines.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(whitepines)
        }
    });
    $.ajax("data/Ashes.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(ashes)
        }
    });
    
    //  LOAD DISEASE DATA
    $.ajax("data/Banded_Elm_Bark_Beetle.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(bebb);
        }
    });
    $.ajax("data/Butternut_Canker.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(bc)
        }
    });
    $.ajax("data/Emerald_Ash_Borer.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(eab)
        }
    });
    $.ajax("data/Gypsy_Moth.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(gm)
        }
    });
    $.ajax("data/Hemlock_Woolly_Adelgid.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(hwa)
        }
    });
    $.ajax("data/Japanese_Beetle.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, pestStyle).addTo(jb)
        }
    });
    $.ajax("data/White_Pine_Blister_Rust.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //console.log("WhitePineBlisterRust: " + attributes);
            //add to layer
            L.geoJson(response, pestStyle).addTo(wpbr)
        }
    });
};

function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        attributes.push(attribute);
    };

    //check result
    //console.log(attributes);

    return attributes;
};

var pestStyle = {
    fillColor: "#ff0000",
    fillOpacity: 0.5,
    color: "#ff0000",
    weight: 0.9
}

var treeStyle = {
    fillColor: "#3E873F",
    fillOpacity: 0.8,
    color: "#fff",
    weight: 1
}

$(document).ready(createMap);
