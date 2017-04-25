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
    var bebb =  L.geoJson().addTo(map);
    var bc =  L.geoJson();
    var eab =  L.geoJson();
    var gm =  L.geoJson();
    var hwa =  L.geoJson();
    var jb =  L.geoJson();
    var wpbr =  L.geoJson();
    
    // create blank geojson layers for all tree data
    var butternut =  L.geoJson().addTo(map);
    var elms =  L.geoJson();
    var hemlocks =  L.geoJson();
    var pines =  L.geoJson();
    var whitePines =  L.geoJson();
    var ashes = L.geoJson();
    
    //function to call each data layer and add it to the json layers above
    getData(bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes);

    createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes);
    
   

//CREATE GROUPED LAYER CONTROL 
    //group of basemaps
    var basemaps = {
        "Grayscale": grayscale,
        "Streets": streets
    };
    // Overlay layers are grouped
    var overlays = {
        //pests
        "Banded Elm Bark Beetle": bebb,
        "Butternut Canker": bc,
        "Emerald Ash Borer": eab,
        "Gypsy Moth": gm, 
        "Hemlock Woolly Adelgid": hwa,
        "Japanese Beetle": jb,
        "White Pine Blister Rust": wpbr,
        
        //trees
        "Butternut": butternut,
        "Elms": elms,
        "Hemlocks": hemlocks,
        "Pines": pines,
        "White Pines": whitePines,
        "Ashes": ashes
    };
    
    
    var options = {
      // Make the "Landmarks" group exclusive (use radio inputs)
      //exclusiveGroups: ["Pests"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      //groupCheckboxes: true,
      //keep panel popped open
      collapsed:false,
    };

    
// MOVE LAYER CONTROL OUT OF MAP
    var layerControl = L.control.layers(basemaps, overlays, options);
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
    var normalColorTree = "lightcoral";
    
    var cssButtonSelector = "#panel > div > form > div.leaflet-control-layers-overlays > label:nth-child"
    
    map.on('overlayadd', function(i){
        //PESTS
        if (i.name == 'Banded Elm Bark Beetle' ){
            $(cssButtonSelector+"(1)").css("background-color", selectColor);
            i.layer.bringToFront();
        }  else if (i.name == "Butternut Canker"){
            $(cssButtonSelector+"(2)").css("background-color", selectColor);
            i.layer.bringToFront();
            map.addLayer(elms);
            map.addLayer(elms);
        } else if (i.name == "Emerald Ash Borer"){
            $(cssButtonSelector+"(3)").css("background-color", selectColor);
            i.layer.bringToFront();
            map.addLayer(hemlocks);
        } else if (i.name == "Gypsy Moth"){
            $(cssButtonSelector+"(4)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $(cssButtonSelector+"(5)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Japanese Beetle"){
            $(cssButtonSelector+"(6)").css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "White Pine Blister Rust"){
            $(cssButtonSelector+"(7)").css("background-color", selectColor);
            i.layer.bringToFront();
        } 
        
        //TREES
        else if (i.name == "Ashes"){
            $(cssButtonSelector+"(8)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Butternut"){
            $(cssButtonSelector+"(9)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Elms"){
            $(cssButtonSelector+"(10)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Hemlocks"){
            $(cssButtonSelector+"(11)").css("background-color", selectColor);
            i.layer.bringToBack();
            map.addLayer(elms);
        } else if (i.name == "Pines"){
            $(cssButtonSelector+"(12)").css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "White Pines"){
            $(cssButtonSelector+"(13)").css("background-color", selectColor);
            i.layer.bringToBack();
        }
    });
    
    map.on('overlayremove', function(i){
        if (i.name == 'Banded Elm Bark Beetle' ){
            $(cssButtonSelector+"(1)").css("background-color", normalColorPest)
        }  else if (i.name == "Butternut Canker"){
            $(cssButtonSelector+"(2)").css("background-color", normalColorPest)
        } else if (i.name == "Emerald Ash Borer"){
            $(cssButtonSelector+"(3)").css("background-color", normalColorPest)
        } else if (i.name == "Gypsy Moth"){
            $(cssButtonSelector+"(4)").css("background-color", normalColorPest)
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $(cssButtonSelector+"(5)").css("background-color", normalColorPest)
        } else if (i.name == "Japanese Beetle"){
            $(cssButtonSelector+"(6)").css("background-color", normalColorPest)
        } else if (i.name == "White Pine Blister Rust"){
            $(cssButtonSelector+"(7)").css("background-color", normalColorPest)
        }
        
        //TREES
        else if (i.name == "Ashes"){
            $(cssButtonSelector+"(8)").css("background-color", normalColorTree)
        } else if (i.name == "Butternut"){
            $(cssButtonSelector+"(9)").css("background-color", normalColorTree)
        } else if (i.name == "Elms"){
            $(cssButtonSelector+"(10)").css("background-color", normalColorTree)
        } else if (i.name == "Hemlocks"){
            $(cssButtonSelector+"(11)").css("background-color", normalColorTree)
        } else if (i.name == "Pines"){
            $(cssButtonSelector+"(12)").css("background-color", normalColorTree)
        } else if (i.name == "White Pines"){
            $(cssButtonSelector+"(13)").css("background-color", normalColorTree)
        }
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

function createButtons(map, bebb, bc, eab, gm, hwa, jb, wpbr, butternut, elms, hemlocks, pines, whitePines, ashes){
    $("#bebb").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(bebb)) {
            $(this).removeClass('selected');
            map.removeLayer(bebb);
            map.removeLayer(elms);
        } else {
            map.addLayer(bebb);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#bc").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(bc)) {
            $(this).removeClass('selected');
            map.removeLayer(bc);
            map.removeLayer(elms);
        } else {
            map.addLayer(bc);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#eab").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(eab)) {
            $(this).removeClass('selected');
            map.removeLayer(eab);
            map.removeLayer(elms);
        } else {
            map.addLayer(eab);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    
    $("#gm").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(gm)) {
            $(this).removeClass('selected');
            map.removeLayer(gm);
            map.removeLayer(elms);
        } else {
            map.addLayer(gm);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#hwa").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(hwa)) {
            $(this).removeClass('selected');
            map.removeLayer(hwa);
            map.removeLayer(elms);
        } else {
            map.addLayer(hwa);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#jb").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(jb)) {
            $(this).removeClass('selected');
            map.removeLayer(jb);
            map.removeLayer(elms);
        } else {
            map.addLayer(jb);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#wpbr").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(wpbr)) {
            $(this).removeClass('selected');
            map.removeLayer(wpbr);
            map.removeLayer(elms);
        } else {
            map.addLayer(wpbr);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#butternut").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(butternut)) {
            $(this).removeClass('selected');
            map.removeLayer(butternut);
            map.removeLayer(hwa);
        } else {
            map.addLayer(butternut);
            map.addLayer(hwa);
            $(this).addClass('selected');
        }
    });
    $("#elms").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(elms)) {
            $(this).removeClass('selected');
            map.removeLayer(elms);
            map.removeLayer(hwa);
        } else {
            map.addLayer(elms);
            map.addLayer(hwa);
            $(this).addClass('selected');
        }
    });
    $("#Hemlocks").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(hemlocks)) {
            $(this).removeClass('selected');
            map.removeLayer(hemlocks);
            map.removeLayer(hwa);
        } else {
            map.addLayer(hemlocks);
            map.addLayer(hwa);
            $(this).addClass('selected');
        }
    });
    $("#pines").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(pines)) {
            $(this).removeClass('selected');
            map.removeLayer(pines);
            map.removeLayer(hwa);
        } else {
            map.addLayer(pines);
            map.addLayer(hwa);
            $(this).addClass('selected');
        }
    });
    $("#whitepines").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(whitepines)) {
            $(this).removeClass('selected');
            map.removeLayer(whitepines);
            map.removeLayer(hwa);
        } else {
            map.addLayer(whitepines);
            map.addLayer(hwa);
            $(this).addClass('selected');
        }
    });
    $("#ashes").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(ashes)) {
            $(this).removeClass('selected');
            map.removeLayer(ash);
            map.removeLayer(hwa);
        } else {
            map.addLayer(ashes);
            map.addLayer(hwa);
            $(this).addClass('selected');
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
