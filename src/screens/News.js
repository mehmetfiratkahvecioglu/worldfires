import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";

export const News = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.worldnewsapi.com/search-news?text=forest%20fire&api-key=86d73d1944ed4adc9b587064b5d2efb3&number=30"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const NewsItem = ({ title, image }) => (
    <View style={styles.item}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  console.log(data);
  return (
    <View>
      <FlatList
        data={data.news}
        renderItem={({ item }) => (
          <NewsItem title={item.title} image={item?.image} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
//https://api.worldnewsapi.com/search-news?text=forest%20fire&api-key=86d73d1944ed4adc9b587064b5d2efb3&number=10

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
  },
});
