import React, { useContext, useState } from 'react'
import { ScrollView, Alert } from 'react-native'
import { Input } from '../components/input.component'
import { Title, CaptionContainer, Caption, SectionHeader, BackButton } from '../components/report.styles'
import { DateInput } from '../components/datepicker.component'
import { Selector } from '../components/select.component'
import { types } from '../../../utility/types.info'
import { ReportAutoComplete } from '../components/report-location.component'
import { LocationSearchContext } from '../../../services/location-search/location-search.context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ChooseImage } from '../components/image-picker.component'
import { SubmitModal } from '../components/submit-modal.component'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'
import { useEffect } from 'react/cjs/react.development'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import { HotlineCheckBox } from '../components/checkbox.component'


export const ReportScreen = ({ navigation }) => {
    const { resetAll, uploading } = useContext(ReportEntryContext)

    let submitted = false
    const setSubmitted = (val) => {
        submitted = val
        console.log(submitted + " has changed from " + !submitted)
    }
    count = 0

    const listener = navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === "RESET" || count > 0) {
            return
        }
        count += 1
        e.preventDefault();
        Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
                { text: "Don't leave", style: 'cancel', onPress: () => { count -= 1 } },
                {
                    text: 'Discard',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => {
                        count -= 1
                        resetAll()
                        navigation.dispatch(e.data.action)
                    }
                    ,
                },
            ],
        );
    })

    useEffect(listener, [navigation, submitted])



    return (

        <KeyboardAwareScrollView>
            {!!uploading && <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
            /> }
            <BackButton onPress={() => navigation.navigate("Create a Report")} />
            <Title>Report an Incident</Title>
            <CaptionContainer >
                <Caption>{"Note: All fields are optional EXCEPT location."}</Caption>
            </CaptionContainer>
            <SectionHeader title="About You" />
            <Selector category='gender' title="Gender:" options={types.GENDER} />
            <Input category='age' title="Age:" type="number" />

            <SectionHeader title="About The Incident" />
            <Input category='description' title="Incident Description:" multiline={true}></Input>
            <DateInput />
            <ReportAutoComplete />
            <Selector category='type' position={1} title="Type of Trafficking or Assault:" options={types.TYPES_OF_TRAFFICKING} />
            <Selector title="Means of Control:" options={types.MEANS_OF_CONTROL} />
            <ChooseImage />
            <HotlineCheckBox />
            <SubmitModal navigation={navigation} />

        </KeyboardAwareScrollView>
    )
}




