import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import config from '../config';
import Colors from "../constants/Colors";
import {RootTabScreenProps} from "../types";

type TipType = {
  title: string;
  fields: {
    title: string;
    content: object;
    featuredImage: string;
    url: string;
  };
}

function TipsListScreen({navigation}: RootTabScreenProps<'TabTips'>) {
  const [tips, setTips] = React.useState<TipType[]>();
  useEffect(() => {
    fetch(config.cmsUrlBase + '/entries?access_token=' + config.cmsAccessToken + "&content_type=tips")
      .then(response => response.json())
      .then(
        (data) => {
          setTips(data.items)
        });
  }, []);


  return (
    <SafeAreaView style={styles.listView_container}>
      <ScrollView>
        {tips && tips.map((tip, index) => {
          return (
            <TouchableOpacity key={tip.fields.title + index} onPress={() => handleHelpPress(tip.fields.url)}
                              style={styles.helpLink}>
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                {tip.fields.title}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function handleHelpPress(url: string) {
  WebBrowser.openBrowserAsync(url
    // 'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const Stack = createNativeStackNavigator();

function TabTipsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TipsListScreen} options={{headerShown: false}}/>
      {/*<Stack.Screen name="Details" component={TipDetailsScreen} options={{headerShown: false}}/>*/}
    </Stack.Navigator>
  );
}

export default TabTipsScreen;

const styles = StyleSheet.create({
  listView_container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#cef5c6',
  },
  detailsView_container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#cef5c6',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    marginTop: 20,
    padding: 15,
    fontSize: 25,
    minWidth: "60%",
    backgroundColor: 'white',
    borderWidth: 1
  },
  helpLink: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
    width: "100%"
  },
  helpLinkText: {
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
  },
});
