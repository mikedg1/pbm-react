import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../theme-context";
import { Screen, Text } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { isThemeDark } from "../utils/themes";

const FAQ = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const s = getStyles(theme);

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={s.background}>
      <Screen>
        <View style={s.container}>
          <View style={s.child}>
            <Text style={s.text}>
              {`\nThis page contains helpful app and website support information. If you have a question, comment, or suggestion, `}
              <Text
                onPress={() => navigation.navigate("Contact")}
                style={s.textLink}
              >
                {"contact us"}
              </Text>
              {`.`}
            </Text>
            <Text style={s.category}>Mobile App-Specific</Text>
            <Text
              style={s.bold}
            >{`How do I search for a particular machine?`}</Text>
            <Text style={s.text}>
              {`When you're on the map screen, click the `}
              <Entypo
                name="sound-mix"
                size={16}
                style={s.filterIcon}
                onPress={() => navigation.navigate("FilterMap")}
              />
              <Text
                style={s.textLink}
                onPress={() => navigation.navigate("FilterMap")}
              >
                {` filter`}
              </Text>
              {` button in the upper right, then choose a machine. Then go back to the map and it will only show places with that machine. When the map is filtered, you can zoom further out.`}
            </Text>
            <Text
              style={s.bold}
            >{`The Location List isn't showing a location that I think it should.`}</Text>
            <Text
              style={s.text}
            >{`The Location List lists what is currently shown on the map. If you pan/zoom the map, it will list different things.`}</Text>
            <Text
              style={s.bold}
            >{`I get an error every time I try to add a machine or comment or do anything.`}</Text>
            <Text style={s.text}>
              {`You probably haven't confirmed your account. You should have received an email (check your spam!). `}
              <Text
                style={s.textLink}
                onPress={() => navigation.navigate("ResendConfirmation")}
              >
                {"Or go here to have it resent"}
              </Text>
              {`.`}
            </Text>
            <Text
              style={s.bold}
            >{`How can I submit a backglass photo to the “machine details” screen?`}</Text>
            <Text style={s.text}>
              The photos we display come from the Open Pinball Database (OPDB),
              and so you should upload your high quality photo using{" "}
              <Text
                style={s.textLink}
                onPress={() =>
                  WebBrowser.openBrowserAsync("https://opdb.org/images/create")
                }
              >
                this form
              </Text>{" "}
              (you must first create an OPDB account). The photos you upload
              will not immediately appear in this app.
            </Text>
            <Text style={s.text}>
              <Text style={{ fontFamily: "Nunito-Bold" }}>
                General backglass/translite photo guidelines
              </Text>
              : Take photo straight on, not at an angle. Crop image to show only
              artwork. Avoid glare, if possible
            </Text>
            <Text style={s.category}>Updating the Map</Text>
            <Text
              style={s.bold}
            >{`How do I add a machine to a location?`}</Text>
            <Text
              style={s.text}
            >{`First, log in. Then lookup the location and click the + (plus) icon. Then select a machine and add it.`}</Text>
            <Text
              style={s.bold}
            >{`How do I remove a machine from a location?`}</Text>
            <Text
              style={s.text}
            >{`First, log in. Click on the machine name, and then look for the "remove" button or the trash can icon.`}</Text>
            <Text style={s.bold}>{`How do I add a new location?`}</Text>
            <Text style={s.text}>
              {`Fill out `}
              <Text
                onPress={() => navigation.navigate("SuggestLocation")}
                style={s.textLink}
              >
                {"this form"}
              </Text>
              {` (or go to the menu icon in the lower right of the map screen and choose "Submit Location"). Our administrators moderate submissions, so please allow 0 - 7 days or so for it to be approved. The more accurate and thorough your submission, the quicker it will get added!`}
            </Text>
            <Text
              style={s.bold}
            >{`This location closed/no longer has machines. What do I do - do I need to tell you?`}</Text>
            <Text
              style={s.text}
            >{`Simply remove all the machines from it. Empty locations are periodically removed.`}</Text>
            <Text
              style={s.bold}
            >{`This location is temporarily closed. Should I remove the machines from it?`}</Text>
            <Text
              style={s.text}
            >{`No. If a place is seasonal or closed due to restrictions, and is expected to re-open, please do not remove the machines from it. Just edit the location description to say it's temporarily closed. You can also make sure the phone number is listed so that people can easily call and check on the status.`}</Text>
            <Text
              style={s.bold}
            >{`The location name has changed. Can I change it?`}</Text>
            <Text style={s.text}>
              {`Only administrators can edit location names. Please `}
              <Text
                onPress={() => navigation.navigate("Contact")}
                style={s.textLink}
              >
                {"contact us"}
              </Text>
              {`, and make sure to tell us the name of the location.`}
            </Text>
            <Text
              style={s.bold}
            >{`This location has moved. Should I add a location description that no administrator will ever see? Or should I remove the machines from it and re-submit?`}</Text>
            <Text style={s.text}>
              {`Neither! Administrators can change the address. Please `}
              <Text
                onPress={() => navigation.navigate("Contact")}
                style={s.textLink}
              >
                {"contact us"}
              </Text>
              {`, and make sure to tell us the name of the location that has moved. It's preferable for us to simply change the address because that retains the location history.`}
            </Text>
            <Text style={s.category}>Data Usage</Text>
            <Text
              style={s.bold}
            >{`Can I use Pinball Map data on my own site?`}</Text>
            <Text style={s.text}>
              {`You can use our public API to fetch data and use it for your app. When using Pinball Map data, according to our data license you must include attribution and a link back to this site. If you need bulk data for a project, please get in touch. We have collaborated with many folks on their projects, from student projects to services by major pinball companies. Please do not just scrape large amounts of this site for your own arcade/pinball mapping site, with no attribution. Thousands of people have been contributing their time and effort to this site since 2008.`}
            </Text>
            <Text style={s.category}>Data Management</Text>
            <Text
              style={s.bold}
            >{`Can you include "bat games", or other non-pinball but pinball-adjacent games??`}</Text>
            <Text style={s.text}>
              No, no bat games. We fully understand that pitch and bat games
              resemble pinball machines and the collectors that collect them
              also usually collect pinball machines. We used to include bat
              games, but found that non-pinball machines like that were a
              slippery slope toward including more and more non-pinball
              machines. We only want to map pinball machines. In general, if the
              machine is not listed on{" "}
              <Text
                style={s.textLink}
                onPress={() => WebBrowser.openBrowserAsync("https://opdb.org")}
              >
                OPDB
              </Text>{" "}
              {`then we will not include it.\n\n`}
              {`We do include some pre-pinball flipperless games. Are we missing some?`}
            </Text>
            <Text
              style={s.bold}
            >{`Can I add my private collection to the map?`}</Text>
            <Text
              style={s.text}
            >{`No. Pinball Map only lists publicly-accessible locations. The definition of "public" varies - some places have entrance fees, or limited hours. But overall, the location has to be inclusive and accessible. So please don't submit your house or a private club that excludes people from becoming members. We also exclude short-term house rentals.`}</Text>
            <Text
              style={s.bold}
            >{`When I search for a city, the city is listed twice (and maybe the second instance of it is misspelled). Or, I see the same location listed twice. Or, the place is in the wrong spot on the map. Etc.`}</Text>
            <Text style={s.text}>
              {`These are data entry mistakes. Please `}
              <Text
                onPress={() => navigation.navigate("Contact")}
                style={s.textLink}
              >
                {"contact us"}
              </Text>
              {` so we can fix them.`}
            </Text>
            <Text
              style={s.bold}
            >{`I submitted a new location but it never showed up on the map. What is wrong with you?`}</Text>
            <Text style={s.text}>
              {`There are numerous reasons why a new location was not added to the map. Here are some:\n\n`}
              {`\u2022 Not enough time has passed. Please allow 0-7 days before a location is approved. Submissions go to different people, depending on where the location is in the world. And these people work at different paces. Reminder, we're all volunteers with the goal of having a very clean data set.\n\n`}

              {`\u2022 The location you submitted isn't open yet. Many locations are submitted by the business owners themselves (and people helping out those businesses), and we are honored that they think of us when they are prepping to launch their business. But guess who are also eager folks? Pinball players! So if a location gets added to the map before it's open to the world, people will drive all the way there, discover an un-opened business, and then... you guessed it! They then yell at us about it. It doesn't matter if there's a location description saying "Opens on May 5." People do not read (except you).\n\n`}

              {`\u2022 Your submission didn't utilize the "machine autocomplete". In the "machines" field of the submission form, you gotta start typing a machine name, and then select the correct machine from the list that pops up (note, this magically adds a comma after the machine name). When we approve the location, our system can correctly read the machine name, match it to a machine in our database, and successfully add it to the location. If instead you type in a machine name, then it's not formatted in a way that will match to the database. The end result is that we'll approve the location and the location will have zero machines (unless the admin happens to notice that the machine list is weird and then manually adds the machine after it's on the map), and then a week later the location will get auto-deleted from the map.\n\n`}

              {`\u2022 The location you submitted is a private residence. Or private in some other way.`}
            </Text>
            <Text style={s.category}>Operators</Text>
            <Text style={s.bold}>{`How do I get listed as an operator?`}</Text>
            <Text style={s.text}>
              {
                <Text
                  onPress={() => navigation.navigate("Contact")}
                  style={s.textLink}
                >
                  {"Contact us"}
                </Text>
              }
              {` and we'll add you. In your message, tell us the name of your business and whether you want to be notified via email when users leave comments on your machines. Once you tag all of your locations, you'll be able to quickly see all your locations using the "Filter".`}
            </Text>
            <Text
              style={s.bold}
            >{`How do I tag myself as the operator at a location?`}</Text>
            <Text
              style={s.text}
            >{`If you are in our system as an operator (if you're not, please see the question above), do this: log in with your user account, lookup the location, click the "location details" button and then the pencil edit icon. Choose your operator business from the list. Then save.`}</Text>
            <Text
              style={s.bold}
            >{`I'm an operator or business owner, and people are leaving comments on my machines that I don't like. Can you make them stop, or disable comments on my machines?`}</Text>
            <Text style={s.text}>
              {`The short answer is that we can't disable comments at an individual venue or for an individual user. We understand that users and operators tend to want conflicting things. Some operators find reports of technical issues to be very useful; and some do not. Some operators wish that folks would only leave "general" machine comments and not "specific" comments (we can't control this). On the other hand, most regular users find machine comments to be a very valuable feature. It is difficult to perfectly cater to everyone, and we cannot control the comments that people make.\n\n`}
              {`In some circumstances, comments may be removed and/or accounts can be disabled (see the next FAQ items). We will always look into your concerns. But please try not to waste our time with your requests.\n\n`}
              <Text style={{ fontFamily: "Nunito-Bold" }}>
                To users leaving comments:
              </Text>{" "}
              {`Most operators prefer you directly tell them about problems. For example, in person or with a note to staff at the venue. Many pinball issues are minor and temporary, and leaving a comment about them on the map puts it "on the record" and it may remain there long after the issue is resolved.\n\n`}
              <Text style={{ fontFamily: "Nunito-Bold" }}>To operators:</Text>{" "}
              {`A comment about a machine issue is not going to hurt your business in the short term. Pinball Map often gets blamed for "making" operators rush across town to fix and issue and write a comment saying the issue is fixed. Pinball Map does not make you do this.\n\n`}
              {`According to nearly everyone, it is really valuable to see a history of comments (thing is broken, thing is fixed, etc.). Everyone understands that machines break all the time. Seeing a dialog demonstrates that upkeep is occurring. The "latest comment" noting a problem is not particularly important to users and will not drive them away. Some operators choose to delete machines and re-add them in order to clear out comments rather than simply responding to a comment. This is bad practice - both for your business and for the map - and can result in your account being disabled. It makes it seem like the operator is whitewashing comments rather than fixing issues. Users definitely notice this, and we strongly discourage it.\n\n`}
              {`We regularly get messages from operators and owners demanding that a user be banned from leaving comments on their location. Most often, the comments in question are not slanderous, but have some sass or "off-topic" messages. These requests are a big headache for us, especially because they do not warrant any action toward the user. So please, help us! Be mindful that operators are very sensitive about the content on this site, and they take it out on us.`}
            </Text>
            <Text style={s.category}>Users</Text>
            <Text
              style={s.bold}
            >{`I see you have a ranking system for contributors. How do I earn a contributor badge and title?`}</Text>
            <Text
              style={s.text}
            >{`Great question! As a small token of acknowledgement of your contributions to the map, if you make more than 50 contributions, we christen you a "Super Mapper". After 250 contributions, you are a "Legendary Mapper". And after 500 amazing map contributions, you are a "Grand Champ Mapper"!`}</Text>
            <Text style={s.bold}>{`Can I change my username?`}</Text>
            <Text style={s.text}>
              {`Only administrators can change your username. `}
              <Text
                onPress={() => navigation.navigate("Contact")}
                style={s.textLink}
              >
                {"Contact us"}
              </Text>
              {` and we'll be happy to change it.`}
            </Text>
            <Text
              style={s.bold}
            >{`I can't remember my password. How do I reset it?`}</Text>
            <Text style={s.text}>
              {`You can reset it via`}{" "}
              <Text
                onPress={() => navigation.navigate("PasswordReset")}
                style={s.textLink}
              >
                {"this link"}
              </Text>
              .
            </Text>
            <Text
              style={s.bold}
            >{`How do I update my password, or email, or delete my account?`}</Text>
            <Text style={s.text}>
              {`These can be done on your`}{" "}
              <Text
                style={s.textLink}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://pinballmap.com/inspire_profile",
                  )
                }
              >
                Profile page on the website
              </Text>
              .
            </Text>
            <Text style={s.bold}>{`Why was my comment removed?`}</Text>
            <Text style={s.text}>
              {`Our administrators may deem your machine or location comment to be inappropriate because:\n\n`}

              {`\u2022 It contains a personal attack.\n\n`}

              {`\u2022 It isn't relevant (for example, promoting a tournament in a machine comment) or constructive.\n\n`}

              {`\u2022 It is offensive.`}
            </Text>
            <Text
              style={s.bold}
            >{`I left a machine comment, but I made a typo. Or, I just woke up and I regret a comment I made last night. Can I edit or delete my comment?`}</Text>
            <Text style={s.text}>
              {`Yes. Click the machine and below your comment you'll see "edit" and "delete" buttons.\n\n`}
              {`Note that recent/location activity feeds contain a log of the original machine comments. Those are public and cannot be edited or deleted (and kind of serve as a deterrent to people leaving troublesome comments that they intend to delete later).`}
            </Text>
            <Text style={s.bold}>{`Why was my account disabled?`}</Text>
            <Text style={s.text}>
              {`\u2022 If your account has been used to mess with data on the site, then we may disable it. Bad behavior includes, but is not limited to: removing machines that are at a location (or removing+adding to clear out comments); adding machines that are not at a location; leaving lots of inappropriate/abusive comments; or adding Slugfest over and over (see above).\n\n`}

              {`\u2022 You created a sockpuppet account to hype your location and/or disparage the competition. This is unethical and it makes the site worse. Don't do this. Look in the mirror.\n\n`}

              {`\u2022 You signed up with a disposable email account. We sometimes have legitimate reasons for contacting you individually. Disposable emails are most often used by people who abuse the site.`}
            </Text>
            <Text style={s.category}>Miscellaneous</Text>
            <Text style={s.bold}>{`Can you add a feature that I want?`}</Text>
            <Text style={s.text}>
              {`Maybe! We can try. Pinball Map is an open source app. You can submit "issues" to`}{" "}
              <Text
                style={s.textLink}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://github.com/pinballmap/pbm-react",
                  )
                }
              >{`the Github repository`}</Text>
              {`, and you can also directly contribute code.`}
            </Text>
            <Text style={s.bold}>{`What is your privacy policy?`}</Text>
            <Text style={s.text}>
              Please see the{" "}
              <Text
                style={s.textLink}
                onPress={() =>
                  WebBrowser.openBrowserAsync("https://pinballmap.com/privacy")
                }
              >
                detailed privacy policy on our website
              </Text>
              {`. The overview: We do not track or store user locations, nor store any personal information. We do not sell any user data. We do not use third-party analytics. This site is not monetized. We keep a log of map edits that users make.\n\nThis app uses Mapbox for the map, and while we set telemetry (`}
              <Text
                style={s.textLink}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://www.mapbox.com/telemetry/",
                  )
                }
              >
                which is used to improve their data, and not for ads
              </Text>
              {`) to be disabled by default, you can check and make sure it's off by clicking the (i) icon on the map.`}
            </Text>
          </View>
        </View>
      </Screen>
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.base1,
    },
    container: {
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      flex: 1,
    },
    child: {
      margin: "auto",
    },
    text: {
      fontSize: 16,
      color: theme.text2,
      lineHeight: 22,
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    bold: {
      fontFamily: "Nunito-Bold",
      fontSize: 17,
      marginBottom: 10,
      padding: 10,
      color: "#fef3e8",
      backgroundColor: "#4e3a52",
    },
    textLink: {
      textDecorationLine: "underline",
      color: isThemeDark(theme.theme) ? theme.pink3 : theme.pink1,
      fontFamily: "Nunito-Medium",
    },
    filterIcon: {
      color: isThemeDark(theme.theme) ? theme.pink3 : theme.pink1,
    },
    category: {
      fontFamily: "Nunito-Bold",
      fontSize: 17,
      textAlign: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#adc7fd",
      color: "#503d49",
      textTransform: "uppercase",
    },
  });

FAQ.propTypes = {
  navigation: PropTypes.object,
};

export default FAQ;
