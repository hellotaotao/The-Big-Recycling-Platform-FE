import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect} from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Screen} from "react-native-screens";
import config from '../config';
import {RootTabScreenProps} from "../types";

type TipType = {
  title: string;
  fields: {
    title: string;
    content: object;
    featuredImage: string;
  };
}

// const Item = ({route}: RootTabScreenProps<'Details'>) => {
//   const {tip}: { tip: TipType } = route.params;
//   return <View style={styles.item}>
//     <Button title={tip.fields.title} onPress={() => navigation.navigate('Details', {tip: tip})}/>
//   </View>
// };

function TipsListScreen({navigation}: RootTabScreenProps<'TabTips'>) {
  const [tips, setTips] = React.useState<TipType[]>();
  useEffect(() => {
    console.log('fetching tips');
    fetch(config.cmsUrlBase + '/entries?access_token=' + config.cmsAccessToken + "&content_type=tips")
      .then(response => response.json())
      .then(
        (data) => {
          console.log(data.items)
          setTips(data.items)
        });
  }, []);

  // const renderItem = (item: any) => <Item route={item}/>;


  return (
    <View style={styles.container}>
      {tips && tips.map((tip, index) => {
        // return <Text key={index}>{tip.fields.title}</Text>
        return <Button title={tip.fields.title} onPress={() => navigation.navigate('Details', {tip: tip})}/>
      })}
    </View>
    // <SafeAreaView style={styles.container}>
    //   <FlatList data={tips} renderItem={renderItem} keyExtractor={item => item.title}/>
    // </SafeAreaView>
  );
}

function TipDetailsScreen({route, navigation}: RootTabScreenProps<'Details'>) {
  const {tip}: { tip: TipType } = route.params;
  console.log(tip);
  return (
    <View style={styles.container}>
      <Button title={'< Back'} onPress={() => navigation.goBack()}/>

      <Text>{tip.fields.content.toString()}</Text>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function TabTipsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TipsListScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Details" component={TipDetailsScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default TabTipsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cef5c6',
  },
  item: {fontSize: 18, marginTop: 4},
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
});
