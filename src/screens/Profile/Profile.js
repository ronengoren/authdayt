import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import profileData from './profileData.json'
import ProfileStyles from './ProfileStyles'
import PhotoButton from './PhotoButton'
const styles = StyleSheet.create({ ...ProfileStyles })

class Profile extends React.Component {
   static propTypes = {
    // img: PropTypes.string.isRequired,
    // detail: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  

  static defaultProps = {
    containerStyle: {},
  }

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>For Sale Property Details</Text>
        <Text style={styles.subDetailText}>tetete</Text>
      </View>
    )
  }
  renderNavigator = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>DateType1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>DateType2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
          <Text style={styles.navigatorText}>DateType3</Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderDescription = () => {
    return (
      <View>
        <Text style={styles.priceText}>Name</Text>
        <Text style={styles.descriptionText}>A story the system create per his date types</Text>
        <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
        <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>
      </View>
    )
  }
  renderContactHeader = () => {
    const Image = require('../../assets/images/female1.jpg');
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={Image}
            style={styles.coverImage}
          >
            <Text style={styles.SwipeText}>Swipe</Text>
            <PhotoButton />
          </ImageBackground>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.mainviewStyle}>
        <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.cardContainer}>
        {this.renderContactHeader()}
        </View>
        </View>
        <View style={styles.productRow}>{this.renderNavigator()}</View>
        <View style={styles.productRow}>{this.renderDescription()}</View>
        <View style={styles.productRow}>{this.renderDetail()}</View>

        </ScrollView>
        <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}




export default Profile;
