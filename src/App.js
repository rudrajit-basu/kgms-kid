import React from 'react';
import {BrowserView,MobileView} from 'react-device-detect';
import KDesk from './kgms/KDesk'
import KMob from './kgms/KMob'
import * as firebase from "firebase/app";
import firebaseConfig from './kgms/firebaseConfig'


class App extends React.Component {
 

  render(){
    !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
    return (
        <div style={{scrollBehavior:'smooth'}}>
            <BrowserView>
              <KDesk firebase={firebase}/>
            </BrowserView>
            <MobileView>
              <KMob firebase={firebase}/>
            </MobileView>
        </div>
  );
  }
}

export default App;