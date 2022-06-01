import { StyleSheet } from "react-native";

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
      safeAreaView: {
          flex: 1,
          backgroundColor: styleSheetConstants.backgroundColour,
          alignItems: 'center',
          color: styleSheetConstants.textColour,
          height: '100%',
          width: '100%',
      },
      input: {
          width: '90%',
          height: '12%',
          alignContent: 'center',
          borderRadius: 10,
          borderColor: 'grey',
          borderWidth: 1,
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
      }
    });