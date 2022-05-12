import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";







import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";

import {MatBadgeModule} from '@angular/material/badge'
import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { FooterComponent } from './pages/footer/footer.component';
import { PublicnavbarComponent } from './pages/publicnavbar/publicnavbar.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { TodoComponent } from './pages/todo/todo.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './back/card/card.component';
import { ChartComponent } from './back/card/chart/chart.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MiniCardComponent } from "./back/card/mini-card/mini-card.component";
import { UsersTableComponent } from "./back/card/users-table/users-table.component";
import { DashComponent } from "./back/card/dash/dash.component";
import { NavComponent } from "./back/card/nav/nav.component";



import { NgxPaginationModule } from "ngx-pagination";
import { Ng2OrderModule } from "ng2-order-pipe";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UserManagementComponent } from './back/card/user-management/user-management.component';


import { TrainingComponent } from './pages/training/training.component';
import { EventscomponentComponent } from './eventscomponent/eventscomponent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ForgetpasswordComponent } from "./pages/forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from './pages/forgetpassword/resetpassword/resetpassword.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CountTotalUsersByYearComponent } from './back/card/chart/count-total-users-by-year/count-total-users-by-year.component';


import { OfferComponent } from "./pages/offer/offer.component";
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuestionComponent } from './pages/question/question.component';
import { CandidaturComponent } from './pages/candidatur/candidatur.component';
import { BrowserModule } from "@angular/platform-browser";
import { CommentaireComponent } from "./commentaire/commentaire.component";
import { PublicationComponent } from "./publication/publication.component";
import {EditorModule} from '@tinymce/tinymce-angular';
import { AddPublicationComponent } from "./add-publication/add-publication.component";
import { AddCommentaireComponent } from './commentaire/add-commentaire/add-commentaire.component';
import { SearchFilterPipe } from "./publication/SearchFilterPipe";
import { detailsComponent } from "./publication/details/details.component";
import { ChatMSGComponent } from './chat-msg/chat-msg.component';
import { LoginComponent } from './chat-msg/login/login.component';
import { RoomlistComponent } from './chat-msg/roomlist/roomlist.component';
import { AddroomComponent } from './chat-msg/addroom/addroom.component';
import { DatePipe } from "@angular/common";

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListCommentComponent } from './list-comment/list-comment.component';

import {MatDialogModule} from "@angular/material/dialog";
import { UpdatepublicationComponent } from './publication/updatepublication/updatepublication.component';
import { YoutubeComponent } from './youtube/youtube.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PublicnavbarComponent,
    AddPublicationComponent,
    PublicationComponent,
    UpdatepublicationComponent,
    YoutubeComponent,

    CommentaireComponent,
    AddCommentaireComponent,
    
    SearchFilterPipe,


    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    LoginpageComponent,
    TodoComponent,

    NavComponent,
    DashComponent,
    CardComponent,
    ChartComponent,
    UsersTableComponent,
    MiniCardComponent,

    UserManagementComponent,
    TrainingComponent,

    ForgetpasswordComponent,
    ResetpasswordComponent,
    NotfoundComponent,
    CountTotalUsersByYearComponent,


    EventscomponentComponent,

    OfferComponent,
    QuizComponent,
    QuestionComponent,
    CandidaturComponent,
    AddCommentaireComponent,
    detailsComponent,
    ChatMSGComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatMSGComponent,
    ListCommentComponent,
    UpdatepublicationComponent,
    YoutubeComponent,
  

    
  ],
  imports: [
    
    BrowserAnimationsModule,
   
    FormsModule,
    EditorModule,
    MatDialogModule,
    
    
    

    BrowserAnimationsModule,
    Ng2SearchPipeModule,

    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgbModule, 
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatBadgeModule
     ,MatProgressSpinnerModule,
     MatSnackBarModule,
    MatSidenavModule
  ],
  providers: [
   

    EditorModule,FormsModule,DatePipe


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
