
import React, { useState, useContext } from 'react'
import CheckBox from 'expo-checkbox';
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context';
import { View, Text} from 'react-native';
import { colors } from '../../../infrastructure/theme/colors';
export const HotlineCheckBox = ({ title }) => {
    const { reportToHotline, setReportToHotline } = useContext(ReportEntryContext)

    return (
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row',
        marginTop: 30,
        
        }}>
            
            <CheckBox
            color={colors.brand.primary}
        
                disabled={false}
                value={reportToHotline}
                onValueChange={(val) => setReportToHotline(val)}
            />
            <Text style= {{fontSize: 15, color: colors.brand.tertiary, fontWeight: 'bold', marginLeft: 10}}>
                Report to the National Trafficking Hotline
            </Text>
        </View>
    )
}