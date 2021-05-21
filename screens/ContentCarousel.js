import * as React from 'react';
import { Text,View,SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';



 class ContentCarousel extends React.Component {

    
    state = {
        activeIndex:0,
        carouselItems:this.props.filteredCities
    }


    get pagination () {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: -6,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    _renderItem({item,index}){
        return (
            <>
                <View  style={{
                    backgroundColor:'black',
                    borderRadius: 30,
                    height: 400,
                    width: '100%',
                    padding: 0,
                    marginLeft: 30,
                    marginRight: 30,
                    overflow:'hidden' }}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate("Itineraries",{idCity: item._id})}>
                        <ImageBackground style={styles.image} source ={{uri: item.img}} >
                            
                        <Text style={{fontSize: 30, zIndex:20, textAlign:'center',top:50, backgroundColor:'rgba(0, 0, 0, 0.850)', color:'#e2ceb5'}}>{item.name}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </>

        )
    }

    render() {

        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'black', paddingBottom:50, paddingTop: 50,}}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', backgroundColor:'black', overflow:'hidden' }}>
                <Carousel
                  layout={"tinder"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={10}
                  itemWidth={335}
                  renderItem={this._renderItem}
                  loop={true}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
            { this.pagination }
          </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
            filteredCities: state.cityReducer.filteredCities
        }
    }
    


export default connect(mapStateToProps) ( ContentCarousel)



const styles = StyleSheet.create({
    image: {
        opacity:0.8,
        borderRadius: 30,
        width:"100%",
        height:'100%',
    },
})
