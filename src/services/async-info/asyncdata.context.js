import { first, has } from "lodash";
import React, { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { hasPreviousReport, setNewUser, isNewUser} from "../report-entry/report-entry.service";

export const AsyncDataContext = createContext()


export const AsyncDataContextProvider = ({ children, navigation}) => {
    const [underReview, setUnderReview] = useState(false)
    const [newUser, setNewUserStatus] = useState(false)

    useEffect(async ()=> {
       const res = await hasPreviousReport()
       console.log("Setting under review to " + res)
       const isNew = await isNewUser()
       setUnderReview(res)
        setNewUserStatus(isNew)
    }, [])

   
    useEffect(() => {
        console.log("First time is: " + newUser)
    }, [newUser])

    return (
        <AsyncDataContext.Provider
            value={{
                pendingReview: underReview,
                newUser,
                setNewUser: async ({val}) => {
                    setNewUserStatus(val)
                    await setNewUser()
                },
            }}
        >
            {children}
        </AsyncDataContext.Provider>
    )

}