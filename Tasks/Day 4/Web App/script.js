// Importing the modules

require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList"
], function (Map, MapView, FeatureLayer, BasemapGallery, LayerList) {
    var map = new Map({
        basemap: "topo"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 6,
        center: [77.216721, 28.644800]
    });

    var featurelayer1 = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_Crime_Tracts/FeatureServer/0"

    });
    map.add(featurelayer1)

    var featurelayer2 = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Chicago_L_Lines/FeatureServer/1"
    });
    map.add(featurelayer2)
    var basemapGallery = new BasemapGallery({
        view: view,
        container: "basemapGalleryDiv"
    });

    view.ui.add(basemapGallery, {
        position: "top-right"
    });

    var layerlist = new LayerList({
        view: view,
        container: document.createElement("viewDiv")
    });

    view.ui.add(layerlist, {
        position: "top-left"
    });

});

