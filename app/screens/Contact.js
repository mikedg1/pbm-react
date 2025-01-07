import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemeContext } from "../theme-context";
import {
  ActivityIndicator,
  ConfirmationModal,
  PbmButton,
  Text,
} from "../components";
import { submitMessage, clearMessage } from "../actions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isThemeDark } from "../utils/themes";

const Contact = ({ submitMessage, clearMessage, navigation, user, route }) => {
  const { theme } = useContext(ThemeContext);
  const s = getStyles(theme);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    submitMessage({
      name,
      email,
      message,
      locationName: route.params?.locationName,
    });
  };

  const acknowledgeConfirmation = () => {
    clearMessage();
    navigation.goBack();
  };

  const _disabled = () => {
    if (user.loggedIn) {
      if (message) return false;
    } else {
      if (name && email && message) return false;
    }

    return true;
  };

  const { loggedIn, submittingMessage, confirmationMessage } = user;

  return (
    <View style={{ flex: 1, paddingHorizontal: 0 }}>
      <ConfirmationModal visible={confirmationMessage.length > 0}>
        <Text style={s.confirmText}>{confirmationMessage}</Text>
        <MaterialCommunityIcons
          name="close-circle"
          size={45}
          onPress={acknowledgeConfirmation}
          style={s.xButton}
        />
      </ConfirmationModal>
      {submittingMessage ? (
        <ActivityIndicator />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[s.background, Platform.OS === "ios" && { flex: 1 }]}
          keyboardVerticalOffset={100}
        >
          <ScrollView
            style={{ paddingHorizontal: 20 }}
            scrollIndicatorInsets={{ right: 1 }}
            keyboardShouldPersistTaps="handled"
            overScrollMode="always"
          >
            <Text
              style={[s.text, s.boldFont]}
            >{`We welcome all questions, comments, tips, app feedback, and whatever else!`}</Text>
            <Text style={[s.subText]}>
              Is this location closed or are all the machines gone?{" "}
              <Text style={[s.pinkText, s.boldFont]}>No need to tell us!</Text>{" "}
              {`Please just remove the machines from the location, and we'll auto-delete the location within a week.`}
            </Text>
            <Text
              onPress={() => navigation.navigate("FAQ")}
              style={s.textLink}
            >{`Check the FAQ first for common questions.`}</Text>
            {!loggedIn ? (
              <View>
                <TextInput
                  style={[{ height: 40 }, s.textInput]}
                  underlineColorAndroid="transparent"
                  onChangeText={(name) => setName(name)}
                  returnKeyType="done"
                  placeholder={"Your name..."}
                  placeholderTextColor={theme.indigo4}
                  autoCorrect={false}
                />
                <TextInput
                  style={[{ height: 40 }, s.textInput]}
                  underlineColorAndroid="transparent"
                  onChangeText={(email) => setEmail(email)}
                  returnKeyType="done"
                  placeholder={"Your email..."}
                  placeholderTextColor={theme.indigo4}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            ) : null}
            <TextInput
              multiline={true}
              placeholder={
                "Include the NAME of the location you're writing about!"
              }
              placeholderTextColor={theme.indigo4}
              style={[{ padding: 5, height: 200 }, s.textInput]}
              onChangeText={(message) => setMessage(message)}
              textAlignVertical="top"
              underlineColorAndroid="transparent"
            />
            <PbmButton
              title={"Submit"}
              disabled={_disabled()}
              onPress={submit}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.base1,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      marginTop: 5,
      marginHorizontal: 5,
    },
    subText: {
      marginHorizontal: 5,
      marginTop: 15,
      fontSize: 14,
      fontFamily: "Nunito-Medium",
    },
    textInput: {
      backgroundColor: theme.white,
      borderColor: isThemeDark(theme.theme) ? theme.base4 : theme.indigo4,
      color: theme.text,
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      textAlign: "left",
      fontFamily: "Nunito-Regular",
      fontSize: 16,
    },
    boldFont: {
      fontFamily: "Nunito-Bold",
    },
    blackText: {
      color: theme.text,
    },
    pinkText: {
      color: theme.pink1,
    },
    textLink: {
      textDecorationLine: "underline",
      fontSize: 16,
      lineHeight: 22,
      marginTop: 15,
      textAlign: "center",
      fontFamily: "Nunito-Regular",
      color: theme.purple2,
    },
    confirmText: {
      textAlign: "center",
      marginLeft: 15,
      marginRight: 15,
      fontSize: 18,
      color: theme.purpleLight,
      fontFamily: "Nunito-Bold",
    },
    xButton: {
      position: "absolute",
      right: -20,
      top: -20,
      color: theme.red2,
    },
  });

Contact.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  submitMessage: PropTypes.func,
  clearMessage: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  submitMessage: (state) => dispatch(submitMessage(state)),
  clearMessage: () => dispatch(clearMessage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
