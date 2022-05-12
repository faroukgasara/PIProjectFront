import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Complaint } from 'src/app/model/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';
import { ReplyComplaintComponent } from '../reply-complaint/reply-complaint.component';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  constructor(private dialog :MatDialog ,private complaintHttp: ComplaintService) { }
  complaints: Complaint[];
  complaint: Complaint = new Complaint();

  type:any;
  p:number = 1 ;
  position:any;
  ngOnInit(): void {
    this.getComplaints();
  }

  getComplaints(){
    this.complaintHttp.getComplaints().subscribe(
  		(data:Complaint[]) => {this.complaints = data}
  	);
  }

  deleteUser(id: number){
  	this.complaintHttp.deleteComplaint(id)
    .toPromise()
    .then((response)=>{
      this.getComplaints();
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    });
  }

  
  Search(){
    if(this.type==""){
      this.ngOnInit();
    }else{
      this.complaints = this.complaints.filter(res=>{
        return res.type.toLocaleLowerCase().match(this.type.toLocaleLowerCase());
      })
    }
  }
  key:string='id';
  reverse:boolean = false;
  Sort(key){
    this.key = key
    this.reverse = !this.reverse;
  }


  onCreate(us) {
    localStorage.setItem('update', JSON.stringify(us));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "80%";
    this.dialog.open(ReplyComplaintComponent,dialogConfig);
   
  }

  @ViewChild('complaintData')
   ComplaintData !: ElementRef;
  DATA_CATEGORIES: any;
  fileWidth: number;
  fileHeight: any;
  FILE_URI: any;
  PDF: any;
  //position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  categoriesExcel: any;
  fileNameXlsx = 'Complaint.xlsx';
  ws: any;
  wb: any;

  exportParternershipsPDF(): void {
    this.DATA_CATEGORIES = document.getElementById('complaintData');
      html2canvas(this.DATA_CATEGORIES).then((canvaToUse) => {
        this.fileWidth = 208;
        this.fileHeight = (canvaToUse.height * this.fileWidth) / canvaToUse.width;
        this.FILE_URI = canvaToUse.toDataURL('image/png');
        this.PDF = new jsPDF('p', 'mm', 'a4');
      //  this.PDF.addImage(this.FILE_URI, 'PNG', 0, this.position, this.fileWidth, this.fileHeight);
        this.PDF.save('ManaZello_All_Categories.pdf');
      });
    }
  
    exportExcel(): void {
      this.categoriesExcel = document.getElementById('complaintData');
      this.ws = XLSX.utils.table_to_sheet(this.categoriesExcel);
      this.wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(this.wb, this.ws, 'Sheet1');
      XLSX.writeFile(this.wb, this.fileNameXlsx);
    }

}
