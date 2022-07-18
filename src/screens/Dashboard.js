import React, { useState , useEffect}  from 'react'
import { StyleSheet , View, Text, Image, Button, Touchable} from 'react-native'
import Background from '../components/Background'
import Logo from '../components/LogoSmall'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import TouchButton from '../components/TouchButton'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import axios from '../../api.js'
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../core/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function Dashboard({ navigation, route }) {
  var { user } = route.params;
  const [active, setActive] = useState({ value: '', error: '' })
  const [refreshing, setRefreshing] = React.useState(false)
  var temp
  const [value, setValue] = useState();


  
  const updateStatus = async () => {
    navigation.navigate({
      name: 'StatusUpdateScreen',
      params: { data: user }
    })
  }
  // React.useEffect(() => {
  //   setActive({ ...active, value: user })
  // })
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {

      await axios.post('/getMe', {
        id: user.id
      }).then(function (response) {
        console.log(response.data);
        temp = response.data
        user = temp
        setActive({ ...active, value: user })
      })
        .catch(function (error) {
          console.log(error);
        });

      
      setRefreshing(false)
    } catch (error) {
      console.error(error);
      setRefreshing(false)
    }



  }, [refreshing]);
  const OnHistoryClick = async () => {

    //get user history here
    
    await axios.post('/getuserhistory', {
      passport : user.passport
    }).then(function (response) {
      console.log(response.data);
      temp = response.data;
      console.log(temp)
    })
      .catch(function (error) {
        console.log(error);
      });

    navigation.navigate({
      name: 'UserHistory',
      params: { data: temp}
    })
  }
  return (
    <View style= {styles.container}>
      <View style={styles.header}>
        <View style={styles.subheader}>
          
          <TouchButton style={styles.refresh} onPress={onRefresh}>
            <Icon
              name='refresh-outline'
              style={{fontSize: 16}}
            />
            Refresh Status
          </TouchButton>
          <TouchButton style={styles.close} onPress={() => navigation.reset({ index: 0, routes: [{ name: "LoginScreen"}]})}>
            Logout
          </TouchButton>
        </View>
        <View style = {styles.headercontent}>
          <Logo />
          <Text style = {styles.headerName}>
            {user.name}
          </Text>
          <View style = {{flexDirection : 'row', justifyContent : 'center'}}>
            <Text style = {styles.headerPassport}>
              {user.passport}
            </Text>
            <View style={ styles.verified }>
              <Text style={[styles.VerifiedText, {marginLeft : 5}]}>Verified</Text>
              <Icon name="checkmark-circle" style={styles.checkmark} />
            </View>
          </View>     
        </View>
        
        
      </View>
      <View style = {styles.content}>
        <TouchableOpacity style={[styles.box, { backgroundColor: '#61b4ec' }]} onPress={updateStatus}>
          <View style={{  flex : 3}}>
            <Image source={require('../assets/virus.png')} style={[styles.image]} />
          </View>
          <View style={{ flex: 8, justifyContent : "center" }}>
            <Text style={[styles.status, {fontSize: 16}]}>
              Covid-19 Risk Status
            </Text>
            <Text style={[styles.status, { fontWeight: "bold" }]}>
              {
                active.value === "" ?
                    user.status == 0 ?

                      "Low Risk No Symptom"

                      :

                      "High Risk" 
                :
                  active.value.status == 0 ?
                    "Low Risk No Symptom"

                    :

                    "High Risk"
              }
             
            </Text>
          </View>
          <View style={{  flex: 2 }}>
            <Text style = {styles.help}>
              Help
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.box, { backgroundColor: '#fdd774' }]}>
          <View style={{ flex: 3 }}>
            <Image source={require('../assets/vaccine.png')} style={styles.image} />
          </View>
          <View style={{ flex: 8 , justifyContent : "center" }}>
            <Text style={[styles.vaccine, { fontSize: 16 }]}>
              Covid-19 Vaccination Status
            </Text>
            <Text style = {[styles.vaccine, {fontWeight : "bold"}]}>
              Fully Vaccinated
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: "right" }}>
              Help
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={OnHistoryClick} style = {styles.history}>
          <Text style = {{fontWeight : 'bold'}}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.footer}>
        <TouchableOpacity style={ styles.checkinButton}>
          <Text style = {styles.checkin}>
            Check-in
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    flex: 2,
    color: 'red',
    backgroundColor: '#3983fe',
    width: "100%",

  },
  subheader: {
    flex: 1,
    width: "100%",
    height: getStatusBarHeight(),
    flexDirection : 'row',
  },
  headercontent: {
    flex: 2,
    width: "100%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex : 6,
  },
  footer : {
    flex: 0.7,
    backgroundColor : "white"
  },
  checkin: {
    color: "white",
    fontSize: 15,
    fontWeight : 'bold'
  },
  container: {
    flex: 1,
    width: '100%',
  },
  refresh: {
    position: "absolute",
    top:  getStatusBarHeight(),
    left: 4,
  },
  close: {
    position: "absolute",
    top: getStatusBarHeight(),
    right: 4,
  },
  box: {
    width: "95%",
    height: 80,
    borderRadius : 5,
    marginHorizontal: "2.5%",
    paddingHorizontal : "1.5%",
    marginTop: "5%",
    justifyContent: 'center',
    flexDirection : 'row'
  },
  checkmark: {
    color: '#3983fe',
    fontSize: 20,
    marginLeft : 3,
  },
  headerName: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'sans-serif-medium',
    textTransform: 'uppercase',
  },
  headerPassport: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    alignSelf : 'center'
  },
  VerifiedText: {
    color: theme.colors.background,
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
  },
  verified: {
    flexDirection : 'row',
    alignItems : 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 5,
    marginBottom: 3,
  },
  image: {
    width: "50%",
    height: "50%",
    margin : "25%",
  },
  status: {
    color: 'white',
    fontSize: 20,
  },
  vaccine: {
    color: 'black',
    fontSize: 20,
  },
  help: {
    color: 'white',
    textAlign: "right"
  },
  history: {
    marginTop : 10,
    marginRight: 20,
    alignItems: 'flex-end',
  },
  checkinButton: {
    alignItems: 'center',
    justifyContent : 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    marginTop : 10,
    margin: '2%',
    height: "65%",
    alignSelf: 'center',
    width : '96%'
  }
  
})
