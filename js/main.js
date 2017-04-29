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
    var whitePines =  L.geoJson();
    var ashes = L.geoJson();
    
    allLayers = {bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes}
   
    
    //function to call each data layer and add it to the json layers above
    getData(bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes);

    createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes);
    


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
    
    // Call the getContainer routine.
    var htmlObject = layerControl.getContainer();
    // Get the desired parent node.
    var a = document.getElementById('panel');

    // append that node to the new parent.
    function setParent(el, newParent){
        newParent.appendChild(el);
    }
    setParent(htmlObject, a);


    
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
    return allLayers;
};

function home(map){
    $("#home").click(function(event) {
        event.preventDefault();
        map.setView([39, -96], 4);
    });
};

function zoom(map, control){
    $("#zoom").click(function(event,latlng) {
        event.preventDefault();
        var layer = control.getActiveOverlayLayers();
        var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom);
    });
};

function removeAll(map, allLayers){
    for (i in allLayers){
        map.removeLayer(allLayers[i]);
        $("#"+i).removeClass('selected'); 
    };
};

function createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes){
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
            map.removeLayer(whitePines);
        } else {
            removeAll(map, allLayers);
            map.addLayer(pines);
            map.addLayer(whitePines);
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
            $("#whitepines").removeClass('selected');
            $("#wpbr").removeClass('selected');
            map.removeLayer(pines);
            map.removeLayer(whitePines);
            map.removeLayer(wpbr);
        } else {
            removeAll(map, allLayers);
            map.addLayer(pines);
            map.addLayer(whitePines);
            map.addLayer(wpbr);
            $(this).addClass('selected');
            $("#whitepines").addClass('selected');
            $("#wpbr").addClass('selected');
        }
    });
    $("#whitepines").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(whitePines)) {
            $(this).removeClass('selected');
            $("#pines").removeClass('selected');
            $("#wpbr").removeClass('selected');
            map.removeLayer(whitePines);
            map.removeLayer(pines);
            map.removeLayer(wpbr);
        } else {
            removeAll(map, allLayers);
            map.addLayer(whitePines);
            map.addLayer(pines);
            map.addLayer(wpbr);
            $(this).addClass('selected');
            $("#pines").addClass('selected');
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

function getData( bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes){
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
            L.geoJson(response, treeStyle).addTo(whitePines)
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
