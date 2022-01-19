import React from 'react'
import * as Animatable from 'react-native-animatable';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ICONS = {
    Date: 'calendar-outline',
    Age: 'person-outline',
    Location: "location-outline",
    Control: 'man-outline',
    Type: 'bookmark-outline'
}



export const IncidentInfo = ({ info, close, animate }) => {
    let animation = animate
    return (
        <View
            style={{
                flex: 1,
                position: 'absolute',
                marginTop: 500,
                marginLeft: 20,
                zIndex: 100,
                alignItems: 'center'

            }}
        >
            <Animatable.View
                animation={animation}
                style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    width: 350
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingBottom: 10

                    }}
                >
                    <Title>Incident Details</Title>

                        <TouchableOpacity
                            onPress ={() => {
                                animation = 'bouncOutDown'
                                close()
                            }}
                        >
                            <Text style = {{color: '#007AFF'}}>
                                Close
                            </Text>
                        </TouchableOpacity>

                </View>

                <Field title="Location" details={info.location} />
                <Field title="Age" details={info.age} />
                <Field title="Date" details={info.dateTime.substring(0, 21)} />
                <Field title="Type" details={info.type} />
                <Field title="Control" details={info.control} />

            </Animatable.View>
        </View>


    )

}


const Field = ({ title, details }) => {
    const text = details === "" ? 'N/A' : details
    const iconName = ICONS[title]
    return (

        <FieldContainer>
            <FieldName

            >
                <Ionicons
                    size={15}
                    name={iconName} />
                {"   " + title}:
            </FieldName>
            <FieldInfo>
                {text}
            </FieldInfo>
        </FieldContainer>


    )
}



const FieldContainer = styled.View`
    flex-direction: row
    justify-content: flex-start
    align-items: flex-start
    padding:6px
    paddingRight: 90px
    

`

const Title = styled.Text`
    font-size: 20px
    font-weight: 300
    marginRight: 140px
`

const FieldName = styled.Text`
    font-weight: bold
    marginRight: 10px
`

const FieldInfo = styled.Text`

`