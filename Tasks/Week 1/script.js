require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Measurement",
    "esri/widgets/Home",
    "esri/widgets/Track",
    "esri/widgets/Directions",
    "esri/views/Magnifier"
],
    function (Map, MapView, FeatureLayer, Search, LayerList, Legend, Measurement, Home, Track, Directions, Magnifier) {

        document.getElementById("layerListButton").addEventListener("click", openlayerList);

        //creating a basemap--------------------->
        var map = new Map({
            basemap: "osm"
        });

        //creating a map view--------------------->

        var view = new MapView({
            container: "mapDiv",
            map: map,
            zoom: 4,
            center: [-87.6297982, 41.8781136]

        });

        //feature layer--------------->
        var layer1 = new FeatureLayer({
            url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/Natural_Gas_Interstate_and_Intrastate_Pipelines_1/FeatureServer://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0"
        });
        map.add(layer1);


        // creating a layerlist widget  
        var layerList = new LayerList({
            view: view,
            container: "layerList"
        });
        function openlayerList() {
            if (document.getElementById("layerList").style.display == "block") {
                document.getElementById("layerList").style.display = "none"
            } else {
                document.getElementById("layerList").style.display = "block"
            }
        }

        var searchWidget = new Search({
            view: view
        });

        view.ui.add(searchWidget, {
            position: "top-right",
            index: 2
        });

        var legend = new Legend({
            view: view
        });

        view.ui.add(legend, "bottom-left");

        var measurement = new Measurement({
            view: view,
            activeTool: "distance"
        });
        view.ui.add(measurement, "top-right");

        var measurement1 = new Measurement({
            view: view,
            activeTool: "area"
        });
        view.ui.add(measurement1, "bottom-right");

        let homeWidget = new Home({
            view: view
        });

        // adds the home widget to the top left corner of the MapView
        view.ui.add(homeWidget, "top-left");

        let trackWidget = new Track({
            view: view
        });

        view.ui.add(trackWidget, "top-left");

        const directionsWidget = new Directions({
            view: view
        });

        view.ui.add(directionsWidget, {
            position: "top-right",
            index: 2
        });

        view.when(() => {
            view.magnifier.visible = true;

            var offset = view.magnifier.size / 2;
            view.magnifier.offset = { x: offset, y: offset };

            //The magnifier will be displayed whenever the cursor hovers over the map.
            view.on("pointer-move", function (event) {
                view.magnifier.position = { x: event.x, y: event.y };
            });
        });
    });