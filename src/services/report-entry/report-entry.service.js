// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import uuid from 'react-native-uuid'
import Geocoder from "react-native-geocoding";
import { API_KEY } from "../../../key";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCG1iAwZVjMQ6A6SJbXOBsMoBlLvTWoFG0",
    authDomain: "trafficking-tracker.firebaseapp.com",
    projectId: "trafficking-tracker",
    storageBucket: "trafficking-tracker.appspot.com",
    messagingSenderId: "511422345061",
    appId: "1:511422345061:web:45a68ca0dbec78ab53bb8c",
    measurementId: "G-HG01L2JR4E"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

Geocoder.init(API_KEY)

const getCoords = async (location) => {
    return Geocoder.from(location)
        .then(json => {
            var res = json.results[0].geometry;
            const { lat, lng } = res.location
            const latDelta = res.viewport.northeast.lat - res.viewport.southwest.lat
            const lngDelta = res.viewport.northeast.lng - res.viewport.southwest.lng
            const newViewPort = { latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta }
            return { viewPort: newViewPort, coordinates: { lat, lng } }
        })
        .catch(error => { console.warn(error) });

}

export const getReports = async () => {
    const firestore = getFirestore()
    const col = collection(firestore, '/Incidents/')
    const res = query(col)
    try{
        const querySnapshot = await getDocs(res);
    console.log('Should be getting!')
    return querySnapshot
    } catch (e) {
        Alert.alert("Your device couldn't reach our database :(", "Ensure you have a stable internet connection and reload the app!")
    }
    
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}

export const setNewUser = async () => {
    const store = await AsyncStorage.setItem('@new-user', "no")
}

export const isNewUser = async () => {
    const isNew = await AsyncStorage.getItem('@new-user')
    console.log(isNew)
    return isNew !== "no"
}
 

export const hasPreviousReport = async () => {
    const localItem = await AsyncStorage.getItem('@reports')
    console.log(localItem)
    const firestore = getFirestore()
    const ref = collection(firestore, '/Incidents/')
    const res = query(ref, where("id", "==", localItem), where("showOnMap", "==", false))
    const querySnapshot = await getDocs(res)
    console.log("Query empty : " + querySnapshot.empty)
    return (!querySnapshot.empty)
}

export const storeReport = async (report) => {
    const id = uuid.v4()
    const firestore = getFirestore()
    const ref = collection(firestore, "/Incidents/")
    try {
        const { coordinates, viewPort } = await getCoords(report.reportLocation)
        const res = await addDoc(ref, {
            id: id,
            gender: report.gender,
            age: report.age,
            description: report.description,
            location: report.reportLocation,
            coordinates: { latitude: coordinates.lat, longitude: coordinates.lng, weight: 1 },
            viewPort: viewPort,
            photo: report.photoUrl,
            showOnMap: false,
            type: report.type,
            control: report.control,
            dateTime: report.dateTime,
            hotline: report.reportToHotline
        })
       const store = await AsyncStorage.setItem('@reports', id)
        console.log('stored!')
        console.log(store)
        return true

    } catch (e) {
        console.log(e)
        return false
    }
}


export const uploadImage = async (uri) => {
    try {
        const uploadUrl = await uploadImageAsync(uri);
        console.log(uploadUrl);
        return uploadUrl
    } catch (e) {
        console.log(e);
        alert("Upload failed, sorry :(");
    }
};


async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}