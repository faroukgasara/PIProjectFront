import { Component, OnInit } from '@angular/core';
import { EventsModel } from '../model/events';
import { EventService } from "src/app/services/events.service";
import noUiSlider from "nouislider";
import {loadStripe} from '@stripe/stripe-js';
import { DomSanitizer } from '@angular/platform-browser';
const stripe = loadStripe('pk_live_51Kw2XyBt4S8KKn3l12LYhF5h22V0QOzmT9UbQ4HziLmSj5SyeeZG8SpEnl4mXL0V4CRA0FVsH0MWwYYtP9sB1mv800lzsGvZCJ');
@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.scss']
})
export class EventFrontComponent implements OnInit {
  


 /* buttonColor= "black";
  buttonType= "buy";
  isCustomSize = "250";
  buttonHeight = 50;
  isTop = window === window.top;


  paymentRequest = {
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {type:"CARD",
       parameters:{
         allowedPaymentMethods:["PAN_ONLY", "CRYPTOGRAM_3DS"],
         allowedCardNetworks:["AMEX", "VISA", "MASTERCARD"]
        },
        tokenizationSpecification:{
        type:"PAYMENT_GATEWAY",
        parameters:{
          gateway:"exemple",
          gatewayMerchantI:"exempleGatewayMerchantI"
        }
        }
      }
    ],
    merchantInfo:{
      merchantId:"12345678909876543",
      merchantName:"demo Merchant"

    },
    transactionInfo:{
      totalPriceStatus:"FINAL",
      totalPriceLabel:"Total",
      totalPrice:"100.00",
      currencyCode:"USD",
      countryCode:"US"
    }
  };

  onLoadPaymentData(event:any): void{
    console.log("Load payment data by testcodeiz",event.detail)
  }
*/
Events:EventsModel[]=[];
  constructor(private EventsHttp:EventService) {  }

  
  ngOnInit(): void {
     
  
  this.getEvents();



  var slider2 = document.getElementById("sliderDouble");

  noUiSlider.create(slider2, {
    start: [20, 60],
    connect: true,
    range: {
      min: 0,
      max: 100
    }
  });

}
public getEvents(){
  this.EventsHttp.getallevents().subscribe(
    (data:EventsModel[]) => {this.Events = data;
      let n =data.length;
      for(let i=0;i<=this.Events.length;i++){
        this.Events[i].affiche = '../../assets/img/'+this.Events[i].affiche.substring(12,this.Events[i].affiche.length);
      }
      console.log(this.Events);
    }
    
    );

}

}
