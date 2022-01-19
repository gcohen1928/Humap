import React, { useState, useContext } from "react";
import { Button, Text, View, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SubmitButton } from './report.styles'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'
import { Modal } from "react-native";
import { useEffect } from "react/cjs/react.development";
import { colors } from "../../../infrastructure/theme/colors";
import { Title } from "./report.styles";
import Spinner from 'react-native-loading-spinner-overlay'

export const SubmitModal = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { submitReport } = useContext(ReportEntryContext)


    return (
        <View style={{ flex: 1 }}>

            <SubmitButton title="Submit" onPress={() => {
                Alert.alert(
                    'Are you sure you want to submit this report?',
                    'This cannot be undone',
                    [
                        { text: "Cancel", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Submit',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: async () => {
                                const success = await submitReport()
                                if (success) {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'ReportSuccess' }],
                                    });
                                } else {
                                    navigation.navigate("ReportForm")

                                    Alert.alert(
                                        'Your report could not be uploaded at this time :(',
                                        'Make sure you have a stable internet conenction and you filled out the location field')
                                }

                            },

                        },
                    ],
                )
            }} />

      
        </View>
    );
}
