import { Dimensions, StyleSheet } from "react-native";

const styleSheetConstants = {
    'primaryColour': '#3700CC',
    'successColour': '#00C208',
    'warningColour': '#FF8B04',
    'dangerColour': '#EB2C0D',
    'infoColour': '#0092FF',
  
    'linkColour':'#0039FF',
    
    'inputBackgroundColour':'#353535', 
  }

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'center',
    justifyContent: 'center',
    color: styleSheetConstants.textColour,
    },
  text: {
    color: styleSheetConstants.textColour,
    fontSize: 20,
  },
  whitetext: {
    color: "#ffffff",
    fontSize: 20,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'center',
    //color: styleSheetConstants.textColour,
    //height: '100%',
    width: '100%',
  },

  bottomView: {
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'center',
    //color: styleSheetConstants.textColour,
    height: '5%',
    width: '100%',
  },

  registersafeAreaView: {
    flex: 3,
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'center',
    //color: styleSheetConstants.textColour,
    //height: '100%',
    width: '100%',
  },

  userhomeView: {
    flex: 1,
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'left',
    //color: styleSheetConstants.textColour,
    //height: '100%',
    width: '100%',
    flexDirection: 'row',
},
  insidesafeAreaView: {
    flex: 2,
    backgroundColor: styleSheetConstants.backgroundColour,
    alignItems: 'center',
    textAlign: 'left',
    //color: styleSheetConstants.textColour,
    height: '100%',
    width: '95%',
    padding: '10%',
    marginLeft: '3%',
},
  scrollView: {
    backgroundColor: styleSheetConstants.backgroundColour,
    alignContent: 'center',
    //color: styleSheetConstants.textColour
  },
  input: {
    width: Dimensions.get('window').width * 0.9,
    height: '4%',
    alignContent: 'center',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  inputlyrics: {
    width: Dimensions.get('window').width * 0.9,
    height: '23%',
    alignContent: 'center',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
},
  namerow: {
    flexDirection: 'row',
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width*0.7,
    height: Dimensions.get('window').height*0.3,
  },
  inputnames: {
    width: Dimensions.get('window').width * 0.45,
    height: '5%',
    alignContent: 'center',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  nameswrap: {
    flex: 2,
    //alignContent: 'center',
    alignItems: 'center'
  },
  to: {
    alignItems: "center",
    backgroundColor: "#3366ff",
    padding: 10,
    width: "50%",
    marginTop: 10,
    borderRadius: '10%',
  },    
  tou: {
    alignItems: "center",
    backgroundColor: "#3366ff",
    padding: 10,
    width: "32%",
    height: "20%",
    marginTop: 10,
    marginLeft: 4
  },     

  pageHeading: {
    fontSize: 35,
    color: styleSheetConstants.textColour,
  },
  navHeader: {
    backgroundColor: styleSheetConstants.backgroundColour,
    borderBottomWidth: '0',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0
  },
  register: {
    alignContent: 'left',
    alignItems: 'left',
    justifyContent: 'left'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 200,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  daterow: {
    flexDirection: 'row',
   
  },
  map: {
    width: Dimensions.get('window').width*0.7,
    height: Dimensions.get('window').height*0.3,
  },
  dateswrap: {
    flex: 2,
    //alignContent: 'center',
    alignItems: 'center'
  },
});
