import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView, Dimensions ,Button, Alert} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../core/theme'
import { Select, NativeBaseProvider } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../api.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function StatusUpdateScreen({ navigation, route }) {
    const { data } = route.params;
    
    let [stats, setStatus] = React.useState("");
    const createAlertUpdate = () =>
        Alert.alert(
            '',
            'Status Updated'
        );
    
    const updateStatus = async () => {
        console.log(stats)
        if (stats.length <= 0) {
            Alert.alert(
                '',
                'Please Choose A Status!'
            )
            return
        }
        await axios.post('/updateStatus', {
            passport: data.passport,
            status : stats
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        createAlertUpdate()

        if (navigation.canGoBack()) {
            navigation.goBack();
        }

    }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subheader}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            }
                        }
                        }>
                            <Icon
                                name='chevron-back-outline'
                                style={styles.back}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 4 }}>
                            <Text style={styles.statusUpdate}>
                                Status Update
                            </Text>
                        </View>

                    </View>

                </View>
                <View style={styles.content}>
                    <View style = {styles.statusBox}>
                        <Text style={{ color: 'white', fontSize: 15 }}> Select Status Update: </Text>
                        <Select selectedValue={stats} 
                            placeholder="Update Your Status Condition"
                            onValueChange={itemValue => setStatus(itemValue)}
                            backgroundColor = "white"
                            marginTop={1}
                        >
                           
                            <Select.Item label="Low Risk" value="0" />
                            <Select.Item label="High Risk" value="1" />
                        </Select>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }} onPress={updateStatus}>
                            <Text style = {{color : 'white', fontSize : 15}}>Update</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </View>
        </NativeBaseProvider>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

    },
    header: {
        flex: 0.9,
        color: 'red',
        backgroundColor: '#3983fe',
        width: "100%",
        flexDirection: 'row',

    },

    content: {
        flex: 8,
    },
    subheader: {
        flex: 1,
        width: "100%",
        marginTop: getStatusBarHeight() - 2,
        flexDirection: 'row',
    },
    back: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    statusUpdate: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        marginRight: '5%',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    perItem: {
        backgroundColor: 'white',
        height: windowHeight / 10,
        marginTop: 10,
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10
    },
    statusBox: {
        backgroundColor: '#3983fe',
        width: '90%',
        height: 150,
        margin: '5%',
        padding : '3%',
    }



})
