import React from 'react';
import './KSwipe.css';
import Email from './smtp';
import {isMobile} from 'react-device-detect';

class KContactForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {nameV:'',phoneV:'',emailV:'',msgV:'', isKCModal: false};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.sendMail = this.sendMail.bind(this);
		this.nameInp = React.createRef(); this.phoneInp = React.createRef(); this.emailInp = React.createRef(); this.msgInp = React.createRef();
	}

	async sendMail(){
		let mailBody = `<h4>Name    :  ${this.state.nameV}</h4>
						<h4>Phone   :  ${this.state.phoneV}</h4>
						<h4>Email   :  ${this.state.emailV}</h4>
						<h4>Message :  ${this.state.msgV}</h4>`;
		Email.send({
		    Host : "smtp.elasticemail.com",
		    Username : "rudrajit.basu@gmail.com",
		    Password : "998E75AD5742AC944139A12EF7676B12EAD3",
		    To : 'rudrajit.basu@gmail.com',
		    From : "rudrajit.basu@gmail.com",
		    Subject : "Message from KGMS Website",
		    Body : mailBody
		}).then(
		  message => {
		  	if(message === 'OK'){
		  		this.nameInp.current.value = '';
		  		this.phoneInp.current.value = '';
		  		this.emailInp.current.value = '';
		  		this.msgInp.current.value = '';
		  		this.setState({nameV:'',phoneV:'',emailV:'',msgV:'',isKCModal:false});
		  		this.props.startModal('Message sent successfully !');
		  	}else{
		  		this.setState({isKCModal:false});
		  		this.props.startModal('Something went wrong, please try later !');
		  	}
		  }
		).catch(()=>{
			this.setState({isKCModal:false});
			this.props.startModal('Something went wrong, please try later !');
		});
	}


	handleChange(event){
		// console.log('you clicked '+event.target.name);
		if(event.target.name === 'nameId'){
			this.setState({nameV: event.target.value});
		}else if(event.target.name === 'phoneId'){
			this.setState({phoneV: event.target.value});
		}else if(event.target.name === 'emailId'){
			this.setState({emailV: event.target.value});
		}else if(event.target.name === 'messageId'){
			this.setState({msgV: event.target.value});
		}
	}

	validateEmail(email) {
		// let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		// eslint-disable-next-line
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(email).toLowerCase());
	}

	handleSubmit(event) {
    	event.preventDefault();
    	// alert('name: '+this.state.nameV+' phone: '+this.state.phoneV+' emailId: '+this.state.emailV+' msg: '+this.state.msgV);
    	// this.props.startModal('name: '+this.state.nameV+' phone: '+this.state.phoneV+' emailId: '+this.state.emailV+' msg: '+this.state.msgV);
    	if(this.state.nameV === ''){
    		this.props.startModal('Name cannot be empty !');
    	}else {
    		if(this.state.phoneV === ''){
    			this.props.startModal('Phone cannot be empty !');
    		}else if(this.state.phoneV.length < 6){
    			this.props.startModal('Please enter a valid Phone Number !');
    		}else {
    			if(this.state.emailV !== '' && !this.validateEmail(this.state.emailV)){
    				this.props.startModal('Please enter a valid Email ID or you can keep it empty !');
    			}else {
    				if(this.state.msgV === ''){
    					this.props.startModal('Message cannot be empty !');
    				}else{
    					// this.props.startModal('Proceed !');
    					if(window.navigator.onLine){
    						// console.log('kcontact online');
    						this.setState({isKCModal:true});
    						this.sendMail();
    					}else{
    						this.props.startModal('Please check the internet and try later !');
    					}
    				}
    			}
    		}
    	}
  	}

	render(){
		return(
			<div style={{position: 'relative'}}>
				<div>
					<h1 className={isMobile ? 'mcTextHead' : 'dcTextHead'}>Contact Us ...</h1>
					<div className={isMobile ? 'mcTextSubHead mcTextBlk' : 'dcTextSub dcSubHeadBlk'}>
						<p className="Label">Khela Ghar Montessory School</p>
						<p className="Label">ukilpara, jalpaiguri ~ 735101</p>
						<p className="Label">phone ~ 8918830363(m)</p>
					</div>
				</div>
				<div className={isMobile ? 'mcTextMain mcTextBlk' : 'dcTextMain dcMainBlk'}>
					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className={isMobile ? 'mcol-25' : 'col-25'}><label className="Label">Name ~</label></div>
							<div className={isMobile ? 'mcol-75' : 'col-75'}><input type="text" ref={this.nameInp} name="nameId" className={isMobile ? 'InpText mInpTHeight':'InpText'} onChange={this.handleChange} placeholder="Your Name..."/></div>
						</div>
						<div className="row">
							<div className={isMobile ? 'mcol-25' : 'col-25'}><label className="Label">Phone ~</label></div>
							<div className={isMobile ? 'mcol-75' : 'col-75'}><input type="number" ref={this.phoneInp} name="phoneId" className={isMobile ? 'InpText mInpTHeight':'InpText'} onChange={this.handleChange} placeholder="Your Contact Number..."/></div>
						</div>
						<div className="row">
							<div className={isMobile ? 'mcol-25' : 'col-25'}><label className="Label">Email ~</label></div>
							<div className={isMobile ? 'mcol-75' : 'col-75'}><input type="text" ref={this.emailInp} name="emailId" className={isMobile ? 'InpText mInpTHeight':'InpText'} onChange={this.handleChange} placeholder="Your Email ID... [ optional ]"/></div>
						</div>
						<div className="row">
							<div className={isMobile ? 'mcol-25' : 'col-25'}><label className="Label">Message ~</label></div>
							<div className={isMobile ? 'mcol-75' : 'col-75'}><textarea ref={this.msgInp} name="messageId" className={isMobile ? 'InpText mTextAreaHeight':'InpText dTextAreaHeight'} onChange={this.handleChange} placeholder="Write Something..."/></div>
						</div>
						<div className="row" style={{marginTop:'12px'}}>
							<input type="submit" value="Submit !" className={isMobile ? 'InpSubmit mInpSubmitWidth' : 'InpSubmit InpSubmitWidth'}/>
						</div>
					</form>
				</div>
				<div style={{display: this.state.isKCModal ? 'inline':'none'}} className={isMobile ? 'kc-modal':'kcd-modal'}>
					<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</div>
		);
	}
}

export default KContactForm;