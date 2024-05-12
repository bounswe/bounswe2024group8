import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
export default TagModal = ({ isVisible, closeModal, onSelectTags }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedButton, setButtonSelect] = useState(styles.box);

    const [teams, changeTeams] = useState([
        { label: "Adana Demirspor", value: "Adana Demirspor", selected: styles.box},
        { label: "Alanyaspor", value: "Alanyaspor", selected: styles.box},
        { label: "Ankaragucu", value: "Ankaragucu", selected: styles.box },
        { label: "Antalyaspor", value: "Antalyaspor", selected: styles.box },
        { label: "Basaksehir", value: "Basaksehir", selected: styles.box  },
        { label: "Besiktas", value: "Besiktas", selected: styles.box  },
        { label: "Fatih Karagumruk", value: "Fatih Karagumruk", selected: styles.box  },
        { label: "Fenerbahce", value: "Fenerbahce", selected: styles.box  },
        { label: "Galatasaray", value: "Galatasaray", selected: styles.box  },
        { label: "Gaziantep", value: "Gaziantep", selected: styles.box  },
        { label: "Hatayspor", value: "Hatayspor", selected: styles.box  },
        { label: "Istanbulspor", value: "Istanbulspor", selected: styles.box  },
        { label: "Kasimpasa", value: "Kasimpasa", selected: styles.box  },
        { label: "Kayserispor", value: "Kayserispor", selected: styles.box  },
        { label: "Konyaspor", value: "Konyaspor", selected: styles.box  },
        { label: "Pendikspor", value: "Pendikspor", selected: styles.box  },
        { label: "Rizespor", value: "Rizespor", selected: styles.box  },
        { label: "Samsunspor", value: "Samsunspor", selected: styles.box },
        { label: "Sivasspor", value: "Sivasspor", selected: styles.box  },
        { label: "Trabzonspor", value: "Trabzonspor", selected: styles.box }]);
    
    const selectColor = (option) =>{
        for (let i=0; i<teams.length; i++){
            if (option == teams[i].value){
                let updatedA = [...teams.slice(0, i), {label: teams[i].label, value: teams[i].value,selected: styles.selectedBox}, ...teams.slice(i+1)];
                changeTeams(updatedA);
                return;
            }
        }
    }

    const unSelectColor = (option) =>{
        for (let i=0; i<teams.length; i++){
            if (option == teams[i].value){
                let updatedA = [...teams.slice(0, i), {label: teams[i].label, value: teams[i].value,selected: styles.box}, ...teams.slice(i+1)];
                changeTeams(updatedA);
                return;
            }
        }
    }

    const toggleOption = (option) => {
        const isSelected = selectedOptions.includes(option);
        if (isSelected) {
          unSelectColor(option);  
          setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            selectColor(option);
          setSelectedOptions([...selectedOptions, option]);
        }
      };
      const saveExit = () => {
        onSelectTags(selectedOptions);
        closeModal();
      }

      const exitModal = () =>{
        for (let i = 0; i < teams.length; i++) {
            const element = teams[i];
            element.selected = styles.box;
        }
        setSelectedOptions([]);
      }
    
      return(
        <Modal isVisible={isVisible} onBackdropPress={closeModal}>
            <View style={{ backgroundColor: 'white', padding : 20,width: "95%", height: "80%"}}>
                <View style={{flexDirection:'row', marginBottom: "10%"}}>
                    <TouchableOpacity style={{marginRight: "50%"}} onPress={exitModal}>
                        <Text style={{fontSize: 20}}>Unselect All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={saveExit}>
                        <Text style={{fontSize: 20}}>Done</Text>                    
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 18}}>Select Tags: </Text>
                <FlatList 
                    data={teams} 
                    renderItem={
                        ({item}) => (
                            <View>
                                <TouchableOpacity style={item.selected} onPress={() => toggleOption(item.value)}>
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                />
            </View>            
        </Modal>
      )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2, 
        borderColor: 'black', 
        marginBottom: "5%",
      },
    selectedBox:{
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2, 
        borderColor: 'black', 
        marginBottom: "5%",
      },
}
)