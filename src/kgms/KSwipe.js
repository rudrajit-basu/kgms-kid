import React from 'react';
// import Swiper from 'swiper';
import { Swiper, Navigation, Autoplay } from 'swiper/js/swiper.esm.js';
import './KSwipe.css';
import {isMobile} from 'react-device-detect';

Swiper.use([Navigation, Autoplay]);

const imgArray = [{id:1,src:"https://lh3.googleusercontent.com/PiGPB1yiiEiZug_xEQsPaBEGLeI1cAyE7JpMjsZ1C8w6Vt618b31nmftvCPgNiEJ_QWqHcGw0dKJYrJ7NIhNjpjux8WeWTEkNwhHENe5pNVsgYT6Es5NNtdSl-Jxt663kIfT0DR7UA=w2400",alt:"image1"},
				  {id:2,src:"https://lh3.googleusercontent.com/DvNaTXJzqR2KhQDgctbjtNZPb_aZgZebPh1IWvjhgDYQiYiPyeZvFydPqO4ToFRFPUXRx8vTDGA5k7RHwyCc6hbhfIrOaVQAzWB-LWN7qJJu9nsOhExr_urQ8lHZxd8jelUSNYWgEA=w2400",alt:"image2"},
				  {id:3,src:"https://lh3.googleusercontent.com/r_7y-YRPcnYW3uRj3fVU0-7wiJjA6tg56DNh-t9tkz-n1PBAUjjY3CVpOmGXhMHWGjf6uxPVq4cr80xp1baJXFYbjn4IcBeQSWkC0LdanJRF92GaQtj9EjGGGZ88IZhuqAGI-LCLag=w2400",alt:"image3"},
				  {id:4,src:"https://lh3.googleusercontent.com/6EXAL5gOW_QMlSYdQEahW02HinqvgdIVCBAwFMrzymBDonETH4IQtXwPX-2fkdqDuMHDC6NhchcnByVGP5qmyP3qa1zHQJrhISE3piLlFbg-RZ70pygxv3C19aTJFLjA7MM3bDDlJw=w2400",alt:"image4"},
				  {id:5,src:"https://lh3.googleusercontent.com/kJ23I__hSeRdhBe-9ws79WOi4LIXXpVm07X7kcMzvTQEXzSQxL5zIh79tcGdtYJJXi6hmo3fylJNfgtDAvNR-g4Gf7oy2bAkHOoTJIwaHG2wZxWmkaEWAEZeyJf6Ays9RQkfEDlTug=w2400",alt:"image5"},
				  {id:6,src:"https://lh3.googleusercontent.com/fgpN8wnjkJf-77B4phjDEXJNLiSid0KKJLaxV1yDndntet1AGVmQX9AxlE6BfnwJEoPC0GVj161ptzMxHWQQGCL3BMefP7Z9O5Lw0XJCXjf6NzaUzVJu9Q544dgjcCdYruKVj7baCg=w2400",alt:"image6"},
				  {id:7,src:"https://lh3.googleusercontent.com/vOeMVosxBaN4uP_wdN9XjzUJG-hiG-8Vhacdxanm9GlekhCpfYKaA0-V8Z3F94uMYjuq4wy0tAoMw4z7Fei1cMYbHXvnEU3mDJ2d6dmrtgAa2zqlxP-t0BNs1kzWt16VyuHlPhRq5g=w2400",alt:"image7"},
				  {id:8,src:"https://lh3.googleusercontent.com/9PluGuTNZK5cuZvkYMdbyDrCzfFmGmnj6C0N0UXtNc40KihqwDog3w4sA2lnZRsX1g7kBHQ_8J0JRuLfesNSXsivWNTRqANcdhAc65qAB7w_JBB-cLxshrznUmHAVKwwtL56P6G8sg=w2400",alt:"image8"},
				  {id:9,src:"https://lh3.googleusercontent.com/topLxyjg8Cy4WH6TcbUugK6UwDeuP50fzik2W2NWC4DzfFtet8ZPhshDRdL5JFkXFWPMUXII-WJqk0lMbFYeghAotSX8xxvT92jX0JsFaGbKabQvydFMWJMrvE3LIGv2di2yH5GnQg=w2400",alt:"image9"},
				  {id:10,src:"https://lh3.googleusercontent.com/EUxdk04FIK4QXB9vEmnJYrZtbz3kHVhlq5YMl3AzeXENkRoXvzvm5L8YvSByhvqVF5uHCpZv6JfzM3TnGZy0FKBV6_VUJYddqKnqDJnsbfvEVmMdJfCe0slhyItX8VYQjukdgtBMqw=w2400",alt:"image10"},
				  {id:11,src:"https://lh3.googleusercontent.com/1vkDpvlOONovZApPM5zJm23_A-0f7RyPs99DD2Vnf9Me_g0Gdw7dTXCbYo8V-XPzDFHmCXkUP0eZDtvvtoLh1QM_hWJZLGlw4q0B7XyD0gknGQ09NA8qcGX3LlBYAQcOTbGRThDiPA=w2400",alt:"image11"},
				  {id:12,src:"https://lh3.googleusercontent.com/ySdAkyfu6rP4GISRNg5snJv6-KZVF9soFnHM9Jbs798918mwrU7jjC9TyQx4nqj1bLrfq_d5u53e9gD0LxwTk8iNM2ZglN_t2umOmrFI-gglGYOnmzcxctC8YFtrEV_6wIa3GDYC4g=w2400",alt:"image12"},
				  {id:13,src:"https://lh3.googleusercontent.com/yWxKRBsnxLoCa7hrK36Hk0ui6X9qBS9GNfMfWJqftjwTfdUkDsDos_eEK5DT0Fn1Z0KVlnYZM03W_56Kh6EiACGO8e-A_1tOI3dRCKVpW5Dh1SGACeYGxx-xj451VYpDeZXCZwK-7A=w2400",alt:"image13"}];

const imgItems = imgArray.map((img) => {
			return(<img src={img.src} key={img.id.toString()} alt={img.alt} loading="lazy"
				className="noSelect swiper-slide BorderRound" referrerPolicy="same-origin"/>);
		});

class KSwipe extends React.Component{
	
	constructor(props){
		super(props);
		this.slider = React.createRef();
		// this.next = React.createRef();
		// this.perv = React.createRef();
	}

	componentDidMount(){
		new Swiper(this.slider, {
						speed: 1800,
						spaceBetween: 8,
			      		centeredSlides: true,
			      		loop: true,
			      		grabCursor: true,
			      		autoplay: {
			        		delay: 5400,
			        		disableOnInteraction: false,
			      		},
			      		
			      		// navigation: {
			        // 		nextEl: this.next,
			        // 		prevEl: this.perv,
			      		// },
			      		init: true,
			      		direction: 'horizontal',
					});
	}


	render(){
		const bStyle = 'BorderRound swiperImg';
		const mStyle = 'BorderRound mSwiperImg';
		
		return (
			<div className={isMobile ? mStyle : bStyle} >
				<div ref={o => this.slider = o} className="swiper-container BorderRound">
	    			<div className="swiper-wrapper BorderRound">
	        			{imgItems}
	    			</div> 
	      		</div>	
	    	</div>
		);
	}	
}	

export default KSwipe;