import React from 'react'
import { Text, Image } from 'react-native'
import styled from 'styled-components'
import { colors } from '../../../../infrastructure/theme/colors'
import CardSilder from 'react-native-cards-slider'
import { View } from 'react-native'
import { SubmitButton } from '../report.styles'
import call from 'react-native-phone-call'

export const Title = styled.Text`

align-self: center
    font-size: 40px
    font-weight: bold
    color: ${colors.brand.primary}
`

export const SubTitle = styled.Text`
padding: 10px
margin-top: 20px
text-align: center
    font-size: 20px
    font-weight: bold
    color: ${colors.brand.secondary}
`

export const QuestionContainer = styled.View`

    width: 90%
    border-radius: 10px
    background-color: ${colors.brand.tertiary}


`
export const Line = styled.View`
padding: 4px
width: 90%
border-bottom-width: 2px
border-bottom-color: ${colors.brand.primary}
align-self: center
margin-bottom: 20px
`

export const Question = styled.Text`
    font-size: 20px
    color: ${colors.brand.primary}
    text-align: center
    margin-top: 20px
    font-weight: 500

    
`

export const Answer = styled.Text`
padding: 6px
font-size: 20px
color: white
text-align: center
font-weight: 500 
margin-bottom: 30px
`

export const InstructionText = () => {
    return (
        <>
            <Title>
                Start here!
            </Title>

            <View
            style = {{
                margin: 20,
                alignItems: 'center' }} 
            >
                <Image source={require('../../../../../assets/clipboard.image.png')} />
            </View>
            <SubTitle>
                If you are a victim of or have witnessed any incident of human trafficking, please report it here.
            </SubTitle>
            <Line />
            <SubTitle style = {{marginTop: 10}}>
                If your case requires immediate attention, call the National Trafficking Hotline below: 
            </SubTitle>

            <SubmitButton 
            type = "new"
                    title= "1 (888) 373-7888"
                    onPress = {() => {
                        const args = {
                            number: '8883737888', // String value with the number to call
                            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
                          }
                          
                          call(args).catch(console.error)
                    }}
                /> 

            <CardSilder style={{ marginTop: 20 }}>
                <QuestionContainer>
                    <Line>
                        <Question>
                            What kind of questions does the form ask?
                        </Question>
                    </Line>
                    <Answer>
                        •It asks questions about the victim and the incident.
                    </Answer>
                    <Answer>
                        •All of the fields are optional EXCEPT the location field.
                    </Answer>
                    <Answer>
                        • Fill in as much or as little as you'd like
                    </Answer>
                </QuestionContainer>
                <QuestionContainer>
                    <Line>
                        <Question>
                            Where does my report go?
                        </Question>
                    </Line>
                    <Answer>
                        •Reports are stored in our offsite, secure and private database
                    </Answer>
                    <Answer>
                        •All reports are encrpyted and completely anonymous 
                    </Answer>
                </QuestionContainer>
                <QuestionContainer>
                    <Line>
                        <Question>
                        What happens after my report is submitted?
                        </Question>
                    </Line>
                    <Answer>
                        •Your report is automatically reported to the National Human Traficking Hotline.
                    </Answer>
                    <Answer>
                        •Your report is stored in our secure database to prevent human-traficking efforts
                    </Answer>
                </QuestionContainer>
            </CardSilder>


            {/* <Text>
                The following report will ask you a series of questions relating to the incindent
            </Text>
            <Text>
                While filling out all details in the form will help us improve efforts to combat human trafficking, all of the fields are optional EXCEPT the location field.
            </Text>
            <Text>
                Where does my report go?
            </Text>
            <Text>
                Reports are stored in our offsite, secure and private database. All reports are encrpyted and completely anonymous from the user.
            </Text>
            <Text>
                What happens after my report is submitted?
            </Text>
            <Text>
                Your report is stored in our secure database and automatically reported to the National Human Traficking Hotline.
            </Text>
            <Text>
                If your case is more urgent, please call the National Human Traficking Hotline
            </Text> */}
        </>
    )
}