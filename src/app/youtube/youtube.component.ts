import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
channels:any;
@ViewChild("channelName")channelName:ElementRef
  constructor(private youtube:YoutubeService) { }

  ngOnInit() {
    this.youtube.getChannnels("programming").subscribe((data)=>{

      console.log(data)
      this.channels =data.items
    })
  }
  getData(){
    var channelName=this.channelName.nativeElement.value
    
    this.youtube.getChannnels(channelName).subscribe((data)=>{

      console.log(data)
      this.channels =data.items
    })
  }

}
