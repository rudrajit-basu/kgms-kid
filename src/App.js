import React, {Suspense} from 'react';
import {BrowserView,MobileView} from 'react-device-detect';
import KDesk from './kgms/KDesk'
import KMob from './kgms/KMob'
import * as firebase from "firebase/app";
import firebaseConfig from './kgms/firebaseConfig'

document.cookie = "ktname=kgmswebapp; SameSite=None; Secure";
document.cookie = "ktname-legacy=kgmswebapp; Secure";

const apiJsUrl = "https://apis.google.com/js/api.js";
const apiKeyY = 'AIzaSyCjyx-Y-2yupi_mGz9YeaZvdGwutVM7LTw';
const yJsUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

class App extends React.Component {

 constructor(props) {
   super(props);
   this.state = {fVideoList: []};
   this.loadGapiClient = this.loadGapiClient.bind(this);
 }

 componentDidMount() {
   if (!window.gapi) {
     const script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = apiJsUrl;
     script.id = 'googleApis';
     script.async = true;
     window.document.body.appendChild(script);

     script.onload = () => {
       window.gapi.load('client', () => {
         this.loadGapiClient();
       });
     };
   } else {
     window.gapi.load('client', () => {
       this.loadGapiClient();
      });
   }
 }

 async loadGapiClient(){
     // Initializes the client with the API key and the Youtube API.
        window.gapi.client.init({
          'apiKey': apiKeyY,
          'discoveryDocs': [yJsUrl],
        })
        .then(() => {
          return window.gapi.client.youtube.playlistItems.list({
              "part": [
                "snippet"
              ],
              "playlistId": 'PLyjpT0r_xK0dQCxKg72NQ_fGU41A9jOoT',
              "maxResults": 10
            });

        }, (err) => {
          console.error("Youtube Execute error", err);
        })
        .then((response)=>{
          // console.log("GAPI client loaded for Youtube API PlaylistItems list !");
          //console.log("Youtube PlaylistItems Response ->", response);
          if (response !== null && response !== undefined) {
            let videoIdList = [];
            for (let i in response.result.items) {
              //console.log(response.result.items[i]);
              if (response.result.items[i].snippet.title !== 'Deleted video')
              videoIdList.push({id: response.result.items[i].id, videoId: response.result.items[i].snippet.resourceId.videoId,
                        title: response.result.items[i].snippet.title, thumbnail: response.result.items[i].snippet.thumbnails.standard.url});
            }
            if (videoIdList.length > 0) {
              // videoIdList.reverse();
              this.setState({fVideoList: videoIdList});
            }
          }
          
        },(err)=>{
          console.error("Error loading GAPI client for Youtube API PlaylistItems list !", err);
        });
  }

  render(){
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
    const suspenseLoadingD = <div style={{fontSize:'1.195em'}} align='center'>Loading...</div>;
    const suspenseLoadingM = <div className='mTextMain' align='center'>Loading...</div>;
    return (
        <div style={{scrollBehavior:'smooth'}}>
            <BrowserView>
              <Suspense fallback={suspenseLoadingD}>
                <KDesk firebase={firebase} featuredVideosList={this.state.fVideoList}/>
              </Suspense>
            </BrowserView>
            <MobileView>
              <Suspense fallback={suspenseLoadingM}>
                <KMob firebase={firebase} featuredVideosList={this.state.fVideoList}/>
              </Suspense>
            </MobileView>
        </div>
  );
  }
}

export default App;