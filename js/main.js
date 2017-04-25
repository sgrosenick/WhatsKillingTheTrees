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

// CHANGE COLOR OF BUTTON WHEN SELECTED
    var selectColor = "gray";
    var normalColorPest = "lightgoldenrodyellow";
    var normalColorTree = "lightcoral";
    
    var cssButtonSelector = ".btn.btn-primary"
/* 
    map.on('overlayadd', function(i){
        //PESTS
        if (i.name == 'Banded Elm Bark Beetle' ){
            $("#bebb"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
        }  else if (i.name == "Butternut Canker"){
            $("#bc"+cssButtonSelector).css("background-color:", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Emerald Ash Borer"){
            $("#eab"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
            map.addLayer(hemlocks);
        } else if (i.name == "Gypsy Moth"){
            $("#gm"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $("#hwa"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "Japanese Beetle"){
            $("#jb"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
        } else if (i.name == "White Pine Blister Rust"){
            $("#wpbr"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToFront();
        } 
        
        //TREES
        else if (i.name == "Ashes"){
            $("#ash"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Butternut"){
            $("#butternut"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Elms"){
            $("#elms"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "Hemlocks"){
            $("#hemlocks"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
            map.addLayer(elms);
        } else if (i.name == "Pines"){
            $("#pines"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
        } else if (i.name == "White Pines"){
            $("#whitepines"+cssButtonSelector).css("background-color", selectColor);
            i.layer.bringToBack();
        }
    });

    map.on('overlayremove', function(i){
        if (i.name == 'Banded Elm Bark Beetle' ){
            $("#bebb"+cssButtonSelecto).css("background-color", normalColorPest)
        }  else if (i.name == "Butternut Canker"){
            $("#bc"+cssButtonSelector).css("background-color", normalColorPest)
        } else if (i.name == "Emerald Ash Borer"){
            $("#eab"+cssButtonSelector).css("background-color", normalColorPest)
        } else if (i.name == "Gypsy Moth"){
            $("#gm"+cssButtonSelector).css("background-color", normalColorPest)
        } else if (i.name == "Hemlock Woolly Adelgid"){
            $("#hwa"+cssButtonSelector).css("background-color", normalColorPest)
        } else if (i.name == "Japanese Beetle"){
            $("#jb"+cssButtonSelector).css("background-color", normalColorPest)
        } else if (i.name == "White Pine Blister Rust"){
            $("#wpbr"+cssButtonSelector).css("background-color", normalColorPest)
        }
        
        //TREES
        else if (i.name == "Ashes"){
            $("#ash"+cssButtonSelector).css("background-color", normalColorTree)
        } else if (i.name == "Butternut"){
            $("#butternut"+cssButtonSelector).css("background-color", normalColorTree)
        } else if (i.name == "Elms"){
            $("#elms"+cssButtonSelector).css("background-color", normalColorTree)
        } else if (i.name == "Hemlocks"){
            $("#hemlocks"+cssButtonSelector).css("background-color", normalColorTree)
        } else if (i.name == "Pines"){
            $("#pines"+cssButtonSelector).css("background-color", normalColorTree)
        } else if (i.name == "White Pines"){
            $("#whitepines"+cssButtonSelector).css("background-color", normalColorTree)
        }
    });
  */   
    
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
    
    return allLayers;
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
            map.removeLayer(butternut);
            map.removeLayer(hwa);
        } else {
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(butternut);
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
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(elms);
            $(this).addClass('selected');
        }
    });
    $("#hemlocks").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(hemlocks)) {
            $(this).removeClass('selected');
            map.removeLayer(hemlocks);
            map.removeLayer(hwa);
        } else {
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(hemlocks);
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
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(pines);
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
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(whitepines);
            $(this).addClass('selected');
        }
    });
    $("#ashes").click(function(event) {
        event.preventDefault();
        if(map.hasLayer(ashes)) {
            $(this).removeClass('selected');
            map.removeLayer(hwa);
            map.removeLayer(ashes);
        } else {
            removeAll(map, allLayers);
            map.addLayer(hwa);
            map.addLayer(ashes);
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
