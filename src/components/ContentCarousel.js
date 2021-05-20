import * as React from 'react';
import { Text,View,SafeAreaView, StyleSheet, Image, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default class ContentCarousel extends React.Component {


 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
            {id:1 , name: "San Sebastián", img: require('../assets/carousel/Sansebastian.jpg')},
            {id:2 , name: "Baku", img: require('../assets/carousel/Baku.jpg')},
            {id:3 , name: "Bariloche", img: require('../assets/carousel/Bariloche.jpg')},
            {id:4 , name: "Dublin", img: require('../assets/carousel/Dublin.jpg')},
            {id:5 , name: "Kirkjufell", img: require('../assets/carousel/Kirkjufell.jpg')},
            {id:6 , name: "Mallorca", img: require('../assets/carousel/Mallorca.jpg')},
            {id:7 , name: "Montreal", img: require('../assets/carousel/Montreal.jpg')},
            {id:8 , name: "Nürburg", img: require('../assets/carousel/Nürburg.png')},
            {id:9 , name: "Portimão", img: require('../assets/carousel/Portimao.jpg')},
            {id:10 , name: "Sochi", img: require('../assets/carousel/Sochi.png')},
            {id:11 , name: "Tokyo", img: require('../assets/carousel/Tokyo.jpg')},
            {id:12 , name: "Yidda", img: require('../assets/carousel/Yidda.jpg')}
        ]
      }
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
                <View style={{
                    backgroundColor:'black',
                    borderRadius: 30,
                    height: 400,
                    width: '100%',
                    padding: 0,
                    marginLeft: 30,
                    marginRight: 30,
                    overflow:'hidden' }}>
                    <ImageBackground style={styles.image} source ={item.img}>
                    <Text style={{fontSize: 30, zIndex:20, textAlign:'center',top:50, backgroundColor:'rgba(0, 0, 0, 0.850)', color:'#e2ceb5'}}>{item.name}</Text>
                    </ImageBackground>
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

const styles = StyleSheet.create({
    image: {
        opacity:0.8,
        borderRadius: 30,
        width:"100%",
        height:'100%',
    },
})
