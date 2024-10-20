import React, { useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import Post from '../components/Post';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const mockPosts = [
  {
    id: '1',
    title: 'HAMBURGER 😋',
    content: 'Who doesn\'t love a good hamburger? I made this 3D model of a hamburger for a college assigment, and I' +
      ' was so proud of it that I wanted to share it here. I know that this isn\'t much, but I\'m still a beginner at' +
      ' this, so please go easy on me :)',
    model: require('../assets/Hamburger.obj')
  },
  {
    id: '2',
    title: 'Environment modeling for games',
    content: 'Hi everyone!\n\nAs an experienced level designer that has worked in countless triple-A games, I have ' +
      'noticed that lately not enough attention is given to environment modeling in indie titles. That is why I ' +
      'decided to prepare a tutorial/guide detailing what to pay attention to while designing your environment props.' +
      '\n\nRead here: https://medium.com/environment-modeling-for-games-77672e86876b',
  },
  {
    id: '3',
    title: 'Detailed male human model',
    content: 'I am developing an educational app focused on the human anatomy, mainly targeting med students. I found ' +
      'this male human model online, but it is lacking some crucial anatomical features. Can anybody revise it so it ' +
      'is more anatomically accurate? Thanks!',
    model: require('../assets/FinalBaseMesh.obj')
  },
  {
    id: '4',
    title: 'Thoughts on 3D printing',
    content: "I’ve recently embarked on a journey into the world of 3D printing, and it has been nothing short of exhilarating! After months of designing models in software like Blender and Tinkercad, I decided it was time to bring my digital creations into the physical world.\n\n" +
      "One of the first challenges I faced was selecting the right 3D printer. With so many options on the market, I had to consider factors such as print quality, material compatibility, and budget. After thorough research, I settled on a resin printer for its ability to produce highly detailed prints. However, working with resin requires a different approach compared to filament-based printing, which has its own set of challenges.\n\n" +
      "Once I started printing, I quickly realized that preparing the models for print is just as crucial as the design itself. I encountered issues like warping and failed prints due to improper supports. I spent time learning about the importance of orientation and support structures. Now, I always ensure that my models are properly oriented and have sufficient supports to avoid any mishaps during the printing process.\n\n" +
      "Another hurdle was post-processing. After printing, cleaning and curing the models can be tedious. I experimented with different cleaning solutions and curing methods, which allowed me to achieve a smooth finish on my pieces. I also learned the importance of safety precautions when handling resin, such as wearing gloves and working in a well-ventilated area.\n\n" +
      "I am thrilled with the results so far! Some of my favorite prints include intricate figurines and functional prototypes. I’ve also started sharing my experiences on social media, and the feedback has been overwhelmingly positive. I’d love to hear your thoughts on 3D printing. What challenges have you faced in your printing journey? Any tips you’d recommend for beginners?",

  },
];

export default function FeedScreen() {
  const flatListRef = useRef(null);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };


  return (
    <View style={styles.body}>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={mockPosts}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.content}
              model={item.model}
              disableScroll={disableScroll}
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
    padding: '3%',
  },
});
