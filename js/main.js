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
    var bebb = new L.geoJson().addTo(map);
    var bc = new L.geoJson();
    var eab = new L.geoJson();
    var gm = new L.geoJson();
    var hwa = new L.geoJson();
    var jb = new L.geoJson();
    var wpbr = new L.geoJson();
    
    // create blank geojson layers for all tree data
    //var amElm = new L.geoJson().addTo(map);
    var butternut = new L.geoJson().addTo(map);
    var elms = new L.geoJson();
    var hemlocks = new L.geoJson();
    var pines = new L.geoJson();
    var whitePines = new L.geoJson();
    /*var carHem = new L.geoJson();
    var cedElm = new L.geoJson();
    var estHem = new L.geoJson();
    var estWPine = new L.geoJson();
    var rockElm = new L.geoJson();
    var sepElm = new L.geoJson();
    var slpElm = new L.geoJson();
    var swWPine = new L.geoJson();
    var sugPine = new L.geoJson();
    var westWPine = new L.geoJson();
    var wbPine = new L.geoJson();
    var wngdElm = new L.geoJson();
    */
    
    //function to call each data layer and add it to the json layers above
    getData(bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines);


//CREATE GROUPED LAYER CONTROL 
    //group of basemaps
    var basemaps = {
        "Grayscale": grayscale,
        "Streets": streets
    };
    // Overlay layers are grouped
    var groupedOverlays = {
      "Pests": {
        "Banded Elm Bark Beetle": bebb,
        "Butternut Canker": bc,
        "Emerald Ash Borer": eab,
        "Gypsy Moth": gm, 
        "Hemlock Woolly Adelgid": hwa,
        "Japanese Beetle": jb,
        "White Pine Blister Rust": wpbr
      },
      "Trees": {
        "Butternut": butternut,
        "Elms": elms,
        "Hemlocks": hemlocks,
        "Pines": pines,
        "White Pines": whitePines
      }
    };
    
    
    var options = {
      // Make the "Landmarks" group exclusive (use radio inputs)
      exclusiveGroups: ["Pests"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      groupCheckboxes: true,
      //keep panel popped open
      collapsed:false,
    };

    
// MOVE LAYER COUNTROL OUT OF MAP
    var layerControl = L.control.groupedLayers(basemaps, groupedOverlays, options);
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

// CHANGE COLOR OF BUTTON WHEN SELECTED
    var selectColor = "gray";
    var normalColorPest = "lightgoldenrodyellow";
    var normalColorTree = "lightsalmon";
    
    
    
    map.on('overlayadd', function(i){
        //PESTS
        if (i.name == 'Banded Elm Bark Beetle' ){
            $("#leaflet-control-layers-group-1 > label:nth-child(2)").css("background-color", selectColor);
            i.layer.bringToFront();
        }  else if (i.name == "Butternut Canker"){
            $("#leaflet-control-layers-group-1 > label:nth-child(3)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Emerald Ash Borer"){
            $("#leaflet-control-layers-group-1 > label:nth-child(4)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Gypsy Moth"){
            $("#leaflet-control-layers-group-1 > label:nth-child(5)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $("#leaflet-control-layers-group-1 > label:nth-child(6)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Japanese Beetle"){
            $("#leaflet-control-layers-group-1 > label:nth-child(7)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "White Pine Blister Rust"){
            $("#leaflet-control-layers-group-1 > label:nth-child(8)").css("background-color", selectColor);
            i.layer.bringToFront();
        } 
        
        //TREES
        else if (i.name == "American Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(2)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Butternut"){
            $("#leaflet-control-layers-group-2 > label:nth-child(3)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Carolina Hemlock"){
            $("#leaflet-control-layers-group-2 > label:nth-child(4)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Ceder Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(5)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Eastern Hemlock"){
            $("#leaflet-control-layers-group-2 > label:nth-child(6)").css("background-color", selectColor);
            i.layer.bringToBack();
        } /*else if (i.name == "Eastern White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(7)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Rock Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(8)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "September Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(9)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Slippery Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(10)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Southwestern White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(11)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Sugar Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(12)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Western White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(13)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Whitebark Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(14)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Winged Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(15)").css("background-color", selectColor);
            i.layer.bringToBack();
        }*/
    });
    
    map.on('overlayremove', function(i){
        if (i.name == 'Banded Elm Bark Beetle' ){
            $("#leaflet-control-layers-group-1 > label:nth-child(2)").css("background-color", normalColorPest)
        }  else if (i.name == "Butternut Canker"){
            $("#leaflet-control-layers-group-1 > label:nth-child(3)").css("background-color", normalColorPest)
        } else if (i.name == "Emerald Ash Borer"){
            $("#leaflet-control-layers-group-1 > label:nth-child(4)").css("background-color", normalColorPest)
        } else if (i.name == "Gypsy Moth"){
            $("#leaflet-control-layers-group-1 > label:nth-child(5)").css("background-color", normalColorPest)
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $("#leaflet-control-layers-group-1 > label:nth-child(6)").css("background-color", normalColorPest)
        } else if (i.name == "Japanese Beetle"){
            $("#leaflet-control-layers-group-1 > label:nth-child(7)").css("background-color", normalColorPest)
        } else if (i.name == "White Pine Blister Rust"){
            $("#leaflet-control-layers-group-1 > label:nth-child(8)").css("background-color", normalColorPest)
        }
        
        //TREES
        else if (i.name == "American Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(2)").css("background-color", normalColorTree)
        } else if (i.name == "Butternut"){
            $("#leaflet-control-layers-group-2 > label:nth-child(3)").css("background-color", normalColorTree)
        } else if (i.name == "Carolina Hemlock"){
            $("#leaflet-control-layers-group-2 > label:nth-child(4)").css("background-color", normalColorTree)
        } else if (i.name == "Ceder Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(5)").css("background-color", normalColorTree)
        } else if (i.name == "Eastern Hemlock"){
            $("#leaflet-control-layers-group-2 > label:nth-child(6)").css("background-color", normalColorTree)
        } /*else if (i.name == "Eastern White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(7)").css("background-color", normalColorTree)
        } else if (i.name == "Rock Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(8)").css("background-color", normalColorTree)
        } else if (i.name == "September Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(9)").css("background-color", normalColorTree)
        } else if (i.name == "Slippery Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(10)").css("background-color", normalColorTree)
        } else if (i.name == "Southwestern White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(11)").css("background-color", normalColorTree)
        } else if (i.name == "Sugar Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(12)").css("background-color", normalColorTree)
        } else if (i.name == "Western White Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(13)").css("background-color", normalColorTree)
        } else if (i.name == "Whitebark Pine"){
            $("#leaflet-control-layers-group-2 > label:nth-child(14)").css("background-color", normalColorTree)
        } else if (i.name == "Winged Elm"){
            $("#leaflet-control-layers-group-2 > label:nth-child(15)").css("background-color", normalColorTree)
        }*/
    });
    
    
// SEARCH BAR
    var searchControl = new L.Control.Search({
        layer: bebb,
        propertyName: 'name',
        marker: false,
        //moveToLocation: function(latlng, title, map){
        //    var zoom = map.getBoundsZoom(latlng.layer.getbounds());
        //    map.setView(latlnt, zoom);;
        //}
    });
    
    map.addControl(searchControl);
};


function getData(bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines ){
    //  LOAD DATA TREE
    /*$.ajax("data/AmericanElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            console.log("American Elm: " + attributes);
            //add to layer
            L.geoJson(response, treeStyle).addTo(amElm);
            response.bringToBack;
        }
    });*/
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
    /*$.ajax("data/CarolinaHemlock.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(carHem)
        }
    });
    $.ajax("data/CedarElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(cedElm)
        }
    });
    $.ajax("data/EasternHemlock.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(estHem)
        }
    });
    $.ajax("data/EasternWhitePine.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(estWPine)
        }
    });
    $.ajax("data/RockElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(rockElm)
        }
    });
    $.ajax("data/SeptemberElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(sepElm)
        }
    });
    $.ajax("data/SlipperyElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(slpElm)
        }
    });
    $.ajax("data/SouthwesternWhitePine.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(swWPine)
        }
    });
    $.ajax("data/SugarPine.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(sugPine)
        }
    });
    $.ajax("data/WesternWhitePine.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(westWPine)
        }
    });
    $.ajax("data/WhitebarkPine.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(wbPine)
        }
    });
    $.ajax("data/WingedElm.geojson", {
        dataType: "json",
        success: function(response){
            //create attribute array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response, treeStyle).addTo(wngdElm)
        }
    });*/
    
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
            console.log("WhitePineBlisterRust: " + attributes);
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
    console.log(attributes);

    return attributes;
};

var pestStyle = {
    fillColor: "#ff0000",
    fillOpacity: 0.8,
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
