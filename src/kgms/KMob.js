import React, {Suspense} from 'react';
import './MStyle.css';
import HHM from './img/main/HHM.png';
import H4 from './img/main/H4.png';
import B1 from './img/main/B1.png';
import B2 from './img/main/B2.png';
import B3 from './img/main/B3.png';
import B4 from './img/main/B4.png';
import B5 from './img/main/B5.png';
import F1 from './img/main/F1.png';
import AA from'./img/main/AA.png';
import T1 from'./img/main/T1.png';
import KData from './content/KData';
import O2 from './img/main/O2.png';
import FV from './img/main/fv.png';
import Pl from './img/main/PlBtn.png';
import GT from './img/main/gtop.png';
// import KSwipe from './KSwipe';
// import KMaps from './KMaps';
// import KContactForm from './KContactForm';
import "firebase/firestore";
import "firebase/analytics";

const KSwipe = React.lazy(() => import('./KSwipe'));
const KMaps = React.lazy(() => import('./KMaps'));
const KContactForm = React.lazy(() => import('./KContactForm'));

const kJsonMData = KData;

class KMob extends React.Component{

	constructor(props){
		super(props);
		this.state = {isHamB:false, currentMButton: 'home', ismModal:false, mmodalMsg:'',
						mKEvents:[{id:0, header:"Please wait... Fetching Events >>", date:"", desc:""}],
						ismEvenTrig:false, mEventNum:0, ismSunAnimate: false, ismMainHeaderAnimate: false,
						ismFooterAnimation: false, isMVidModal: false, MVidModalSrc: '', isMShowLoading: true,
						isShowToTop: false};
		this.handleHamB = this.handleHamB.bind(this);
		this.handleModalButton = this.handleModalButton.bind(this);
		this.handleMButtonClick = this.handleMButtonClick.bind(this);
		this.getMContent = this.getMContent.bind(this);
		this.handleMModalClose = this.handleMModalClose.bind(this);
		this.handleMModalStart = this.handleMModalStart.bind(this);
		this.mFetchEvents = this.mFetchEvents.bind(this);
		this.handleMHistoryPop = this.handleMHistoryPop.bind(this);
		this.getMEventsFrom = this.getMEventsFrom.bind(this);
		this.handleSunAnimation = this.handleSunAnimation.bind(this);
		this.handleMainHeaderAnimation = this.handleMainHeaderAnimation.bind(this);
		this.handleFooterAnimation = this.handleFooterAnimation.bind(this);
		this.getFeaturedVideoFrom = this.getFeaturedVideoFrom.bind(this);
		this.getMVideoPlayer = this.getMVideoPlayer.bind(this);
		this.handleStartMVidModal = this.handleStartMVidModal.bind(this);
		this.handleCloseMVidModal = this.handleCloseMVidModal.bind(this);
		this.handleMOnYtLoad = this.handleMOnYtLoad.bind(this);
		this.handleMAdmClick = this.handleMAdmClick.bind(this);
		this.handleGtTopDisplay = this.handleGtTopDisplay.bind(this);
		this.animateScrollToElem = this.animateScrollToElem.bind(this);
		this.handleGtTopClick = this.handleGtTopClick.bind(this);
		this.bodyRef = React.createRef();
	}

	async mFetchEvents(){
		const db = this.props.firebase.firestore();
		let unsubscribe = db.collection("kgms-events").orderBy("tagId")
							.onSnapshot((querySnapshot) => {
								let kevents = [];
								let knum = 0;
								querySnapshot.forEach((doc) => {
									// console.log(`${doc.id} => ${doc.data().desc}`);
									kevents.push({id:doc.data().tagId,header:doc.data().header,date:doc.data().date,desc:doc.data().desc});
									knum ++;
								});
									if(knum === 0){
										this.setState({mKEvents:[{id:0,header:"No events available !",date:"",desc:""}],ismEvenTrig:true});
									}else{
										this.setState({mKEvents:kevents,ismEvenTrig:true,mEventNum:knum});
									}
							},(error)=>{
								this.setState({mKEvents:[{id:0,header:"Something went wrong. Please try later. >>",date:"",desc:""}]});
								console.log(`Error: ${error}`);
							});

		this.dbmUnsubscribe = ()=>{
			unsubscribe();
			if(this.state.mEventNum === 0){
				this.setState({mKEvents:[{id:0,header:"Please check the internet connection and try later. >>",date:"",desc:""}]});
			}
			// console.log('Offline');
		};
		window.addEventListener('offline', this.dbmUnsubscribe, false);

		this.dbmSubscribe = ()=>{
			unsubscribe = db.collection("kgms-events").orderBy("tagId")
							.onSnapshot((querySnapshot) => {
								let kevents = [];
								let knum = 0;
								querySnapshot.forEach((doc) => {
									// console.log(`${doc.id} => ${doc.data().desc}`);
									kevents.push({id:doc.data().tagId,header:doc.data().header,date:doc.data().date,desc:doc.data().desc});
									knum ++;
								});
									if(knum === 0){
										this.setState({mKEvents:[{id:0,header:"No events available !",date:"",desc:""}],ismEvenTrig:true});
									}else{
										this.setState({mKEvents:kevents,ismEvenTrig:true,mEventNum:knum});
									}
									// this.setState({mKEvents:kevents,ismEvenTrig:true,mEventNum:knum});
							},(error)=>{
								this.setState({mKEvents:[{id:0,header:"Something went wrong. Please try later. >>",date:"",desc:""}]});
								console.log(`Error: ${error}`);
							});
			// console.log('Online');
		};
		window.addEventListener('online', this.dbmSubscribe, false);
	}

	handleMModalStart(msg){
		this.setState({ismModal: true,mmodalMsg: msg});
	}

	handleMModalClose(event){
		this.setState({ismModal: false,mmodalMsg: ''});
		event.preventDefault();
	}

	async handleHamB(event){
		if(!this.state.isHamB){
			document.addEventListener('click', this.handleModalButton, false);
		}else{
			document.removeEventListener('click', this.handleModalButton, false);		
		}
		this.setState(prevState => ({isHamB: !prevState.isHamB}));
		event.preventDefault();
	}

	handleModalButton(e){

		if(this.bModal.contains(e.target)){
			e.preventDefault();
		}else{
			this.handleHamB(e);
		}

		// event.preventDefault();
	}

	componentDidMount(){
		window.addEventListener('popstate', this.handleMHistoryPop, false);
		window.history.replaceState({mPage: this.state.currentMButton},'','');
		this.kMRefreshInfo = () => {
			this.handleMModalStart('Please close and re-start the website to get new content !');
		};
		window.addEventListener('kRefresh', this.kMRefreshInfo, false);
		try{
			this.props.firebase.analytics();
		}catch(e){
			console.error(e);
		}
	}

	componentWillUnmount(){
		window.removeEventListener('popstate', this.handleMHistoryPop, false);
		if(this.state.ismEvenTrig){
			window.removeEventListener('offline', this.dbmUnsubscribe, false);
			window.removeEventListener('online', this.dbmSubscribe, false);
		}
		window.removeEventListener('kRefresh', this.kMRefreshInfo, false);
		clearTimeout(this.timerGTop);
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevState.mKEvents.length !== this.state.mKEvents.length) {
			return true;
		}
		if (prevState.currentMButton !== this.state.currentMButton) {
			if(this.state.currentMButton === 'events' && !this.state.ismEvenTrig){
				this.mFetchEvents();
				// console.log('mFetchEvents triggered.....');
			}
			return true;		
		}
		
		return null;
	}


	 componentDidUpdate(prevProps, prevState, snapshot) {
	 	// this.handleGtTopDisplay();
	 	if (snapshot !== null) {
	 		// console.log(`snapshot = ${snapshot}`);
	 		if (snapshot) {
	 			this.timerGTop =  setTimeout(() => this.handleGtTopDisplay(this.bodyRef.current.clientHeight), 100);
	 		}
	 		// this.handleGtTopDisplay(snapshot);
	 	}
	 }

	async handleGtTopDisplay(clientHeight) {
		// console.log(`clientHeight: ${clientHeight}`);
		// const clientHeight = this.bodyRef.current.clientHeight;
		if (clientHeight > 1000) {
			if (!this.state.isShowToTop)
			this.setState({isShowToTop: true});
		} else {
			if (this.state.isShowToTop)
			this.setState({isShowToTop: false});
		}
	}

	async animateScrollToElem(position){
		const animeTime = 42;
		const curPos = Math.floor(window.scrollY);
		// console.log(`position --> ${position} & curPos --> ${curPos}`);
		if(curPos > position){
			let steps = curPos <= 4000 ? 5 : 3;
			// console.log(`steps --> ${steps}`);
			if(steps > 0) {
				const sDist = curPos / steps;
				let cPos = curPos;
				this.scrollTimer = setInterval(() => {
					if(steps >= 1){
						cPos = cPos - sDist;
						window.scrollTo(0, cPos);
						steps--;
						// console.log(`curPos --> ${curPos}`);
					} else {
						window.scrollTo(0, position);
						clearInterval(this.scrollTimer);
						this.scrollTimer = undefined;
					}
				}, animeTime);
			} else {
				window.scrollTo(0, position);
				// console.log('steps === 0');
			}
		} 
	}

	handleGtTopClick(event) {
		const tryAnimeScroll = async (vPos) => {
			try{
				this.animateScrollToElem(vPos);
			}catch(e){
				window.scrollTo(0, vPos);
			}
		}
		tryAnimeScroll(0);
		event.preventDefault();
	}

	handleMHistoryPop(event){
		// console.log(`History state: ${JSON.stringify(event.state)}`);
		if(this.state.isMVidModal){
			this.handleCloseMVidModal(event);
		}
		if(event.state !== null){
			this.setState({currentMButton: event.state.mPage});
		}else{
			window.history.back();
		}
	}

	async handleSunAnimation(event) {
		if(event.target.classList !== null && event.target.classList !== undefined) {
			if(event.target.classList.contains('mImageRotateDelay')){
				event.target.classList.remove('mImageRotateDelay');
				event.target.classList.add('mImageRotate');
			} else {
				this.setState(prevState=>({ismSunAnimate: !prevState.ismSunAnimate}));
			}
		}
		event.preventDefault();
	}

	async handleMainHeaderAnimation(event) {
		if(event.target.classList !== null && event.target.classList !== undefined) {
			if(!event.target.classList.contains('mImageFlash')){
				event.target.classList.add('mImageFlash');
			} else {
				this.setState(prevState=>({ismMainHeaderAnimate: !prevState.ismMainHeaderAnimate}));
			}
		}
		event.preventDefault();
	}

	async handleFooterAnimation(event) {
		this.setState(prevState=>({ismFooterAnimation: !prevState.ismFooterAnimation}));
		event.preventDefault();
	}

	async handleMButtonClick(event){
		this.handleHamB(event);		

		if(this.state.currentMButton !== event.target.name){
			window.history.pushState({mPage: event.target.name},'','');
			this.setState({currentMButton: event.target.name});
		}
		// if(event.target.name === 'events' && !this.state.ismEvenTrig){
		// 	this.mFetchEvents();
		// 	console.log('mFetchEvents triggered.....');
		// }
	}

	async handleMAdmClick(event) {
		window.history.pushState({mPage: event.target.name},'','');
		this.setState({currentMButton: event.target.name});
		event.preventDefault();
	}

	async handleStartMVidModal(src){
		this.setState({isMVidModal: true, MVidModalSrc: src});	
	}

	async handleCloseMVidModal(event){
		this.setState({isMVidModal: false, MVidModalSrc: '', isMShowLoading: true});
		event.preventDefault();
	}

	async handleMOnYtLoad(event){
		if(this.state.isMVidModal){
			// console.log('yeah');
			this.setState({isMShowLoading: false});
		}
		event.preventDefault();
	}

	getMEventsFrom(){
		// eslint-disable-next-line
		const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
		const isDynamicUrl = (str) => {
			if(urlRegex.test(str)){
				return <a rel="noopener noreferrer" href={str} target="_blank">{str}</a>;
			} else {
				return str;
			}
		}
		let lineKey = 1;
		let spaceKey = 1;
		let divKey = 89;
		const eventListItems = this.state.mKEvents.map((KEvent) =>
			<div className="mTextBlk" key={(divKey++).toString()+'gmef'}>
				<p className="mTextGap2"><b className="mNoticeDec mTextSubHead">{KEvent.id}</b></p>
				<p ><b className="mTextSubHead">{KEvent.header}</b></p>
				<p><b className="mTextMain">{KEvent.date}</b></p>
				<p><b className="mTextMain">{KEvent.desc.split('\n').map((item) => {
					return <span key={(lineKey++).toString()+'mlk'}>{item.split(' ').map((sItem)=>{
						return <span key={(spaceKey++).toString()+'msk'}>{isDynamicUrl(sItem)}<span className="mWordGap"/> </span>
					})}<br/></span>
				})}</b></p>
			</div>
		);

		return eventListItems;		
	}

	getFeaturedVideoFrom(){
		const startVideo = (embedUrl) => {
			this.handleStartMVidModal(embedUrl); 
		};
		const handleShowGTop = () => {
			this.timerGTop =  setTimeout(() => this.handleGtTopDisplay(this.bodyRef.current.clientHeight), 100);
		}
		let featuredVideoListItems = this.props.featuredVideosList.map((vidL, index) => {
			let embedUrl = `https://www.youtube.com/embed/${vidL.videoId}`;
			if (index === (this.props.featuredVideosList.length - 1)) {
				return(
					<div key={vidL.id} className="mTextGap5">
						<div style={{position: 'relative'}} align='center'>
							<img src={vidL.thumbnail} alt={vidL.title} className="mTaskImg"
								referrerPolicy="same-origin" loading="lazy" onClick={()=>startVideo(embedUrl)}
								onLoad={() => handleShowGTop()}/>
							<img src={Pl} alt="playBtton" className="mPlayBtnImg" onClick={()=>startVideo(embedUrl)}/>		
						</div>
						<p><b className="mTextMain"><u>{vidL.title}</u></b></p>	
					</div>
				);
			} else {
				return(
					<div key={vidL.id} className="mTextGap5">
						<div style={{position: 'relative'}} align='center'>
							<img src={vidL.thumbnail} alt={vidL.title} className="mTaskImg"
								referrerPolicy="same-origin" loading="lazy" onClick={()=>startVideo(embedUrl)}/>
							<img src={Pl} alt="playBtton" className="mPlayBtnImg" onClick={()=>startVideo(embedUrl)}/>		
						</div>
						<p><b className="mTextMain"><u>{vidL.title}</u></b></p>	
					</div>
				);
			}
		});

		return featuredVideoListItems;
	}

	getMVideoPlayer(src){
		if(src !== ''){
			return(
				<div className="mTaskVideoContainer">
					<div align="center" style={{display: this.state.isMShowLoading ? 'block' : 'none'}}>
						<p className="mTextMainWhiteTag">{'Loading...'}</p></div>
					<iframe className="dTaskVideo" src={src} samesite="None; secure"
						title="modal video" type="text/html" allowFullScreen="allowfullscreen" referrerPolicy="same-origin"
						frameBorder="0" loading="lazy" onLoad={this.handleMOnYtLoad}/>
				</div>
			);
		} else {
			return(
				<div/>
			);	
		}
	}

	getMContent(button){
		const suspenseLoading = <div className='mTextMain' align='center'>Loading...</div>;
		if(button === 'home'){
			const openLink = (link) => {
				window.open(link);
			}
			return(
				
				<div className="pt-page-rotateUnfoldRight" key={button}>
					<div className="mBodyContent2">
						<div align="center">
							<img src={T1} alt="kgms tag" className="mTagImg" referrerPolicy="same-origin" loading="lazy"/>
						</div>
						<Suspense fallback={suspenseLoading}>
						<div align="center" className="mTextGap3">
							<KSwipe />
						</div>
						</Suspense>
						<div align="center" className="mTextGap4">
							<img src={O2} alt="ad" className="mAdImh" referrerPolicy="same-origin" loading="lazy"
								name="contactus" onClick={this.handleMAdmClick}/>
						</div>
						<div align="center" className="mTextGap2">
							<button className="mLoginButton" onClick={()=>openLink("https://kgmskid-study.web.app/")}
								>{'Student Login >'}</button>
						</div>
						<div align="center" className="mTextGap2">
							<button className="mLoginButton" onClick={()=>openLink("https://khela-ghar-montessori-school.business.site/")}
								>{'School Site >'}</button>
						</div>
						<div align="center" className="mTextGap5" style={{display: this.props.featuredVideosList.length > 0 ? 'block' : 'none'}}>
							<img src={FV} alt="featuredVideo" className="mFvImh" referrerPolicy="same-origin" loading="lazy"/>
							{this.getFeaturedVideoFrom()}
						</div>
					</div>
				</div>
			);
		} else if(button==='aboutus'){
			return(
				<div className="mBlue mBord mBoxShadow pt-page-rotateUnfoldRight" key={button}>
					<div className="mBodyContent2">
						<p><b className="mTextHead">About Us</b></p>
						<hr className="mHrBlack"/>
						<div className="mTextBlk">
							<p className="mTextGap1"><b className="mTextMain">{kJsonMData.KAboutUs.para1}</b></p>
							<p className="mTextGap2"><b className="mTextMain">{kJsonMData.KAboutUs.para2}</b></p>
						</div>
						<div align="center" className="mTextGap3">
							<p align="center" className="mAbtusTag mTextSubHead"><b>|/ FACILITIES \|</b></p>
							<img src={AA} alt="AA" className="noSelect mAbtUsImg" referrerPolicy="same-origin" loading="lazy"/>
						</div>
					</div>
				</div>
			);
		} else if(button==='events'){
			return(
				<div className="mOrange mBord mBoxShadow pt-page-rotateUnfoldRight" key={button}>
					<div className="mBodyContent2">
						<p><b className="mTextHead">Events</b></p>
						<hr className="mHrBlack"/>
						{this.getMEventsFrom()}
					</div>
				</div>
			);
		} else if(button==='programs'){
			return(
				<div className="mGreen mBord mBoxShadow pt-page-rotateUnfoldRight" key={button}>
					<div className="mBodyContent2">
						<p><b className="mTextHead">Programs</b></p>
						<hr className="mHrBlack"/>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title1}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title1_desc}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title2}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title2_desc}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title3}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title3_desc1}</b></p>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title3_desc2}</b></p>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title3_desc3}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title4}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title4_desc}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title5}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title5_desc}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title6}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title6_desc}</b></p>
						</div>
						<div className="mTextBlk">
							<p className="mTextGap2"><b className="mTextSubHead">{kJsonMData.KPrograms.title7}</b></p>
							<hr className="mHrBlackSub" align="left"/>
							<p className="mTextGap3"><b className="mTextMain">{kJsonMData.KPrograms.title7_desc}</b></p>
						</div>
					</div>
				</div>
			);
		} else if(button==='contactus'){
			return(
				<div className="mSeaBlue mBord mBoxShadow pt-page-rotateUnfoldRight" key={button}>
					<div className="mBodyContent2">						
						<Suspense fallback={suspenseLoading}>
						<div>
							<KContactForm startModal={(msg) => this.handleMModalStart(msg)}/>
						</div>
						<div align="center" className="mTextGap2">
							<KMaps key="gmaps"/>
						</div>
						</Suspense>
					</div>
				</div>
			);
		}	
	}

	render(){
		const hamB = 'hamburger hamburger--spin';
		const active_hamB = 'hamburger hamburger--spin is-active';
		return(
			<div className="mApp" /*app start*/>
				<div /*header1 start*/>
					<div className="Row">
						<div className="Column TopLeft">
							<div>
								<button className={this.state.isHamB ? active_hamB : hamB} type="button" onClick={this.handleHamB}>
								  <span className="hamburger-box">
								    <span className="hamburger-inner"></span>
								  </span>
								</button>
							</div>
						</div>
						<div className="Column TopRight" align="right">
							<img src={H4} alt="sun" onClick={this.handleSunAnimation} key={`mSunA${this.state.ismSunAnimate.toString()}`}
								className="mSun noSelect mImageRotateDelay" referrerPolicy="same-origin" loading="lazy"/>
						</div>
					</div>
					<div className="m-modal" style={this.state.isHamB ? {display:'block'} : {display:'none'}}  align="center" /*Button Modal Start*/>
						<div className="m-modal-content moveFromLeft" ref={m => this.bModal = m} align="left">
							<ul style={{listStyleType:'none'}}>
								<li>
									<input type="image" src={B1} alt="B1" className="mButton noSelect" name="home" onClick={this.handleMButtonClick}/>
								</li>
								<li>
									<input type="image" src={B2} alt="B2" className="mButton noSelect" name="aboutus" onClick={this.handleMButtonClick}/>
								</li>
								<li>
									<input type="image" src={B3} alt="B3" className="mButton noSelect" name="events" onClick={this.handleMButtonClick}/>
								</li>
								<li>
									<input type="image" src={B4} alt="B4" className="mButton noSelect" name="programs" onClick={this.handleMButtonClick}/>
								</li>
								<li>
									<input type="image" src={B5} alt="B5" className="mButton noSelect" name="contactus" onClick={this.handleMButtonClick}/>
								</li>
							</ul>
						</div>
					</div /*Button Modal End*/>	
				</div /*header1 end*/>
				<div align="left" className="hDiv" /*header2 start*/>
					<img src={HHM} alt="khela ghar title" className="mH1 noSelect" referrerPolicy="same-origin"
						key={`mHHMA${this.state.ismMainHeaderAnimate.toString()}`} onClick={this.handleMainHeaderAnimation} 
						loading="lazy"/>
				</div /*header2 end*/>
				<div style={{width:'100%'}} ref={this.bodyRef} /*body start*/>
					<div className="mBodyContent1">
						{this.getMContent(this.state.currentMButton)}
					</div>
				</div /*body end*/>
				<div style={{display:this.state.ismModal ? 'block' : 'none'}} className="mm-modal"/*modal start*/>
					<div className="mm-modal-content mBord">
						<div className="Row">
							<div className="Column mModalLeft">
								<p style={{lineHeight:'1.3'}} className="mTextMain">{this.state.mmodalMsg}</p>
							</div>
							<div className="Column mModalRight">
								<span className="mClose" onClick={this.handleMModalClose}>&times;</span>
							</div>
    					</div>
  					</div>
				</div /*modal end*/>
				<div style={{display: this.state.isMVidModal ? 'block' : 'none'}} 
					className="mImgModal" /*video modal starts*/>
					<span className="mImgModalClose" 
						onClick={this.handleCloseMVidModal}>&times;</span>
					<div> 
						{this.getMVideoPlayer(this.state.MVidModalSrc)}
					</div>
				</div /*video modal ends*/>
				<div style={{position: 'relative', display: this.state.isShowToTop ? 'block': 'none'}}>
					<img src={GT} alt="goToTop" className="mGoToTopImg" onClick={this.handleGtTopClick}/>
				</div>
				<div align="center" style={{marginTop:'2em'}} onClick={this.handleFooterAnimation} /*footer start*/>
					<div align="center">
						<span style={{visibility: this.state.ismFooterAnimation ? 'visible' : 'hidden'}}
							className="mFooterTip mTextMain">&#169; {'Khela Ghar Montessory School, 2021-22'}</span>
					</div>
					<img src={F1} alt="footer" className="mFooter mTextGap3 noSelect" referrerPolicy="same-origin"
						key="mFA" loading="lazy"/>
				</div /*footer ends*/>
			</div /*app end*/>
		);
	}
}

export default KMob;