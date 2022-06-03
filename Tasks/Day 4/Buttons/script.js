require(["esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Legend",
    "esri/widgets/LayerList"],

    function (esriConfig, Map, MapView, FeatureLayer, BasemapGallery, Legend, LayerList) {
        document.getElementById("legendButton").addEventListener("mouseover", openLegend);
        document.getElementById("basemapButton").addEventListener("mouseover", openBasemap);
        document.getElementById("layerListButton").addEventListener("mouseover", openlayerList);
        //configuration
        esriConfig.apiKey = "AAPK86ea43fce94144699142bd990c7b27c6bD_WFtjnA8hEST3pKDCEhwellu6D1H3msjsovOXLns8khgRlegXzaz6DfkiTDynY";
        const map = new Map({
            basemap: "satellite" // Basemap layer
        });

        //MapView
        const view = new MapView({
            map: map,
            center: [-87.6297982, 41.8781136], // Longitude, latitude
            zoom: 10, // Zoom level
            container: "viewDiv" // Div element
        });
        // feature layer 1
        const Layer1 = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0"
        });
        map.add(Layer1);
        // feature layer 2
        const Layer = new FeatureLayer({
            url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_L_Lines/FeatureServer/1"
        });
        map.add(Layer);
        //BasemapGallery
        const basemapGallery = new BasemapGallery({
            view: view,
            container: "basemapDiv",
            source: {
                query: {
                    title: '"World Basemaps for Developers" AND owner:esri'
                }
            }
        });
        view.ui.add(basemapGallery, "top-right"); // Add to the view
        function openBasemap() {
            if (document.getElementById("basemapDiv").style.display == "block") {
                document.getElementById("basemapDiv").style.display = "none"
            } else {
                document.getElementById("basemapDiv").style.display = "block"
            }
        }
        //Layerlist
        const layerList = new LayerList({
            view: view,
            container: "layerListDiv",
        });

        // Add widget below other elements in the top left corner of the view
        view.ui.add(layerList, {
            position: "top-left"
        });
        function openlayerList() {
            if (document.getElementById("layerListDiv").style.display == "block") {
                document.getElementById("layerListDiv").style.display = "none"
            } else {
                document.getElementById("layerListDiv").style.display = "block"
            }
        }
        //Legend
        const legend = new Legend({
            view: view,

            container: "legendDiv",
            layerInfos: [
                {
                    layer: Layer

                }
            ]

        })
        // Add widget to the bottom right corner of the view
        view.ui.add(legend, container);
        function openLegend() {
            if (document.getElementById("legendDiv").style.display == "block") {
                document.getElementById("legendDiv").style.display = "none"
            } else {
                document.getElementById("legendDiv").style.display = "block"
            }
        }



    });