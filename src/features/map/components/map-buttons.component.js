import React from "react";
import styled from "styled-components";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { borderRightColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { colors } from "../../../infrastructure/theme/colors";
import { Ionicons } from "@expo/vector-icons";

const Button = ({ title, onPress }) => {

 
    return (

        <ButtonContainer>
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: colors.brand.secondary,
                    borderRadius: 20,
                    padding: 7, 
                    marginLeft: 10, 

                }}
                activeOpacity={0}
                onPress={() => {
                    onPress()
                }}
            >
                 <ButtonText>
                    {title}
                </ButtonText>
                
            </TouchableOpacity>

        </ButtonContainer>


    )


}

const ButtonText = styled.Text`
    align-self: center
`

const ButtonContainer = styled.View`

`

export const FilterButton = styled(Button)`
    align-self: center
    margin-top: 100px
`

const Container = styled(View)`
position: absolute
            marginTop: 32%
            marginLeft: 84%
            zIndex: 500
            maxWidth: 58px
`

export const HelpButton = ({onPress}) => {

    return (
        <Container>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.brand.primary,
                    // borderWidth: 1,
                    borderRadius: 20,
                    padding: 7, 
                    marginLeft: 10, 

                }}
                onPress={onPress}
            >
                
                <Ionicons size={35} name="information-circle-outline" />
            </TouchableOpacity>
        </Container>
    )
}