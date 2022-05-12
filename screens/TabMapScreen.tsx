import * as WebBrowser from "expo-web-browser";
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {RootTabScreenProps} from '../types';

type marker = {
  coordinate: {
    latitude: number;
    longitude: number;
  }
  title: string;
  url?: string;
};
const markers: marker[] = [
  {
    coordinate: {
      latitude: -34.914703,
      longitude: 138.624125,
    },
    title: "Scout Recycling Centre",
    url: "https://scoutrecycling.com.au",
  },
  {
    coordinate: {
      latitude: -34.956862,
      longitude: 138.536469,
    },
    title: "Adelaide Waste and Recycling Centre",
    url: "http://www.adelaidewasteandrecyclingcentre.com.au/",
  },
  {
    coordinate: {
      latitude: -34.992807,
      longitude: 138.571682,
    },
    title: "Daws Road Recycling Centre",
    url: "http://www.recyclingsa.com.au/",
  },
  {
    coordinate: {
      latitude: -31.957823,
      longitude: 115.791876,
    },
    title: "West Metro Recycling Centre",
    url: "http://www.wmrc.wa.gov.au/",
  },
  {
    coordinate: {
      latitude: -27.480385,
      longitude: 153.140763,
    },
    title: "Containers For Change - TOMRA Recycling Centre Tingalpa",
    url: "https://mytomra.com.au/qld-locations/tingalpa/",
  },
  {
    coordinate: {
      latitude: 51.475267,
      longitude: -0.274816,
    },
    title: "Townmead Road Re-use and Recycling Centre",
    url: "https://richmond.gov.uk",
  },
]

export default function TabMapScreen({navigation}: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => {
              marker.url && WebBrowser.openBrowserAsync(marker.url)
            }}
          />
        ))}
      </MapView>
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
