require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/CSVLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/widgets/Locate"
], function (Map, MapView, FeatureLayer, CSVLayer, BasemapGallery, LayerList, Legend, Search, Home, Locate) {

    document.getElementById("basemapButton").addEventListener("click", openBasemap);
    document.getElementById("layerListButton").addEventListener("click", openlayerList);
    document.getElementById("legendButton").addEventListener("click", openlegend);

    const map = new Map({
        basemap: "dark-gray-vector"
    });

    const view = new MapView({
        container: "viewdiv",
        map: map,
        zoom: 2,
        center: [15.444, 10.372]
    });

    const layer = new FeatureLayer({
        url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/PowerPlants_WorldResourcesInstitute/FeatureServer/0"
    });
    map.add(layer);

    const layer1 = new FeatureLayer({
        url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/Rivers_World_Natural_Earth/FeatureServer"
    });
    map.add(layer1);

    const basemapGallery = new BasemapGallery({
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

    const layerList = new LayerList({
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
    const legend = new Legend({
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

    const search = new Search({
        view: view
    });
    view.ui.add(search, "top-right");

    const home = new Home({
        view: view
    });

    view.ui.add(home, "top-left")

    const locate = new Locate({
        view: view
    });
    view.ui.add(locate, "top-left")
});