import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import CommunityHeader from "../components/CommunityHeader";
import Post from "../components/Post";
import { VITE_API_URL } from "@env";
import axios from "axios";

export default function Community({ navigation, route }) {
  const [communityName, setCommunityName] = useState("");
  const [communityYear, setCommunityYear] = useState("");
  const [communityImage, setCommunityImage] = useState("");

  const getPosts = () => {
    return [
      {
        id: 1,
        profilePic: "pp1",
        username: "Can Öztemiz",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "Sizce Fenerbahçe'nin Trabzonspor karşısındaki hücum hattı nasıl olmalı?",
        imageUrl: "image1",
        likes: 278,
        dislikes: 12,
        commentsCount: 124,
      },
      {
        id: 2,
        profilePic: "pp2",
        username: "GalaGala123",
        community: "Galatasaray",
        communityLink: "galatasaraylink",
        text: "Icardi'nin bugünkü performansı çok iyi değil miydi?",
        imageUrl: "image2",
        likes: 543,
        dislikes: 23,
        commentsCount: 87,
      },
      {
        id: 3,
        profilePic: "image1",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
      {
        id: 4,
        profilePic: "image2",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
      {
        id: 5,
        profilePic: "pp1",
        username: "jane_doe",
        community: "Fenerbahçe",
        communityLink: "fenerbahcelink",
        text: "This is the second sample post",
        imageUrl: "https://example.com/sampleimage2.jpg",
        likes: 15,
        dislikes: 3,
        commentsCount: 8,
      },
    ];
  };

  const Communities = {
    TRABZONSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/bs/c/cb/Trabzonspor_%28grb%29.png",
      name: "TRABZONSPOR COMMUNITY",
      year: "1907",
    },
    ADANADEMIRSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/5/5f/Adanademirspor.png/400px-Adanademirspor.png",
      name: "ADANA DEMİRSPOR COMMUNITY",
      year: "1907",
    },
    ALANYASPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/2/29/Alanyaspor_logo.png/400px-Alanyaspor_logo.png",
      name: "ALANYASPOR COMMUNITY",
      year: "1907",
    },
    ANTALYASPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/b/b9/Antalyaspor_logo.png/400px-Antalyaspor_logo.png",
      name: "ANTALYASPOR COMMUNITY",
      year: "1907",
    },
    BESIKTAS: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Logo_of_Be%C5%9Fikta%C5%9F_JK.svg/1200px-Logo_of_Be%C5%9Fikta%C5%9F_JK.svg.png",
      name: "BEŞİKTAŞ COMMUNITY",
      year: "1903",
    },
    RIZESPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/f/f6/%C3%87aykur_Rizespor_Logo.png/400px-%C3%87aykur_Rizespor_Logo.png",
      name: "ÇAYKUR RİZESPOR COMMUNITY",
      year: "1907",
    },
    KARAGUMRUK: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/9/90/Fatihkaragumruk.png/400px-Fatihkaragumruk.png",
      name: "FATİH KARAGÜMRÜK COMMUNITY",
      year: "1907",
    },
    FENERBAHCE: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png",
      name: "FENERBAHÇE COMMUNITY",
      year: "1907",
    },
    GALATASARAY: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Galatasaray_Sports_Club_Logo.svg/1200px-Galatasaray_Sports_Club_Logo.svg.png",
      name: "GALATASARAY COMMUNITY",
      year: "1905",
    },
    GAZIANTEP: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/GFK-Logo.png/400px-GFK-Logo.png",
      name: "GAZIANTEP FK COMMUNITY",
      year: "1905",
    },
    HATAYSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/0/08/Hatayspor.png/400px-Hatayspor.png",
      name: "HATAYSPOR COMMUNITY",
      year: "1905",
    },
    BASAKSEHIR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/c/cd/%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK.png",
      name: "BAŞAKŞEHİR COMMUNITY",
      year: "1905",
    },
    ISTANBULSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/e/ed/IstanbulsporAS.png/400px-IstanbulsporAS.png",
      name: "İSTANBULSPOR COMMUNITY",
      year: "1905",
    },
    KASIMPASA: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/6/68/Kasimpasa_2012.png",
      name: "KASIMPAŞA COMMUNITY",
      year: "1905",
    },
    KAYSERISPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/c/c2/Kayserispor_logosu.png/400px-Kayserispor_logosu.png",
      name: "KAYSERİSPOR COMMUNITY",
      year: "1905",
    },
    KONYASPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/4/41/Konyaspor_1922.png",
      name: "KONYASPOR COMMUNITY",
      year: "1905",
    },
    ANKARAGUCU: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/9/97/MKE_Ankarag%C3%BCc%C3%BC_logo.png/400px-MKE_Ankarag%C3%BCc%C3%BC_logo.png",
      name: "MKE ANKARAGÜCÜ COMMUNITY",
      year: "1905",
    },
    PENDIKSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/2/2e/Pendikspor.png/400px-Pendikspor.png",
      name: "PENDİKSPOR COMMUNITY",
      year: "1905",
    },
    SAMSUNSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/d/dc/Samsunspor_logo_2.png/400px-Samsunspor_logo_2.png",
      name: "SAMSUNSPOR COMMUNITY",
      year: "1905",
    },
    SIVASSPOR: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/tr/thumb/8/80/Sivasspor.png/400px-Sivasspor.png",
      name: "SİVASSPOR COMMUNITY",
      year: "1905",
    },
  };

  axios
    .get(`${VITE_API_URL}/api/v1/users?email=` + route.params.email, {
      headers: {
        Authorization: `Bearer ${route.params.authToken}`,
      },
    })
    .then((response) => {
      setCommunityName(Communities[response.data.community.name].name);
      setCommunityYear(Communities[response.data.community.name].year);
      setCommunityImage(Communities[response.data.community.name].imageUrl);

      console.log(communityName);
      console.log(communityYear);
      console.log(communityImage);
    })
    .catch((error) => {
      console.log(error);
    });

  const goToProfile = (attrs) => {
    navigation.navigate("ProfileScreen", { profile: attrs });
  };

  return (
    <View style={styles.backgroundContainer}>
      <View>
        <CommunityHeader
          image={communityImage}
          name={communityName}
          year={communityYear}
        />
      </View>
      <FlatList
        data={getPosts()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PostScreen", { item: item });
            }}
          >
            <Post
              username={item.username}
              profilePic={item.profilePic}
              text={item.text}
              likes={item.likes}
              dislikes={item.dislikes}
              profileFunction={goToProfile}
            ></Post>
          </TouchableOpacity>
        )}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: Math.round(Dimensions.get("window").height),
  },
  communityHeaderContainer: {
    marginTop: 10,
  },
  flatList: {
    width: "90%",
    marginTop: "5%",
  },
});
