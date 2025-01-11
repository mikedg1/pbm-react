import { Platform, StyleSheet, View } from "react-native";
import { Text } from "./index";
import { CheckBox } from "@rneui/themed";
import React, { useContext } from "react";
import { ThemeContext } from "../theme-context";

const CheckBoxSetting = ({
  title,
  description,
  checkTitle,
  onPress,
  checked,
}) => {
  const { theme } = useContext(ThemeContext);
  const s = getStyles(theme);

  return (
    <View>
      <View style={[s.title, { marginBottom: 4 }]}>
        <Text style={s.titleText}>{title}</Text>
      </View>
      <CheckBox
        checked={checked}
        title={checkTitle}
        onPress={() => {
          // Sends the new checked value
          return onPress(!checked);
        }}
        containerStyle={s.checkBoxContainer}
        fontFamily="Nunito-Bold"
        textStyle={s.checkBoxTextStyle}
        checkedColor={theme.purple}
      />
      <Text style={s.descriptionText}>{description}</Text>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    title: {
      paddingTop: 10,
    },
    titleText: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: "Nunito-Bold",
      color: theme.text,
    },
    descriptionText: {
      fontSize: 14,
      color: theme.text2,
      fontFamily: "Nunito-Italic",
      fontStyle: Platform.OS === "android" ? undefined : "italic",
      lineHeight: 22,
      marginLeft: 15,
      marginRight: 15,
    },
    checkBoxContainer: {
      backgroundColor: theme.base1,
      marginVertical: -8,
    },
    checkBoxTextStyle: {
      fontSize: 16,
      color: theme.text,
    },
  });

export default CheckBoxSetting;
