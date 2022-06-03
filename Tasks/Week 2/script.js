require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/widgets/FeatureTable",
    "esri/geometry/geometryEngineAsync",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/widgets/Locate"
], function (Map, MapView, FeatureLayer, GraphicsLayer, SketchViewModel, Graphic,
    FeatureTable, geometryEngineAsync, BasemapGallery, LayerList, Legend, Search, Home, Locate) {

    document.getElementById("basemapButton").addEventListener("click", openBasemap);
    document.getElementById("layerListButton").addEventListener("click", openlayerList);
    document.getElementById("legendButton").addEventListener("click", openlegend);


    var map = new Map({
        basemap: "hybrid"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 3,
        center: [-120.681310, 63.374661]
    });

    var layer1 = new FeatureLayer({
        url: "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/earthquakes_en/MapServer"
    });
    map.add(layer1);

    var csvLayerView;
    layer1.when(() => {
        view.whenLayerView(layer1).then(function (layerView) {
            csvLayerView = layerView;
        });
    })
        .catch(errorCallback);

    var featureTable = new FeatureTable({
        view: view,
        layer: layer1,
        highlightOnRowSelectEnabled: false,
        fieldConfigs: [
            {
                name: "magnitude_codelist",
                label: "Codelist"
            },
            {
                name: "magnitude_type",
                label: "Magnitude Type"
            },
            {
                name: "magnitude",
                label: "Magnitude"
            },
            {
                name: "place",
                label: "Place"
            },
            {
                name: "depth",
                label: "Depth"
            }],
        container: document.getElementById("tableDiv")
    });

    var features = [];


    featureTable.on("selection-change", (changes) => {
        changes.removed.forEach((item) => {
            var data = features.find((data) => {
                return data === item.objectId;
            });
            if (data) {
                features.splice(features.indexOf(data), 1);
            }
        });

        changes.added.forEach((item) => {
            features.push(item.objectId);
        });

        csvLayerView.featureEffect = {
            filter: {
                objectIds: features
            },
            excludedEffect: "blur(5px) grayscale(90%) opacity(40%)"
        };
    });


    var polygonGraphicsLayer = new GraphicsLayer();
    map.add(polygonGraphicsLayer);


    view.ui.add("select-by-rectangle", "top-left");
    var selectButton = document.getElementById("select-by-rectangle");



    selectButton.addEventListener("click", () => {
        view.popup.close();
        sketchViewModel.create("rectangle");
    });



    view.ui.add("clear-selection", "top-left");
    document.getElementById("clear-selection").addEventListener("click", () => {
        featureTable.clearSelection();
        featureTable.filterGeometry = null;
        polygonGraphicsLayer.removeAll();
    });


    var sketchViewModel = new SketchViewModel({
        view: view,
        layer: polygonGraphicsLayer
    });




    sketchViewModel.on("create", async (event) => {
        if (event.state === "complete") {

            var geometries = polygonGraphicsLayer.graphics.map(function (graphic) {
                return graphic.geometry
            });
            var queryGeometry = await geometryEngineAsync.union(geometries.toArray());
            selectFeatures(queryGeometry);
        }
    });



    function selectFeatures(geometry) {
        if (csvLayerView) {

            var query = {
                geometry: geometry,
                outFields: ["*"]
            };

            
            csvLayerView.queryFeatures(query)
                .then((results) => {
                    if (results.features.length === 0) {
                        clearSelection();
                    } else {
                        
                        featureTable.filterGeometry = geometry;
                        featureTable.selectRows(results.features);
                    }
                })
                .catch(errorCallback);
        }
    }
    function errorCallback(error) {
        console.log("error happened:", error.message);
    }

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

    var search = new Search({
        view: view,
        sources:
            [
                {
                    layer: new FeatureLayer({
                        url: "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/earthquakes_en/MapServer",
                        outFields: ["*"]
                    }),
                    searchFields: ["magnitude_codelist", "magnitude"],
                    displayField: "magnitude",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "Canada Earthquakes",
                    placeholder: "Canada Earthquakes",
                    maxResults: 6,
                    maxSuggestions: 6,
                    suggestionsEnabled: true,
                    minSuggestCharacters: 0
                }

            ]
    });

    view.ui.add(search, "top-right");

    var homeWidget = new Home({
        view: view
    });

    view.ui.add(homeWidget, "top-left");

    var locate = new Locate({
        view: view
    });
    view.ui.add(locate, "top-left");
});