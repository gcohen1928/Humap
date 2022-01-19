import React, { createContext, useContext, useState, useEffect } from 'react'
import { ReportSearchContext } from '../report-location-search/report-location-search.context'
import { uploadImage, storeReport, getDeviceReports, getReports} from './report-entry.service'


export const ReportEntryContext = createContext()

export const ReportEntryContextProvider = ({ children, navigation }) => {
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [type, setType] = useState('')
    const [control, setControl] = useState('')
    const [photo, setPhoto] = useState('')
    const [reportToHotline, setReportToHotline] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { reportLocation, createNewReportLocation } = useContext(ReportSearchContext)
   
    const submitReport = async () => {
        setUploading(true)
        const photoUrl = photo.length ? await uploadImage(photo) : ''
        const res = await storeReport({
            gender, age, description, dateTime, type, photoUrl, control, reportLocation, reportToHotline
        })
        setUploading(false)
        return res
    }

    const resetAll = () => {
        setGender('')
        setAge('')
        setDescription('')
        setDateTime('')
        setType('')
        setControl('')
        setPhoto('')
        setReportToHotline(false)
        createNewReportLocation('')
    }

    return (
        <ReportEntryContext.Provider
            value={{
                gender,
                age,
                description,
                dateTime,
                type,
                control,
                photo,
                reportToHotline,
                uploading,
                setGender,
                setAge,
                setDescription,
                setDateTime,
                setType,
                setControl,
                setPhoto,
                setReportToHotline, 
                submitReport,
                resetAll,
            }}>
            {children}
        </ReportEntryContext.Provider>
    )
}