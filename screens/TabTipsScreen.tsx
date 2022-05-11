import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect} from 'react';
import {Text} from "react-native";
import {Screen} from "react-native-screens";

type TipType = {
  title: string;

}

function TipsListScreen() {
  const [tips, setTips] = React.useState([]);
  useEffect(() => {
    return () => {
      fetch('https://cdn.contentful.com/spaces/zuitqcuaniek/entries?access_token=h73H_6ZjimAfvPmndUqIyiFecuSu2el0XxwVCMX2MQM')
        .then(response => response.json())
        .then(
          (data) => {
            console.log(data)
            // data => setTips({totalReactPackages: data.total})
          });
    };
  }, []);

  return (
    <Screen>
      <Text>TipsListScreen</Text>
    </Screen>
  );
}

function TipsDetailsScreen(props) {
  return (
    <Screen>
      qwer
    </Screen>
  );
}


const Stack = createNativeStackNavigator();

function TabTipsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TipsListScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Details" component={TipsDetailsScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default TabTipsScreen;
