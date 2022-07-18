import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, SafeAreaView, Dimensions } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/LogoSmall'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import TouchButton from '../components/TouchButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../core/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserHistory({ navigation, route }) {
    const { data } = route.params;
    

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style = {styles.subheader}>
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
                    <View style = {{flex : 4}}>
                        <Text style = {styles.history}>
                            History
                        </Text>    
                    </View>
                    
                </View>
                    
            </View>
            <View style={styles.content}>
            {
                data.length == 0 ?  (
                    <Text > NO DATA</Text>
            ) :
             (
            

                <FlatList

                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>

                        <View>

                            <View style={styles.perItem}>
                                <Icon
                                    name='folder-outline'
                                    style={{ fontSize: 40, flex: 1, alignSelf: 'center', marginLeft: 15 }}
                                />
                                <View style={{ flex: 6, justifyContent: 'center' }}>
                                    <Text style={styles.perText}>
                                        Check-in at {item.place}
                                    </Text>
                                    <Text style={styles.timeText}>
                                        at Time {moment(item.time).utcOffset("+08:00").format('dddd, DD-MM-YYYY, HH:mm')}
                                    </Text>
                                    <Text style = {styles.eyeText}>
                                        Eye Condition : {item.eyestatus}
                                    </Text>
                                </View>

                            </View>

                        </View>

                    }



                />

            
            )
            }
            </View>

        </View>
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
        marginTop: getStatusBarHeight()-2,
        flexDirection: 'row',
    },
    back: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    history: { 
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
        borderRadius : 10
    },
    perText: {
        marginLeft : 3,
        color: 'black',
        fontSize: 22,
    },
    eyeText: {
        marginLeft: 3,
        color: 'black',
        fontSize: 15,
    },
    timeText: {
        marginLeft: 3,
        color: 'black',
        fontSize: 15,
    }

    

})
