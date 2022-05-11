import {Button, StyleSheet, Dimensions, View} from 'react-native';
import MapView from 'react-native-maps';
import {Screen} from "react-native-screens";
import {RootTabScreenProps} from '../types';

export default function TabMapScreen({navigation}: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Screen>
        <MapView style={styles.map}/>
      </Screen>
      {/*<Button title="Go back" onPress={() => navigation.goBack()}/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
