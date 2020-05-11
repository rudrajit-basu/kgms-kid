import React from 'react';
import './KSwipe.css';
import {isMobile} from 'react-device-detect';

const gKey = "AIzaSyAMyKBIlm6id4yPgd_CsF5pe-r8dAMpiVs";
// const apiUrl = "https://maps.googleapis.com/maps/api/js?key="+gKey+"&v=3.39&libraries=geometry,drawing,places";
const apiUrl = "https://maps.googleapis.com/maps/api/js?key="+gKey+"&v=weekly&libraries=places";


class KMaps extends React.PureComponent {

  constructor(props){
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
    this.gmaps = React.createRef();
  }

  async onScriptLoad() {
    // let myLatlng = {lat: 26.5267799, lng: 88.7192322};
    let myLatlng = {lat: 26.5268370, lng: 88.7192360};
    let infoString = `<b> Khela Ghar Montessory School </b>`;
    let mapOptions = {
      center: myLatlng,
      zoom: 18,
      gestureHandling: 'auto',
      zoomControl: true,
      scaleControl: true
    };
    let map = new window.google.maps.Map(this.gmaps, mapOptions);
     let marker = new window.google.maps.Marker({
        position: myLatlng,
        draggable: false,
        animation: window.google.maps.Animation.DROP,
        title: 'kgms'
      });
     // marker.setMap(map);
     let infowindow = new window.google.maps.InfoWindow({
        content: infoString,
      });
     marker.addListener('click',() => {
        marker.setAnimation(null);
        infowindow.open(map,marker);
     });
     this.timerID3 = setTimeout(() => marker.setMap(map),900);
     this.timerID4 = setTimeout(() => infowindow.open(map,marker),1800);
     this.timerID5 = setInterval(() => {
      if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
          infowindow.open(map,marker);
        } else {
          infowindow.close();
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
     },8000);
     // infowindow.open(map,marker);
     // this.gmaps.style.visibility = 'visible';
     // window.google.maps.event.trigger(map, 'resize');
    // this.props.onMapLoad(map)
    // if (typeof window.google === 'object' && typeof window.google.maps === 'object'){
    //   console.log('loaded');
    // }
    // map.addListener('tilesloaded',()=>{
    //   console.log('tiles loaded');
    // });
  }

  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = apiUrl;
      script.id = 'googleMaps';
      script.async = true;
      window.document.body.appendChild(script);
      // this.gmaps.appendChild(script);
      // script.addEventListener('load', e => {
      //   this.onScriptLoad();
      // })
      script.onload = () => {        
        // this.onScriptLoad();
        this.timerID1 = setTimeout(()=>this.onScriptLoad(),400);
        // console.log('maps after loading scripts');
      };      
    } 
    else {
      // this.onScriptLoad();
      this.timerID2 = setTimeout(()=>this.onScriptLoad(),400);
      // console.log('maps from scripts');
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timerID1);
    clearTimeout(this.timerID2);
    clearTimeout(this.timerID3);
    clearTimeout(this.timerID4);
    clearInterval(this.timerID5);
  }


  render() {    
    return (
        <div className={isMobile ? 'mKmapContainer' : 'kmapContainer'} key='cm'>
          <div className="kmap BorderRound" ref={g => this.gmaps = g} key='gm'/>
        </div>
    );
  }
}


export default KMaps;
