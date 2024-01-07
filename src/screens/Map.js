import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import axios from "axios";
import { Marker } from "react-native-maps";
export const Map = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://eonet.gsfc.nasa.gov/api/v2.1/events`)
      .then((res) => {
        setEvents(res.data.events);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text>Yükleniyor...</Text>
        </View>
      ) : (
        <MapView
          initialRegion={{
            latitude: 41.012502,
            longitude: 28.892812,
            latitudeDelta: 8,
            longitudeDelta: 8,
          }}
          style={{ height: "100%" }}
        >
          {events.map((item) => {
            if (item.categories[0].title == "Wildfires") {
              return (
                <Marker
                  opacity={0.9}
                  title={item.title}
                  description={item.description}
                  coordinate={{
                    latitude: item.geometries[0].coordinates[1],
                    longitude: item.geometries[0].coordinates[0],
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20 }}>🔥</Text>
                  </View>
                </Marker>
              );
            }
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
