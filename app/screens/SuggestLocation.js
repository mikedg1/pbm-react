import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Keyboard,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    Pressable,
    View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Icon,
    ListItem
} from '@rneui/base'
import { ThemeContext } from '../theme-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
    ActivityIndicator,
    DropDownButton,
    NotLoggedIn,
    PbmButton,
    WarningButton,
    Text
} from '../components'
import {
    clearError,
    clearSelectedState,
    removeMachineFromList,
    setSelectedLocationType,
    setSelectedOperator,
    suggestLocation,
    resetSuggestLocation,
} from '../actions'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

function SuggestLocation({
    navigation,
    route,
    setSelectedLocationType,
    setSelectedOperator,
    setCountryName,
    setCountryCode,
    ...props
}) {

    const [locationName, setLocationName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [description, setDescription] = useState('')
    const [showSuggestLocationModal, setShowSuggestLocationModal] = useState(false)

    confirmSuggestLocationDetails = () => {
        const locationDetails = {
            locationName,
            street,
            city,
            state,
            zip,
            country: countryCode,
            phone,
            website,
            description,
        }
        props.suggestLocation(locationDetails)
    }

    getDisplayText = machine => (
        <Text style={{ fontSize: 16 }}>
            <Text style={{ fontFamily: 'boldFont', }}>{machine.name}</Text>
            <Text>{` (${machine.manufacturer}, ${machine.year})`}</Text>
        </Text>
    )

    acceptError = () => {
        props.clearError()
        setShowSuggestLocationModal(false)
    }

    const { navigate } = navigation
    const { loggedIn } = props.user
    const { errorText } = props.error
    const { locationTypes } = props.locations
    const { operators } = props.operators

    const { isSuggestingLocation, locationSuggested, machineList = [], operator, locationType } = props.location

    const locationTypeObj = locationTypes.find(type => type.id === locationType) || {}
    const { name: locationTypeName = 'Select location type' } = locationTypeObj

    const operatorObj = operators.find(op => op.id === operator) || {}
    const { name: operatorName = "Select operator" } = operatorObj

    const countryCode = route.params?.setCountryCode ? route.params?.setCountryCode : 'US'
    const countryName = route.params?.setCountryName ? route.params?.setCountryName : 'United States'

    const keyboardDismissProp = Platform.OS === "ios" ? { keyboardDismissMode: "on-drag" } : { onScrollBeginDrag: Keyboard.dismiss }

    React.useEffect(() => {
        if (route.params?.setSelectedLocationType) {
            setSelectedLocationType(route.params?.setSelectedLocationType)
        }
    }, [route.params?.setSelectedLocationType, setSelectedLocationType])

    React.useEffect(() => {
        if (route.params?.setSelectedOperator) {
            setSelectedOperator(route.params?.setSelectedOperator)
        }
    }, [route.params?.setSelectedOperator, setSelectedOperator])

    React.useEffect(() => {
        if (route.params?.countryName) {
            setCountryName(route.params?.setCountryName)
            setCountryCode(route.params?.setCountryCode)
        }
    }, [route.params?.setCountryName, route.params?.setCountryCode, setCountryName, setCountryCode])

    const goToFindLocationType = () => {
        navigation.navigate('FindLocationType', {
            type: 'search',
            previous_screen: 'SuggestLocation',
            setSelectedLocationType: (id) => setSelectedLocationType(id)
        })
    }

    const goToFindOperator = () => {
        navigation.navigate('FindOperator', {
            type: 'search',
            previous_screen: 'SuggestLocation',
            setSelectedOperator: (id) => setSelectedOperator(id)
        })
    }

    const goToFindCountry = () => {
        navigation.navigate('FindCountry', {
            type: 'search',
            previous_screen: 'SuggestLocation',
            countryName: (countryName) => countryName(countryName),
            countryCode: (countryCode) => countryCode(countryCode)
        })
    }

    return (
        <ThemeContext.Consumer>
            {({ theme }) => {
                const s = getStyles(theme)
                return (
                    <KeyboardAwareScrollView {...keyboardDismissProp} enableResetScrollToCoords={false} style={s.background}>
                        {!loggedIn ?
                            <NotLoggedIn
                                text={'But first! We ask that you log in. Thank you!'}
                                onPress={() => navigation.navigate('Login')}
                            /> :
                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={showSuggestLocationModal}
                                    onRequestClose={() => { }}
                                >
                                    {isSuggestingLocation ?
                                        <ActivityIndicator /> :
                                        errorText ?
                                            <ScrollView style={[{ paddingTop: 100 }, s.background]}>
                                                <Text style={[s.error, s.success]}>{errorText}</Text>
                                                <PbmButton
                                                    title={"OK"}
                                                    onPress={() => acceptError()}
                                                />
                                            </ScrollView> :
                                            locationSuggested ?
                                                <ScrollView style={[{ paddingTop: 100 }, s.background]}>
                                                    <Text style={s.success}>{`Thanks for submitting that location! We'll review the submission and add it!`}</Text>
                                                    <PbmButton
                                                        title={"OK"}
                                                        onPress={() => {
                                                            setShowSuggestLocationModal(false)
                                                            props.resetSuggestLocation()
                                                            navigate('Map')
                                                        }}
                                                    />
                                                </ScrollView>
                                                :
                                                <SafeAreaProvider>
                                                    <SafeAreaView style={[{ flex: 1 }, s.background]}>
                                                        <ScrollView style={s.background}>
                                                            <View style={s.pageTitle}>
                                                                {machineList.length === 0 || locationName?.length === 0 ?
                                                                    <Text style={[s.pageTitleText, s.error]}>Please fill in required fields</Text>
                                                                    : <Text style={s.pageTitleText}>Please review your submission</Text>
                                                                }
                                                            </View>
                                                            <Text style={s.title}>Location Name</Text>
                                                            {locationName?.length === 0 ?
                                                                <Text style={[s.error, s.preview]}>Include a location name</Text>
                                                                : <Text style={s.preview}>{locationName}</Text>
                                                            }
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Street</Text>
                                                            <Text style={s.preview}>{street}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>City</Text>
                                                            <Text style={s.preview}>{city}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>State</Text>
                                                            <Text style={s.preview}>{state}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Zip</Text>
                                                            <Text style={s.preview}>{zip}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Country</Text>
                                                            <Text style={s.preview}>{countryName}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Phone</Text>
                                                            <Text style={s.preview}>{phone}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Website</Text>
                                                            <Text style={s.preview}>{website}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Location Notes</Text>
                                                            <Text style={s.preview}>{description}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Location Type</Text>
                                                            <Text style={s.preview}>{typeof locationType === 'number' && locationType > -1 ? locationTypes.filter(type => type.id === locationType).map(type => type.name) : 'None Selected'}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Operator</Text>
                                                            <Text style={s.preview}>{typeof operator === 'number' && operator > -1 ? operators.filter(op => op.id === operator).map(op => op.name) : 'None Selected'}</Text>
                                                            <View style={s.hr}></View>
                                                            <Text style={s.title}>Machine List</Text>
                                                            {machineList.length === 0 ?
                                                                <Text style={[s.error, s.preview]}>Include at least one machine</Text>
                                                                : machineList.map(m =>
                                                                    <Text style={s.preview} key={m.name}>{m.name} ({m.manufacturer}, {m.year})</Text>
                                                                )
                                                            }
                                                            <PbmButton
                                                                title={'Submit Location'}
                                                                onPress={() => confirmSuggestLocationDetails()}
                                                                disabled={machineList.length === 0 || locationName.length === 0}
                                                            />
                                                            <WarningButton
                                                                title={'Go Back'}
                                                                onPress={() => setShowSuggestLocationModal(false)}
                                                            />
                                                        </ScrollView>
                                                    </SafeAreaView>
                                                </SafeAreaProvider>
                                    }
                                </Modal>
                                <Pressable onPress={() => { Keyboard.dismiss() }}>
                                    <SafeAreaView edges={['right', 'bottom', 'left']}>
                                        <Text style={[{ marginTop: 10 }, s.text]}>{`Submit a new location to the map! We review all submissions. Thanks for helping out!`}</Text>
                                        <Text style={s.title}>Location Name</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={locationName => setLocationName(locationName)}
                                            value={locationName}
                                            returnKeyType="done"
                                            placeholder={"ex. Giovanni's Pizza"}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="organizationName"
                                            autoCapitalize="words"
                                        />
                                        <Text style={s.title}>Street</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={street => setStreet(street)}
                                            value={street}
                                            returnKeyType="done"
                                            placeholder={'ex. 123 Coast Village Road'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="streetAddressLine1"
                                            autoCapitalize="words"
                                        />
                                        <Text style={s.title}>City</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={city => setCity(city)}
                                            value={city}
                                            returnKeyType="done"
                                            placeholder={'ex. Montecito'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="addressCity"
                                            autoCapitalize="words"
                                        />
                                        <Text style={s.title}>State</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={state => setState(state)}
                                            value={state}
                                            returnKeyType="done"
                                            placeholder={'ex. CA'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="addressState"
                                            autoCapitalize="characters"
                                        />
                                        <Text style={s.title}>Zip Code</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={zip => setZip(zip)}
                                            value={zip}
                                            returnKeyType="done"
                                            placeholder={'ex. 93108'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="postalCode"
                                        />
                                        <Text style={s.title}>Country</Text>
                                        <DropDownButton
                                            title={countryName}
                                            containerStyle={[{ marginTop: 0, marginHorizontal: 20 }]}
                                            onPress={() => goToFindCountry()}
                                        />
                                        <Text style={s.title}>Phone</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={phone => setPhone(phone)}
                                            value={phone}
                                            returnKeyType="done"
                                            placeholder={phone || '(503) xxx-xxxx'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="telephoneNumber"
                                            autoCapitalize="none"
                                        />
                                        <Text style={s.title}>Website</Text>
                                        <TextInput
                                            style={[{ height: 40, textAlign: 'left' }, s.textInput, s.radius10]}
                                            underlineColorAndroid='transparent'
                                            onChangeText={website => setWebsite(website)}
                                            value={website}
                                            returnKeyType="done"
                                            placeholder={'https://...'}
                                            placeholderTextColor={theme.indigo4}
                                            textContentType="URL"
                                            autoCapitalize="none"
                                        />
                                        <Text style={s.title}>Location Notes</Text>
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={4}
                                            style={[{ padding: 5, height: 100 }, s.textInput, s.radius10]}
                                            onChangeText={description => setDescription(description)}
                                            underlineColorAndroid='transparent'
                                            value={description}
                                            placeholder={'Location description, hours, etc...'}
                                            placeholderTextColor={theme.indigo4}
                                            textAlignVertical='top'
                                        />
                                        <Text style={s.title}>Location Type</Text>
                                        <DropDownButton
                                            title={locationTypeName}
                                            containerStyle={[{ marginTop: 0, marginHorizontal: 20 }]}
                                            onPress={() => goToFindLocationType()}
                                        />
                                        <Text style={s.title}>Operator</Text>
                                        <DropDownButton
                                            containerStyle={[{ marginTop: 0, marginHorizontal: 20 }]}
                                            title={operatorName}
                                            onPress={() => goToFindOperator()}
                                        />
                                        <Text style={s.title}>Machines</Text>
                                        <PbmButton
                                            title={'Select Machines to Add'}
                                            titleStyle={{ fontSize: 16, color: theme.text3 }}
                                            onPress={() => navigate('FindMachine', { multiSelect: true })}
                                            icon={<MaterialCommunityIcons name='plus' style={s.plusButton} />}
                                            containerStyle={s.addMachinesContainer}
                                            buttonStyle={s.addMachinesButton}
                                        />
                                        {machineList.map(machine =>
                                            <ListItem
                                                key={machine.id}
                                                containerStyle={s.listContainerStyle}
                                                onPress={() => props.removeMachineFromList(machine)}>
                                                <ListItem.Content>
                                                    <Icon>
                                                        {<MaterialIcons name='cancel' size={15} color={theme.indigo4} />}
                                                    </Icon>
                                                    <ListItem.Title>
                                                        {getDisplayText(machine)}
                                                    </ListItem.Title>
                                                </ListItem.Content>
                                            </ListItem>
                                        )}
                                        <PbmButton
                                            title={'Submit Location'}
                                            onPress={() => setShowSuggestLocationModal(true)}
                                        />
                                    </SafeAreaView>
                                </Pressable>
                            </View>}
                    </KeyboardAwareScrollView>
                )
            }}
        </ThemeContext.Consumer>
    )
}

const getStyles = theme => StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: theme.base1
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        color: theme.pink1,
        textAlign: 'center'
    },
    title: {
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'boldFont',
        color: theme.text2
    },
    preview: {
        fontSize: 15,
        marginRight: 25,
        marginLeft: 25
    },
    pageTitle: {
        paddingVertical: 10,
        backgroundColor: theme.pink2
    },
    pageTitleText: {
        textAlign: 'center',
        fontFamily: 'regularItalicFont',
        fontSize: 18,
        color: theme.text3
    },
    textInput: {
        backgroundColor: theme.white,
        borderColor: theme.indigo4,
        color: theme.text,
        borderWidth: 1,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    radius10: {
        borderRadius: 10,
    },
    viewPicker: {
        borderRadius: 25,
        elevation: 6,
        backgroundColor: theme.white,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        fontFamily: 'boldFont',
    },
    picker: {
        backgroundColor: '#ffffff',
    },
    hr: {
        marginLeft: 25,
        marginRight: 25,
        height: 2,
        marginTop: 10,
        backgroundColor: theme.indigo4
    },
    success: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10
    },
    error: {
        color: theme.red2
    },
    plusButton: {
        color: theme.red2,
        fontSize: 24
    },
    addMachinesContainer: {
        marginBottom: 15,
        marginHorizontal: 20,
    },
    addMachinesButton: {
        backgroundColor: theme.white,
        borderRadius: 25,
    },
    listContainerStyle: {
        backgroundColor: theme.white,
        paddingTop: 0
    },
    buttonContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    containerStyle: {
        marginTop: 0,
        marginHorizontal: 20,
    },
})

SuggestLocation.propTypes = {
    error: PropTypes.object,
    locations: PropTypes.object,
    operators: PropTypes.object,
    user: PropTypes.object,
    navigation: PropTypes.object,
    location: PropTypes.object,
    clearError: PropTypes.func,
    removeMachineFromList: PropTypes.func,
    clearSelectedState: PropTypes.func,
    suggestLocation: PropTypes.func,
    setSelectedOperator: PropTypes.func,
    setSelectedLocationType: PropTypes.func,
    resetSuggestLocation: PropTypes.func,
}

const mapStateToProps = ({ error, location, locations, operators, user }) => ({ error, location, locations, operators, user })
const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(clearError()),
    removeMachineFromList: machine => dispatch(removeMachineFromList(machine)),
    clearSelectedState: () => dispatch(clearSelectedState()),
    suggestLocation: (goBack, locationDetails) => dispatch(suggestLocation(goBack, locationDetails)),
    setSelectedOperator: id => dispatch(setSelectedOperator(id)),
    setSelectedLocationType: id => dispatch(setSelectedLocationType(id)),
    resetSuggestLocation: () => dispatch(resetSuggestLocation())
})
export default connect(mapStateToProps, mapDispatchToProps)(SuggestLocation)
