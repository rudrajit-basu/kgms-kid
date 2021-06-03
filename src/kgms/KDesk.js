import React, {Suspense} from 'react';
import './KStyle.css';
import HH from './img/main/HH.png';
// import H1 from './img/main/H1.png';
// import H2 from './img/main/H2.png';
// import H3 from './img/main/H3.png';
import H4 from './img/main/H4.png';
import B1 from './img/main/B1.png';
import B2 from './img/main/B2.png';
import B3 from './img/main/B3.png';
import B4 from './img/main/B4.png';
import B5 from './img/main/B5.png';
import F1 from './img/main/F1.png';
import M1 from './img/main/M1.png';
import M2 from './img/main/M2.png';
import M3 from './img/main/M3.png';
import O1 from './img/main/O1.png';
import O2 from './img/main/O2.png';
import O3 from './img/main/O3.png';
import A1 from'./img/main/A1.png';
import A2 from'./img/main/A2.png';
import A3 from'./img/main/A3.png';
import A4 from'./img/main/A4.png';
import A5 from'./img/main/A5.png';
import A6 from'./img/main/A6.png';
import T2 from'./img/main/T2.png';
// import KSwipe from './KSwipe';
import KData from './content/KData';
// import KMaps from './KMaps';
// import KContactForm from './KContactForm';
import "firebase/firestore";
import "firebase/analytics";

const KSwipe = React.lazy(() => import('./KSwipe'));
const KMaps = React.lazy(() => import('./KMaps'));
const KContactForm = React.lazy(() => import('./KContactForm'));

// const img_HF = [{id:4,src:H1,alt:'H1'},{id:5,src:H2,alt:'H2'},{id:6,src:H3,alt:'H3'},{id:7,src:F1,alt:'F1'}];
// const img_B = [{id:20,src:B1,alt:'B1'},{id:21,src:B2,alt:'B2'},{id:22,src:B3,alt:'B3'},{id:23,src:B4,alt:'B4'},{id:24,src:B5,alt:'B5'}];
const img_M = [{id:15,src:M1,alt:'M1'},{id:16,src:M2,alt:'M2'},{id:17,src:M3,alt:'M3'}];
const img_O = [{id:10,src:O1,alt:'O1'},{id:11,src:O2,alt:'O2'},{id:12,src:O3,alt:'O3'}];
// const img_A = [{id:26,src:A1,alt:'A1'},{id:27,src:A2,alt:'A2'},{id:28,src:A3,alt:'A3'},{id:29,src:A4,alt:'A4'},{id:30,src:A5,alt:'A5'},{id:31,src:A6,alt:'A6'}];
const eImgL1 = <img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;
const eImgL2 = <img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect ImgFlip pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>; 
const eImgL3 = <img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect ImgTilt3 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;
const eImgL4 = <img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;

const eImgR1 = <img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;
const eImgR2 = <img src={img_O[2].src} alt={img_O[2].alt} style={{width:"55%"}} className="noSelect ImgTilt2 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;
const eImgR3 = <img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;
const eImgR4 = <img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect ImgFlip pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>;

const imgArrL = [eImgL1,eImgL2,eImgL3,eImgL4];
const imgArrR = [eImgR1,eImgR2,eImgR3,eImgR4];
const kJsonData = KData;

class KDesk extends React.Component{

	constructor(props){
		super(props);
		this.state = {currentButton:'home',isModal:false,modalMsg:'', kBodyNum: [],
						KEvents:[{id:0,header:"Please wait... Fetching Events >>",date:"",desc:""}],
						eventNum:0, isEvenTrig:false};
		this.getContent = this.getContent.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalStart = this.handleModalStart.bind(this);
		this.getLeftDeck = this.getLeftDeck.bind(this);
		this.getRightDeck = this.getRightDeck.bind(this);
		this.getEventsFrom = this.getEventsFrom.bind(this);
		this.fetchEvents = this.fetchEvents.bind(this);
		this.handleHistoryPop = this.handleHistoryPop.bind(this);
		this.handleCurrentDecoList = this.handleCurrentDecoList.bind(this);
		this.bodyRef = React.createRef();
	}


	async fetchEvents(){
		const db = this.props.firebase.firestore();
		db.collection("kgms-events").orderBy("tagId")
			.onSnapshot((querySnapshot) => {
				let kevents = [];
				let knum = 0;
				querySnapshot.forEach((doc) => {
					// console.log(`${doc.id} => ${doc.data().desc}`);
					kevents.push({id:doc.data().tagId,header:doc.data().header,date:doc.data().date,desc:doc.data().desc});
					knum ++;
				});
					if(knum === 0){
						this.setState({KEvents:[{id:0,header:"No events available !",date:"",desc:""}],isEvenTrig:true});
					}else{
						this.setState({KEvents:kevents,eventNum:knum,isEvenTrig:true});
					}
					this.timerDecor = setTimeout(() => this.handleCurrentDecoList(),1200);
			},(error)=>{
				this.setState({KEvents:[{id:0,header:"Something went wrong. Please try later. >>",date:"",desc:""}]});
				console.log(`Error: ${error}`);
				this.timerDecor = setTimeout(() => this.handleCurrentDecoList(),1200);
			});
	}


	componentDidMount(){
		window.addEventListener('popstate', this.handleHistoryPop,false);
		window.history.replaceState({page: this.state.currentButton},'','');
		this.kRefreshInfo = () => {
			this.handleModalStart('Please close and re-start the website to get new content !');
		};
		window.addEventListener('kRefresh', this.kRefreshInfo, false);
		try{
			this.props.firebase.analytics();
		}catch(e){
			console.error(e);
		}
	}

	componentWillUnmount(){
		window.removeEventListener('popstate',this.handleHistoryPop,false);
		window.removeEventListener('kRefresh', this.kRefreshInfo, false);
		clearTimeout(this.timerDecor);
	}

	handleHistoryPop(event){
		// console.log(`History state: ${JSON.stringify(event.state)}`);
		if(event.state !== null){
			this.setState({currentButton: event.state.page});
		}else{
			window.history.back();
		}
	}

	handleButtonClick(event){

		if(this.state.currentButton !== event.target.name){
			// console.log(`new content: ${event.target.name}`);
			window.history.pushState({page: event.target.name},'','');
			this.setState({currentButton: event.target.name});
		}
		
		event.preventDefault();
	}

	handleModalStart(msg){
		this.setState({isModal: true,modalMsg: msg});
	}

	handleModalClose(event){
		this.setState({isModal: false,modalMsg: ''});
		event.preventDefault();
	}


	getEventsFrom(){
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
		let divKey = 88;
		const eventListItems = this.state.KEvents.map((KEvent) => {
			// i++;
			// let refName = 'fEvent' + i.toString(); ref={f => this[`${'fEvent' + i.toString()}_ref`] = f}
			return (
				<div style={{marginTop:"40px"}} key={(divKey++).toString()+'gef'}>
					<div className="Row" >
						<div className="Column EventLeft" style={{paddingTop:'6px'}}>
							<p className="NoticeDec">{KEvent.id}</p>
						</div>
						<div className="Column EventRight dWordWrap">
							<h4 className="dMainHead dTextBlk"> {KEvent.header} </h4>
							<h4 style={{marginTop:'-10px'}} className="dMain dTextBlk">{KEvent.date}</h4>
							<h4 style={{marginTop:'-5px'}} className="dMain dTextBlkDesc">{KEvent.desc.split('\n').map((item) => {
								return <span key={(lineKey++).toString()+'lk'} className="spanStyl">{item.split(' ').map((sItem)=>{
									return <span key={(spaceKey++).toString()+'sk'}>{isDynamicUrl(sItem)}<span className="dWordGap"/> </span>
								})}<br/></span>
							})}</h4>
						</div>
					</div>
				</div>
			);
		});

		return(eventListItems);	
	}

	getRightDeck(button){
		if(button==='home'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'20%'}}>
						<img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.3%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="left" style={{marginTop:'75%'}}>
						<img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		} else if(button==='aboutus'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'0%'}}>
						<img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
					<div align="center" style={{marginTop:'120%'}}>
						<img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		} else if(button==='events'){
			let rNum = 1;
			const decoR = this.state.kBodyNum.map((dList)=>{
				if(rNum === 4){
					rNum = 0;
				}
				return(
					<div style={{marginTop:'225%'}} key={dList.toString()} align="center">
						{imgArrR[rNum++]}
					</div>
				);
			});
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'10%'}}>
						{imgArrR[0]}
					</div>
					{decoR}
				</div>
			);
		} else if(button==='programs'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'140%'}}>
						<img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
					<div align="center" style={{marginTop:'250%'}}>
						<img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect ImgFlip pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="center" style={{marginTop:'240%'}}>
						<img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		} else if(button==='contactus'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'25%'}}>
						<img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
					<div align="center" style={{marginTop:'125%'}}>
						<img src={img_O[2].src} alt={img_O[2].alt} style={{width:"55%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		}	
	}

	async handleCurrentDecoList(){
		if(this.bodyRef.current !== null){
			let bHeight = this.bodyRef.current.clientHeight;
			if( bHeight !== undefined && bHeight > 0){
				let i = bHeight / 550;
				let j = Math.floor(i);
				// console.log(`j = ${j}`);
				let k = [];
				while(j > 0){
					k.push(j);
					j--;
				}
				this.setState({kBodyNum: k});
			}
		}
	}

	getLeftDeck(button){
		if(button==='home'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'20%'}}>
						<img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
					<div align="right" style={{marginTop:'100%'}}>
						<img src={img_O[0].src} alt={img_O[0].alt} style={{width:"65%"}} className="noSelect ImgTilt pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		} else if(button==='aboutus'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'40%'}}>
						<img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="center" style={{marginTop:'150%'}}>
						<img src={img_O[2].src} alt={img_O[2].alt} style={{width:"55%"}} className="noSelect ImgTilt2 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
				</div>
			);
		} else if(button==='events'){
			let lNum = 1;
			const decoL = this.state.kBodyNum.map((dList)=>{
				if(lNum === 4){
					lNum = 0;
				}
				return(
					<div style={{marginTop:'225%'}} key={dList.toString()} align="center">
						{imgArrL[lNum++]}
					</div>
				);
			});
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'10%'}}>
						{imgArrL[0]}
					</div>
					{decoL}
				</div>
			);
		} else if(button==='programs'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'10%'}}>
						<img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="center" style={{marginTop:'210%'}}>
						<img src={img_M[0].src} alt={img_M[0].alt} style={{width:"22%"}} className="noSelect ImgFlip pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="center" style={{marginTop:'240%'}}>
						<img src={img_O[2].src} alt={img_O[2].alt} style={{width:"55%"}} className="noSelect ImgTilt2 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
					<div align="center" style={{marginTop:'240%'}}>
						<img src={img_M[1].src} alt={img_M[1].alt} style={{width:"29.4%"}} className="noSelect ImgTilt3 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		} else if(button==='contactus'){
			return(
				<div key={button}>
					<div align="center" style={{marginTop:'10%'}}>
						<img src={img_M[2].src} alt={img_M[2].alt} style={{width:"23%"}} className="noSelect ImgTilt2 pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>	
					<div align="center" style={{marginTop:'120%'}}>
						<img src={img_O[0].src} alt={img_O[0].alt} style={{width:"65%"}} className="noSelect ImgTilt pt-page-moveFromBottomFade" referrerPolicy="same-origin" loading="lazy"/>
					</div>
				</div>
			);
		}	
	}

	getContent(button){
		const suspenseLoading = <div style={{fontSize:'1.195em'}} align='center'>Loading...</div>;
		if(button==='home'){
			const openLink = (link) => {
				window.open(link);
			}
			return(
				<div style={{marginLeft:"10px",marginRight:"10px",paddingBottom:"50px"}} className="pt-page-rotateUnfoldRight" key={button}>
					<div style={{marginLeft:"10px",marginRight:"10px"}}>
						<div align="center">
							<img src={T2} alt="kgms tag" style={{width:'55.7%'}} className="noSelect" referrerPolicy="same-origin" loading="lazy"/>
						</div>
						<Suspense fallback={suspenseLoading}>
						<div align="center" style={{marginTop:'38px'}}>
							<KSwipe />
						</div>
						</Suspense>
						<div align="center" style={{marginTop:'45px'}}>
							<img src={img_O[1].src} alt={img_O[1].alt} style={{width:'43%'}} className="noSelect" referrerPolicy="same-origin" loading="lazy"/>
						</div>
						<div align="center" style={{marginTop:'55px'}}>
							<div className="Row">
								<div className="Column" style={{width: '50%'}}>
									<button className="dLoginButton" onClick={()=>openLink("https://khela-ghar-montessori-school.business.site/")}
										>{'School Site >'}</button>
								</div>
								<div className="Column" style={{width: '50%'}}>
									<button className="dLoginButton" onClick={()=>openLink("https://kgmskid-study.web.app/")}
										>{'Student Login >'}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else if(button==='aboutus'){
			return(
				<div className="Blue BoxShadow BorderRound pt-page-rotateUnfoldRight" style={{marginLeft:"10px",marginRight:"10px",paddingTop:"20px",paddingBottom:"25px"}} key={button}>
							<div style={{marginLeft:"40px",marginRight:"40px"}} className="TextContent">
								<h1 style={{fontSize:"2em"}}>About Us</h1>
								<hr className="HrBlack"/>
								<div style={{textAlign:"justify",wordSpacing:"4px",lineHeight:"1.6",fontSize:"1.156em",textJustify:"inter-word"}}>
										<h4 style={{marginTop:"25px"}}>{kJsonData.KAboutUs.para1}</h4>
										<h4 style={{marginTop:"25px"}}>{kJsonData.KAboutUs.para2}</h4>	
								</div>
								<div style={{marginTop:'25px'}}>
									<h3 align="center" className="AbtusTag">|/ FACILITIES \|</h3>
									<div align="center" style={{marginTop:'20px'}} className="noSelect">
										<img src={A1} alt="A1" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
										<img src={A2} alt="A2" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
										<img src={A3} alt="A3" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
									</div>
									<div align="center" style={{marginTop:'10px', marginBottom:'10px'}} className="noSelect">
										<img src={A6} alt="A6" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
										<img src={A5} alt="A5" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
										<img src={A4} alt="A4" style={{height:'45px'}} referrerPolicy="same-origin" loading="lazy"/>
									</div>
								</div>			
							</div>
						</div>	
			);
		} else if(button==='events'){
			return(
				<div className="Orange BoxShadow BorderRound pt-page-rotateUnfoldRight" style={{marginLeft:"10px",marginRight:"10px",paddingTop:"20px",paddingBottom:"25px",minHeight:"300px"}} key={button}>
							<div style={{marginLeft:"40px",marginRight:"40px"}} className="TextContent">
								<h1 style={{fontSize:"2em"}}>Events</h1>
								<hr className="HrBlack"/>
								<div style={{textAlign:"justify",wordSpacing:"4px",lineHeight:"1.6",fontSize:"1.1em",textJustify:"inter-word"}} >
									{this.getEventsFrom()}
								</div>
							</div>
						</div>	
			);
		} else if(button==='programs'){
			return(
				<div className="Green BoxShadow BorderRound pt-page-rotateUnfoldRight" style={{marginLeft:"10px",marginRight:"10px",paddingTop:"20px",paddingBottom:"25px"}} key={button}>
							<div style={{marginLeft:"40px",marginRight:"40px"}} className="TextContent">
								<h1 style={{fontSize:"2em"}}>Programs</h1>
								<hr className="HrBlack"/>
								<div style={{textAlign:"justify",wordSpacing:"4px",lineHeight:"1.7",fontSize:"1.156em",textJustify:"inter-word"}}>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title1}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title1_desc}</h4>
									</div>	
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title2}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title2_desc}</h4>
									</div>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title3}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title3_desc1}</h4>
										<h4>{kJsonData.KPrograms.title3_desc2}</h4>
										<h4>{kJsonData.KPrograms.title3_desc3}</h4>
									</div>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title4}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title4_desc}</h4>
									</div>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title5}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title5_desc}</h4>
									</div>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title6}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title6_desc}</h4>
									</div>
									<div style={{marginTop:"60px"}}>
										<h4 style={{fontSize:'1.195em'}}>{kJsonData.KPrograms.title7}</h4>
										<hr className="HrBlackSub" align="left"/>
										<h4>{kJsonData.KPrograms.title7_desc}</h4>
									</div>
								</div>
							</div>
						</div>	
			);
		} else if(button==='contactus'){
			return(
				<div className="SeaBlue BoxShadow BorderRound pt-page-rotateUnfoldRight" style={{marginLeft:"10px",marginRight:"10px",paddingTop:"20px",paddingBottom:"25px"}} key={button}>
							<div style={{marginLeft:"40px",marginRight:"40px"}}>
								<Suspense fallback={suspenseLoading}>
								<div className="Row">
									<div className="Column HomeLeft">
										<KMaps key="gmaps"/>
									</div>
									<div className="Column HomeRight">
										<div style={{marginLeft:'25px'}}>
											<KContactForm startModal={(msg) => this.handleModalStart(msg)}/>
										</div>
									</div>
								</div>
								</Suspense>
							</div>
						</div>	
			);
		}			
	}

	render(){
		if(this.state.currentButton === 'events' && !this.state.isEvenTrig){
			this.fetchEvents();
			/*console.log('fetchEvents triggered.....');*/
		}
		return(
			<div className="App" /*app start*/>
				<div className="Row" /*header start*/>
					<div className="Column HeaderLeft noSelect"> 
						<div style={{marginLeft:"30px", marginTop:"30px", marginBottom: "10px"}}>
							<img src={HH} alt="khela ghar title" style={{width:"72%"}} 
								referrerPolicy="same-origin" className="dImageFlash" key="dHHM" loading="lazy"/>
						</div>
						<br/> 
						<div align="center" style={{marginLeft:"30px"}}>
							<input type="image" src={B1} alt="B1" style={{width:"11.74%"}} className="Button"  name="home" onClick={this.handleButtonClick}/>
							<input type="image" src={B2} alt="B2" style={{width:"11.74%",marginLeft:"40px"}} className="Button"  name="aboutus" onClick={this.handleButtonClick}/>
							<input type="image" src={B3} alt="B3" style={{width:"11.74%",marginLeft:"40px"}} className="Button" name="events" onClick={this.handleButtonClick}/>
							<input type="image" src={B4} alt="B4" style={{width:"11.74%",marginLeft:"40px"}} className="Button" name="programs" onClick={this.handleButtonClick}/>
							<input type="image" src={B5} alt="B5" style={{width:"11.74%",marginLeft:"40px"}} className="Button" name="contactus" onClick={this.handleButtonClick}/>
						</div>
					</div>
					<div className="Column HeaderRight noSelect">
						<div style={{marginLeft:"2px",marginTop:"18px"}}> 
							<img src={H4} alt="sun" style={{width:"70%"}} className="dImageRotate" 
								referrerPolicy="same-origin" key="dHSun" loading="lazy"/>
						</div>
					</div>	
				</div /*header end*/>

				<div className="Row" style={{marginTop:"70px"}} ref={this.bodyRef} /*body start*/>
					<div className="Column BodyLeft">
						{this.getLeftDeck(this.state.currentButton)}
					</div>

					<div className="Column BodyMiddle">
						{this.getContent(this.state.currentButton)}
					</div>

					<div className="Column BodyRight">
						{this.getRightDeck(this.state.currentButton)}
					</div>
				</div /*body end*/>
				<div style={{display:this.state.isModal ? 'block' : 'none'}} className="modal"/*modal start*/>
					<div className="modal-content BorderRound">
						<div className="Row">
							<div className="Column ModalLeft">
								<p>{this.state.modalMsg}</p>
							</div>
							<div className="Column ModalRight">
								<span className="close" onClick={this.handleModalClose}>&times;</span>
							</div>
    					</div>
  					</div>
				</div /*modal end*/>
				<div className="Row" style={{marginTop:"60px"}}/*footer start*/>
					<div className="Column Footer dFooterContainer">
						<div align="center">
							<span className="footerTip">&#169; {'Khela Ghar Montessory School, 2021'}</span>
						</div>
						<div align="center">
							<img src={F1} alt="footer" style={{width:"75vw"}} key="dFA"
								className="noSelect" referrerPolicy="same-origin" loading="lazy">
							</img>
						</div>
					</div>
				</div /*footer end*/>
			</div /*app end*/>
		);
	}
}

export default KDesk;