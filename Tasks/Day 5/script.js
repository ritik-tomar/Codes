require(
    ["esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/BasemapGallery",
        "esri/widgets/LayerList",
        "esri/widgets/Legend",
        "esri/widgets/Search",
        "esri/rest/support/Query"],

    function (Map, MapView, FeatureLayer, BasemapGallery, LayerList, Legend, Search, Query) {
        document.getElementById("layerbutton").addEventListener("mouseover", layerfunc);
        document.getElementById("basemapbutton").addEventListener("mouseover", basefunc);
        document.getElementById("legendbutton").addEventListener("mouseover", legfunc);
        //constructing a map
        var map1 = new Map({
            basemap: "dark-gray-vector"
        });

        //creating a map view
        var mapview = new MapView({
            container: "mapcontainer",
            map: map1,
            zoom: 10,
            center: [-87.6297982, 41.8781136]
        });

        var feature1 = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0",

        });
        map1.add(feature1);

        var query1 = new Query({
            where: " NarcoticsC = 23" && "NarcoticsC = 2",
            returnGeometry: true,
            outFields: ['*']
        })

        feature1.queryFeatures(query1).then(function (results) {
            console.log(results)
        });

        var source = [
            {
                layer: new FeatureLayer({
                    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0",
                    outFields: ["*"]
                }),
                exactMatch: false,
                name: "Chicago Search",
                placeholder: "Second Search Widget",
                maxResults: 6,
                maxSuggestions: 6,
                suggestionsEnabled: true,
                minSuggestCharacters: 3
            }];

        var feature = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_L_Lines/FeatureServer/1"
        });
        map1.add(feature);



        var basemap = new BasemapGallery({
            view: mapview,
            container: "basemap"
        });
        function basefunc() {
            if (document.getElementById("basemap").style.display == "block") {
                document.getElementById("basemap").style.display = "none"
            } else {
                document.getElementById("basemap").style.display = "block"
            }
        }

        var layerList = new LayerList({
            view: mapview,
            container: "layerlist"
        });

        function layerfunc() {
            if (document.getElementById("layerlist").style.display == "block") {
                document.getElementById("layerlist").style.display = "none"
            } else {
                document.getElementById("layerlist").style.display = "block"
            }
        }

        var leg = new Legend({
            view: mapview,
            container: "legend"
        });

        function legfunc() {
            if (document.getElementById("legend").style.display == "block") {
                document.getElementById("legend").style.display = "none"
            } else {
                document.getElementById("legend").style.display = "block"
            }
        }

        var search1 = new Search({
            view: mapview,
            sources: source
        });
        mapview.ui.add(search1, {
            position: "top-right",
            index: 2
        });

    });