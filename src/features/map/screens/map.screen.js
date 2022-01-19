import React, { useEffect, useState, useContext, useRef } from "react";
import MapView from 'react-native-maps'
import styled from "styled-components";
import { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import { AutoCompleteSearch } from "../components/auto-complete.component";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { LocationSearchContext } from "../../../services/location-search/location-search.context";
import Geocoder from "react-native-geocoding";
import { API_KEY } from "../../../../key";
import { uniqueId } from "lodash";
import { Text, View, Platform } from 'react-native'
import { ReportEntryContext } from "../../../services/report-entry/report-entry.context";
import { getReports } from '../../../services/report-entry/report-entry.service'
import { FilterButton, HelpButton } from "../components/map-buttons.component";
import { IncidentInfo } from "../components/callout.coponent";
import { ActivityIndicator } from "react-native-paper";
import { HelpPopup } from '../components/help.component'


Geocoder.init(API_KEY)

const Map = styled(MapView)`
    height: 100%
    width: 100%
`

export const MapScreen = ({ navigation }) => {
    const startupHeatmap = Platform.OS === "android" ? false : true
    const [viewPort, setViewPort] = useState()
    const [points, setPoints] = useState([])
    const [weightedCoords, setWeightedCoords] = useState([])
    const [showHeatmap, setShowHeatmap] = useState(startupHeatmap)
    const [showMarkers, setShowMarkers] = useState(!startupHeatmap)
    const [showInfo, setShowInfo] = useState(false)
    const [initiated, setInitiated] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [showHelp, setShowHelp] = useState(false)
    const [currentPoint, setCurrentPoint] = useState(null)
    const { isSearching, notSearching, location, isReporting } = useContext(LocationSearchContext)

    const heatmap = () => {
        setShowHeatmap(true)
        setShowMarkers(false)
    }

    const markers = () => {
        setShowHeatmap(false)
        setShowMarkers(true)
    }

    const toggleHelp = () => {
        setShowHelp(!showHelp)
        setInitiated(true)
    }

    useEffect(async () => {
        const res = await getReports()
        let points = []
        let coords = []
        const docs = res.forEach((doc) => {
            points = [...points, doc.data()]
            coords = [...coords, doc.data().coordinates]
        })
        setPoints(points)
        setWeightedCoords(coords)
    }, [])


    const mapref = useRef(null)

    const getCoords = async (location) => {
        Geocoder.from(location)
            .then(json => {
                var res = json.results[0].geometry;
                const { lat, lng } = res.location
                const latDelta = res.viewport.northeast.lat - res.viewport.southwest.lat
                const lngDelta = res.viewport.northeast.lng - res.viewport.southwest.lng
                const newViewPort = { latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta }
                setViewPort(newViewPort)
                console.log(mapref.current.animateToRegion(newViewPort))
            })
            .catch(error => console.warn(error));

    }

    useEffect(() => {
        if (location.length > 3 && !isSearching && !isReporting) {
            console.log('zooming in')
            getCoords(location)
        }
    }, [location])

    let count = 0

    return (
        <>
            <AutoCompleteSearch isMap={true} />
            <View
                style={{
                    marginTop: 125,
                    position: 'absolute', flex: 1, flexDirection: 'row', zIndex: 500
                }}
            >
                <FilterButton title='Heatmap' onPress={heatmap} />
                <FilterButton title='Show Markers' onPress={markers} />

            </View>
            <HelpButton onPress={toggleHelp} />

            {showHelp && <HelpPopup animate="bounceInRight" />}
            {initiated && !showHelp && <HelpPopup animate="bounceOutRight" />}


            <Map
                ref={mapref}
                provider={PROVIDER_GOOGLE}
                onPress={() => {
                    if (isSearching) {
                        setCurrentPoint(null)
                        setShowInfo(false)
                        dismissKeyboard()
                        notSearching()
                    }
                }}
                initialRegion={{
                    latitude: 37.09024,
                    latitudeDelta: 23.560000000000002,
                    longitude: -97.712891,
                    longitudeDelta: 57.45,
                }}
                loadingEnabled

            >
                {showMarkers && points.map((point) => {
                    return (
                        <MapView.Marker
                            tappable
                            flat={true}
                            key={uniqueId()}

                            coordinate={{ latitude: point.coordinates.latitude, longitude: point.coordinates.longitude }}
                            onPress={() => {
                                setShowInfo(true)
                                setCurrentPoint(point)
                            }}
                        >
                        </MapView.Marker>
                    )
                })}
                {showHeatmap && <Heatmap
                    points={weightedCoords}
                    radius={40}
                    opacity={1}
                    gradient={{
                        colors: ["navy", "blue", "green", "yellow", 'red'],
                        startPoints: Platform.OS === 'ios' ? [0.1, 0.2, 0.3, 0.4, .5] :
                            [0.13, 0.25, 0.5, 0.75, 1],
                        colorMapSize: 2000
                    }}
                >
                </Heatmap>}

            </Map>
            {showInfo &&
                <IncidentInfo info={currentPoint} animate={"bounceInUp"} close={() => {
                    setShowInfo(false)
                    setDetailsOpen(true)
                }} />
            }
            {!showInfo && detailsOpen  && <IncidentInfo info={currentPoint} animate={"bounceOutDown"} close={() => {
                    setShowInfo(false)
                    setDetailsOpen(true)
                }} /> }
        </>




    )
}