import {BarCodeScanner} from 'expo-barcode-scanner';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootTabScreenProps} from "../types";

const ProductScreen = ({navigation, route}: RootTabScreenProps<'Product'>) => {
  <View>

  </View>
}

export default function TabThreeScreen({navigation}: RootTabScreenProps<'TabThree'>) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}: { type: any, data: any }) => {
    setScanned(true);
    navigation.navigate('ProductScreen', {barCode: data});
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
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
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
