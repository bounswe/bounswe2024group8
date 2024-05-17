import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
export default function Post(props) {
  const viewProfile = () => {
    props.profileFunction({"username":props.username, "profilePhoto": props.profilePic})
    console.log(props.username);
  };

  const sa = {
    pp1: require("../assets/dummy_pics/pp1.png"),
    pp2: require("../assets/dummy_pics/pp2.png"),
    image1: require("../assets/dummy_pics/image1.png"),
    image2: require("../assets/dummy_pics/image2.png"),
  };
  const [postLiked, changeLike] = useState(false);
  const [postDisliked, changeDislike] = useState(false);
  const [postBookmarked, changeBookmark] = useState(false);
  const getLikeCount = () => {
    return props.likes;
  };
  const getDislikeCount = () => {
    return props.dislikes;
  };
  const [likeCount, setLikeCount] = useState(getLikeCount());
  const [dislikeCount, setDislikeCount] = useState(getDislikeCount());
  const changeLikeCount = (change) => {
    setLikeCount(likeCount + change);
  };
  const changeDislikeCount = (change) => {
    setDislikeCount(dislikeCount + change);
  };

  const bookmarkClicked = () =>{
    changeBookmark(!postBookmarked);
  }

  const likeClicked = () => {
    if (postLiked) {
      changeLikeCount(-1);
      changeLike(false);
      return;
    }
    if (postDisliked) {
      changeDislikeCount(-1);
      changeDislike(false);
    }
    changeLikeCount(1);
    changeLike(true);
  };
  const dislikeClicked = () => {
    if (postDisliked) {
      changeDislikeCount(-1);
      changeDislike(false);
      return;
    }
    if (postLiked) {
      changeLikeCount(-1);
      changeLike(false);
    }
    changeDislikeCount(1);
    changeDislike(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={viewProfile}>
        <View style={styles.headerContainer}>
          <View style={styles.profilePicContainer}>
            <Image style={styles.profilePic} source={sa[props.profilePic]} />
          </View>
          <Text>{props.username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/icon.jpeg")} />
      </View>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.rowContainer} onPress={likeClicked}>
          <Image
            style={styles.interactionIcon}
            source={require("../assets/like.png")}
          />
          <Text style={postLiked && { color: "green" }}>
            {postLiked ? likeCount : "Like"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowContainer} onPress={dislikeClicked}>
          <Image
            style={styles.interactionIcon}
            source={require("../assets/dislike.png")}
          />
          <Text style={postDisliked && { color: "red" }}>
            {postDisliked ? dislikeCount : "Dislike"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={bookmarkClicked} style={styles.rowContainer}>
          <Image
            style={styles.interactionIcon}
            source={postBookmarked ? require("../assets/bookmarked.png"):  require("../assets/bookmark.png")}
          />
          <Text>Bookmark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "10%",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 35,
    width: "100%",
  },
  profilePicContainer: {
    height: "100%",
    width: "10%",
    marginRight: "2%",
  },
  profilePic: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 360,
  },
  imageContainer: {
    height: 300,
    width: "100%",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  text: {
    fontSize: 15,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    marginRight: 20,
  },
  interactionIcon: {
    width: "50%",
    height: "200%",
  },
});
