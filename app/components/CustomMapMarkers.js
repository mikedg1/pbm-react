import React from "react";
import PropTypes from "prop-types";
import Mapbox from "@rnmapbox/maps";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getMapLocations } from "../selectors";
import { setSelectedMapLocation } from "../actions";
import { useDispatch } from "react-redux";
import { isThemeDark } from "../utils/themes";

const iconStyles = {
  iconImage: ["get", "icon"],
  iconAllowOverlap: true,
  iconSize: ["interpolate", ["linear"], ["zoom"], 11, 0.44, 24, 0.6],
  textSize: ["interpolate", ["linear"], ["zoom"], 11, 20, 24, 26],
  symbolSortKey: ["get", "order"],
  textField: ["get", "num_machines"],
  textAllowOverlap: true,
  textColor: ["get", "textColor"],
  textOffset: [0, 0.05],
  textFont: ["Nunito Sans ExtraBold"],
};

const textFloat = (theme) => ({
  textField: [
    "step",
    ["zoom"],
    ["case", [">=", ["get", "num_machines"], 10], ["get", "name"], ""],
    13,
    ["case", [">=", ["get", "num_machines"], 2], ["get", "name"], ""],
    14,
    ["get", "name"],
  ],
  textSize: ["interpolate", ["linear"], ["zoom"], 11, 16, 24, 24],
  textJustify: "center",
  textVariableAnchor: ["bottom", "top", "right", "left"],
  textRadialOffset: 1.4,
  textAllowOverlap: false,
  textColor: isThemeDark(theme) ? "#f0f9ff" : "#463333",
  textHaloColor: isThemeDark(theme) ? "#222221" : "#eeeaea",
  textHaloWidth: 1,
  textFont: ["Nunito Sans Bold"],
  iconAllowOverlap: false,
  symbolSortKey: ["get", "textOrder"],
});

const CustomMapMarkers = React.memo(() => {
  const theme = useTheme();
  const locations = useSelector((state) => getMapLocations(state, theme.theme));
  const features = {
    type: "FeatureCollection",
    features: locations,
  };
  const dispatch = useDispatch();

  return (
    <Mapbox.ShapeSource
      id={"shape-source-id-0"}
      shape={features}
      hitbox={{ width: 1, height: 1 }}
      onPress={(e) => {
        dispatch(setSelectedMapLocation(Number(e.features[0].id)));
      }}
    >
      <Mapbox.SymbolLayer id={"symbol-id1"} style={iconStyles} />
      <Mapbox.Images
        images={{
          one: require("../assets/marker-one.png"),
          moreOne: require("../assets/marker-more.png"),
          oneHeart: require("../assets/marker-one-heart.png"),
          moreOneHeart: require("../assets/marker-more-heart.png"),
          oneSelected: require("../assets/marker-one-selected.png"),
          moreOneSelected: require("../assets/marker-more-selected.png"),
        }}
      />
      <Mapbox.SymbolLayer
        id={"symbol-id2"}
        style={textFloat(theme.theme)}
        minZoomLevel={11}
        maxZoomLevel={24}
      />
    </Mapbox.ShapeSource>
  );
});

CustomMapMarkers.propTypes = {
  navigation: PropTypes.object,
};

export default CustomMapMarkers;
