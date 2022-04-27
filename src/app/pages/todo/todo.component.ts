import { CdkDragDrop,  moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ITask } from '../../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  tasks:ITask[]=[];
  inprogress:ITask[]=[];
  done:ITask[]=[];
  updateIndex!:any;
  isEditEnabled : boolean = false;
  token = localStorage.getItem('token');
  user = JSON.parse(localStorage.getItem('user'));
  form!: FormGroup;

  todoForm !:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient) { }
  isCollapsed = true;
  focus;
  focus1;
  focus2;

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  todo():void{
    this.tasks=[];
    this.inprogress=[];
    this.done=[];
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    this.http.get("http://localhost:8089/WomenEmpowerment/todo/findByUserEmail/"+this.user.email, options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      let resSTR = JSON.stringify(response);
      let resJSON = JSON.parse(resSTR);

      resJSON.forEach(des=>{
        if(des.progress == 50){
          this.inprogress.push(des)
        }else if(des.progress == 0){
          this.tasks.push(des)
        }else{
          this.done.push(des)
        }
      })
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })

  }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['',Validators.required]
    })
    this.todo();

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
  addTask(){
    let body = new URLSearchParams();
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false,
      id:1,
      progress:0,
      debutDate:"2021-01-01",
      targetDate:"2021-01-01"
    })
    this.form = this.fb.group({
      description:this.todoForm.value.item,
      debutDate:"2021-01-01",
      targetDate:"2021-01-01",
      progress:0
    });


    
    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`).set(`Content-Type`, `application/json`),
      withCreadentials:true,
     
    };
    this.http.post('http://localhost:8089/WomenEmpowerment/todo/addToTheToDoList/'+this.user.email,this.form.getRawValue(), options)
    .pipe(map((data)=>data))
    .toPromise()
    .then((response)=>{
      this.todo();
      
    }).catch((error:HttpErrorResponse)=>{
      console.log(error)
    })
    this.todoForm.reset();
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.todoForm.reset();

    console.log(this.tasks[this.updateIndex])
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    this.http.put("http://localhost:8089/WomenEmpowerment/todo/updateToDoList/"+this.user.email, this.tasks[this.updateIndex],options)
    .subscribe(response => {
      this.tasks[this.updateIndex].done=false;
      
      this.updateIndex=undefined;
      this.isEditEnabled=false;
    });

  }

  deleteTask(i:number){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    this.http.delete("http://localhost:8089/WomenEmpowerment/todo/deleteFromTheToDoList/"+this.tasks[i].id, options)
    .subscribe(response => {
      this.tasks.splice(i,1);
    });
    

  }

  deleteInProgressTask(i:number){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    this.http.delete("http://localhost:8089/WomenEmpowerment/todo/deleteFromTheToDoList/"+this.inprogress[i].id, options)
    .subscribe(response => {
      this.inprogress.splice(i,1);
    });
    
  }

  deleteDoneTask(i:number){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    let options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    };

    this.http.delete("http://localhost:8089/WomenEmpowerment/todo/deleteFromTheToDoList/"+this.done[i].id, options)
    .subscribe(response => {
      this.done.splice(i,1);
    });
    
    
  }

  onEdit(item:ITask,i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex=i;
    this.isEditEnabled=true;

  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      
      if(event.container.id=="cdk-drop-list-1"){
        //mechet lel progress
        console.log(event.container.id)
        console.log(event.container.data)
        console.log("mechet lel progress")
      }else if(event.container.id=="cdk-drop-list-0"){
        //mechet lel todo
        console.log("mechet lel todo")

      }else if(event.container.id=="cdk-drop-list-2"){
        //mechet lel done
        console.log("mechet lel done")
      }
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



}
