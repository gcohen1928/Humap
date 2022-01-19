import React, { useContext } from 'react'
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { ReportScreen } from '../../features/report/screens/report.screen'
import { ReportSearchContextProvider } from '../../services/report-location-search/report-location-search.context'
import { ReportEntryContextProvider } from '../../services/report-entry/report-entry.context'
import { ReportSuccess } from '../../features/report/screens/success.screen'
import { ReportInstructions } from '../../features/report/screens/instructions.screen'
import { AsyncDataContext } from '../../services/async-info/asyncdata.context'
import { colors } from '../theme/colors'


const ReportStack = createStackNavigator();

export const ReportNavigator = ({ route, navigation }) => {
    const { pendingReview } = useContext(AsyncDataContext)
    return (
        <ReportSearchContextProvider>
            <ReportEntryContextProvider>
                <ReportStack.Navigator
                   
                >

                    {!pendingReview && <>
                        <ReportStack.Screen 
                            
                            options={{
                                headerStyle: {
                                    backgroundColor: colors.brand.primary,
                                  },
                                  headerTitleStyle: {
                                      color: 'white',
                                      fontSize: 20,
                                      alignItems: 'center',
                                      alignSelf: 'center'

                                  },
                                  headerTitleAlign: 'center'
                            }}
                            name="Create a Report" component={ReportInstructions} />
                        <ReportStack.Screen  options={{headerShown: false}} name="ReportForm" component={ReportScreen} />
                        <ReportStack.Screen name="Help" component={ReportScreen} /></>}

                    <ReportStack.Screen
                        options={{ gestureEnabled: false }}
                        name="ReportSuccess" options={{headerShown: false}} component={ReportSuccess} />
                </ReportStack.Navigator>
            </ReportEntryContextProvider>
        </ReportSearchContextProvider>



    )
}