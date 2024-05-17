import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
const CommunityHeader = (props) => {
  //const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const Community = props;
  console.log(props.image, "sa");
  /*function handleOnFollow() {
        if (isFollowing){
            setIsFollowing(false);
        }
        else{
            setIsFollowing(true);
        }
    }*/

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.year}</Text>
      </View>
    </View>
  );
};

export default CommunityHeader;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 0.25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    height: 100,
    width: "100%",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  text: {
    width: "100%",
    fontSize: 25,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
