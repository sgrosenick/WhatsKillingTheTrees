function createMap(){
    // initialize the map
    var map = L.map('map').setView([39, -96], 4);

    // basemap layers
    var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map),
    streets= L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
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
    var tree1 = new L.geoJson().addTo(map);
    var tree2 = new L.geoJson();
    var tree3 = new L.geoJson();
    var tree4 = new L.geoJson();
    var tree5 = new L.geoJson();
    var tree6 = new L.geoJson();
    var tree7 = new L.geoJson();
    
    
    //function to call each data layer and add it to the json layers above
    getData(bebb, bc, eab, gm, hwa, jb, wpbr)

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
        "tree1": tree1,
        "tree2": tree2,
        "tree3": tree3,
        "tree4": tree4,
        "tree5": tree5,
        "tree6": tree6,
        "tree7": tree7          
      }
    };
    
    
    var options = {
      // Make the "Landmarks" group exclusive (use radio inputs)
      exclusiveGroups: ["Pests"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      groupCheckboxes: true,
      //keep panel popped open
      collapsed:false
    };

    // Use the custom grouped layer control, not "L.control.layers"
    var layerControl = L.control.groupedLayers(basemaps, groupedOverlays, options);
    map.addControl(layerControl)
    
    // Call the getContainer routine.
    var htmlObject = layerControl.getContainer();
    // Get the desired parent node.
    var a = document.getElementById('panel');

    // Finally append that node to the new parent.
    function setParent(el, newParent){
        newParent.appendChild(el);
    }
    setParent(htmlObject, a);
    };


function getData(bebb, bc, eab, gm, hwa, jb, wpbr){
    //load the data
    $.ajax("data/Banded_Elm_Bark_Beetle.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(bebb)
        }
    });
    $.ajax("data/Butternut_Canker.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(bc)
        }
    });
    $.ajax("data/Emerald_Ash_Borer.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(eab)
        }
    });
    $.ajax("data/Gypsy_Moth.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(gm)
        }
    });
    $.ajax("data/Hemlock_Woolly_Adelgid.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(hwa)
        }
    });
    $.ajax("data/Japanese_Beetle.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(jb)
        }
    });
    $.ajax("data/White_Pine_Blister_Rust.geojson", {
        dataType: "json",
        success: function(response){
            //create an attributes array
            var attributes = processData(response);
            //add to layer
            L.geoJson(response).addTo(wpbr)
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
        //only take attributes with population values
        if (attribute.indexOf("perc_") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};

$(document).ready(createMap);
