require(["esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/BasemapGallery"
],
    function (Map, ArcGISDynamicMapServiceLayer, BasemapGallery) {
        const map = new Map("map", {
            basemap: "topo",
            zoom: 5,
            center: [78.552246, 24.036431]
        });

        const layer = new ArcGISDynamicMapServiceLayer(
            "https://umd.nic.in/sramap/rest/services/State/MapServer", {
            "showAttribution": false
        });

        map.addLayer(layer)

        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapgallery");

    });