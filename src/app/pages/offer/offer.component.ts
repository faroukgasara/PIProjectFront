import { Component, OnInit } from '@angular/core';
import { OfferModel } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  displayedColumns: string[] = [ 'id','Title','Domain','Place','description'];
  offers: OfferModel[];

  fileToUpload: File | null = null;

  constructor(private OfferHttp: OfferService) {}
   

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(){
    this.OfferHttp.getOffers().subscribe(
  		(data:OfferModel[]) => {this.offers = data}
        //;console.log(this.offers);console.log("hi")}
  	);


   /* handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }*/

}
}
