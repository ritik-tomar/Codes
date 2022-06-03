require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/tasks/support/Query",
    "esri/Graphic",
    "esri/geometry/Geometry"
],
    function (Map, MapView, FeatureLayer, BasemapGallery, LayerList,
        Legend, Locate, Search, Query, Graphic, Geometry) {
        document.getElementById("basemapButton").addEventListener("mouseover", openBasemap);
        document.getElementById("layerListButton").addEventListener("mouseover", openlayerList);
        document.getElementById("legendButton").addEventListener("mouseover", openlegend);

        //creating a basemap--------------------->
        var map = new Map({
            basemap: "dark-gray-vector"
        });

        //creating a map view--------------------->

        var view = new MapView({
            container: "mapDiv",
            map: map,
            zoom: 9,
            center: [-87.6297982, 41.8781136]

        });

        //feature layer--------------->
        var layer1 = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0"
        });
        map.add(layer1);

        var layer2 = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_L_Lines/FeatureServer/1"
        });
        map.add(layer2);

        var featureLayer = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0"
        })


        //creating basemap wigdet-------->
        var basemapGallery = new BasemapGallery({
            view: view,
            container: "basemapGallery"
        });
        function openBasemap() {
            if (document.getElementById("basemapGallery").style.display == "block") {
                document.getElementById("basemapGallery").style.display = "none"
            } else {
                document.getElementById("basemapGallery").style.display = "block"
            }
        }

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

        //creating a legend widget
        var legend = new Legend({
            view: view,
            container: "legend"
        });
        function openlegend() {
            if (document.getElementById("legend").style.display == "block") {
                document.getElementById("legend").style.display = "none"
            } else {
                document.getElementById("legend").style.display = "block"
            }
        }

        //locate widget
        var locate = new Locate({
            view: view
        });
        view.ui.add(locate, "top-right");

        // search widget
        var search = new Search({
            view: view,
            sources:
                [
                    {
                        layer: new FeatureLayer({
                            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/US_Counties/FeatureServer/0",
                            outFields: ["*"]
                        }),
                        searchFields: ["STATE_FIPS", "STATE_NAME"],
                        displayField: "STATE_FIPS",
                        exactMatch: false,
                        outFields: ["*"],
                        name: "Cities of United States",
                        placeholder: "Cities of United States",
                        maxResults: 6,
                        maxSuggestions: 6,
                        suggestionsEnabled: true,
                        minSuggestCharacters: 0
                    }

                ]
        });

        view.ui.add(search, "top-right");

        var query = new Query({
            where: "NarcoticsC = '23' OR NarcoticsC = '2'",
            returnGeometry: true,
            outFields: ["*"]
        });

        featureLayer.queryFeatures(query).then(function (results) {
            console.log(results);


            view.goTo(results.features[0].geometry)

            var fill = {
                type: "simple-fill",
                color: [102, 255, 204, 0.4],
                outline: {
                    color: [255, 128, 291],
                    width: 2
                }
            };

            var graphic = new Graphic({
                geometry: results.features[0].geometry,
                symbol: fill
            });

            view.graphics.add(graphic);
        });
        
    });