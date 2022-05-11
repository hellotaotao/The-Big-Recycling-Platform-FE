import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';

const HomeScreen = ({navigation}: RootTabScreenProps<'Home'>) => (
  <View style={styles.container}>
    <Text style={styles.title}>Thg Big Recycling App</Text>
    <Text>You can search by: </Text>
    <Text>1. Name of the product</Text>
    <Text>2. Name of material </Text>
    <Text>3. recycling icons...</Text>

    <TextInput style={styles.textInput} placeholder="Search"/>
    <Button title={"Go!"} onPress={() => navigation.navigate("Details", {
      itemId: 86,
      otherParam: 'anything you want here',
    })}/>
  </View>
)

const DetailsScreen = ({navigation, route}: RootTabScreenProps<'Details'>) => {
  const {itemId, otherParam} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
      <Button title="Go back" onPress={() => navigation.goBack()}/>
    </View>
  )
};


const Stack = createNativeStackNavigator();

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cef5c6',
  },
  title: {
    marginBottom: 80,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#238358',
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
