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
          height: '100%',
          width: '100%',
      },
      input: {
          width: Dimensions.get('window').width * 0.9,
          height: '4%',
          alignContent: 'center',
          borderRadius: 10,
          borderColor: 'grey',
          borderWidth: 1,
      },
      namerow: {
        flexDirection: 'row',
        flex: 2,
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
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
      },
      to: {
        alignItems: "center",
        backgroundColor: "#3366ff",
        padding: 10,
        width: "50%",
        marginTop: 10
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
      }
    });