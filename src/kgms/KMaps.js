import React from 'react';
import './KSwipe.css';
import {isMobile} from 'react-device-detect';


class KMaps extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {isMapsLoaded: false};
    this.handleOnMapLoad = this.handleOnMapLoad.bind(this);
  }

  handleOnMapLoad(event) {
    this.setState({isMapsLoaded: true});
    event.preventDefault();
  }


  render() {
    const apiUrl = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJcdhAllx55DkR0J9wi-4RhsQ&key=AIzaSyAThn8f8UwMdfWGTxY37y9GAmviciZ33iE&zoom=18";
    return (
        <div className={isMobile ? 'mKmapContainer' : 'kmapContainer'} key='cm'>
          <div align="center" style={{display: this.state.isMapsLoaded ? 'none' : 'block'}}>
            <p className={isMobile ? 'mcTextMain' : 'dcTextMain'}>{'Loading maps...'}</p></div>
           <iframe className="kmap BorderRound" style={{border:0}} loading="lazy" 
              allowFullScreen key='gm' title='google maps for kgms'
              src={apiUrl} onLoad={this.handleOnMapLoad} referrerPolicy="origin"></iframe> 
        </div>
    );
  }
}


export default KMaps;
