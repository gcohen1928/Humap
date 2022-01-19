import React from "react";
import * as Animatable from 'react-native-animatable';
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { Answer, Line, Question } from "../../report/components/instructions/instructions.component";
import { colors } from "../../../infrastructure/theme/colors";

const AnimatedView = styled(Animatable.View)`
position: absolute
                zIndex: 1001
                marginTop: 50%
                marginLeft: 4%
                maxWidth: 95%
                maxHeight: 55%
                borderRadius: 20px

`




export const HelpPopup = ({ initiated, animate }) => {
    return (
        <AnimatedView
            animation={animate}
            duration={500}

        >
            <ScrollView
                style= {{borderRadius: 20}}

            >
                <View
                    style={{
                        backgroundColor: colors.brand.secondary,
                        borderRadius: 20,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingTop: 10,
                    }}
                >

                    <View
                        style={{
                            backgroundColor: colors.brand.quaternary,
                            borderRadius: 20
                        }}
                    >
                        <Title>About Us</Title>
                        <Question>
                            What is this app?
                        </Question>
                        <Line />
                        <AnswerText>
                            - The Trafficking Tracker is designed to combat human trafficking.
                        </AnswerText>
                        <AnswerText>
                            - It lets users report instances of human trafficking that they witness or are a victim of.
                        </AnswerText>
                        <AnswerText>
                            - Those reports are then sent to the National Human Trafficking hotline, and then displayed on our worldwide map.
                        </AnswerText>
                        <Question>
                            What's our goal?
                        </Question>
                        <Line />
                        <AnswerText>
                            - We want to give citizens and law enforcement a clearer idea of the trends and state of human trafficking.
                        </AnswerText>
                        <Question>
                            Who are we?
                        </Question>
                        <Line />
                        <AnswerText>
                            - We are a team of university students who are dedicated to combatting the widespread issue of human trafficking in the United States.
                        </AnswerText>

                    </View>

                </View>

            </ScrollView>

        </AnimatedView>
    )
}

const AnswerText = styled(Text)`

font-size: 15px
padding: 10px
font-weight: 500
`

const Title = styled.Text`
padding: 20px
    font-size: 40px
    font-weight: bold
    color: ${colors.brand.tertiary}

`
