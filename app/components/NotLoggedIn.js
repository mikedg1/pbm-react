import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { PbmButton } from './'

class NotLoggedIn extends Component {
    render(){
        return(
            <View>
                <Text style={s.pageTitle}>{this.props.title}</Text>
                <Text style={s.hiya}>{this.props.text}</Text>
                <PbmButton
                    title={"Login"} 
                    onPress={() => this.props.onPress()}
                    accessibilityLabel="Login"
                />
            </View>
        )
    }
}

const s = StyleSheet.create({
    pageTitle: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 15,
        paddingTop: 10
    },
    hiya: {
        fontStyle: 'italic',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        color: '#4b5862',
        textAlign: 'center'
    },
})

NotLoggedIn.propTypes = {
    navigation: PropTypes.object,
    text: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func
}

export default NotLoggedIn
