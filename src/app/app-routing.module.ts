import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { LoginpageComponent } from "./pages/loginpage/loginpage.component";
import { HasRoleGuard } from "./has-role.guard";
import { TodoComponent } from "./pages/todo/todo.component";
import { IsSignedInGuard } from "./IsSignedInGuard ";
import { DashComponent } from "./back/card/dash/dash.component";
import { OfferComponent } from "./back/card/offer/offer.component";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { QuestionComponent } from "./pages/question/question.component";
import { CandidaturComponent } from "./pages/candidatur/candidatur.component";



import { UserManagementComponent } from "./back/card/user-management/user-management.component";

import { TrainingComponent } from "./pages/training/training.component";

import { EventscomponentComponent } from "./eventscomponent/eventscomponent.component";



import { ForgetpasswordComponent } from "./pages/forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from "./pages/forgetpassword/resetpassword/resetpassword.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { AddofferComponent } from "./back/card/addoffer/addoffer.component";
import { JobofferfrontComponent } from "./pages/jobofferfront/jobofferfront.component";
import { StatComponent } from "./back/card/stat/stat.component";

import { ReportinManagmentComponent } from "./back/card/reportin-managment/reportin-managment.component";
import { BlackkistManagmentComponent } from "./back/blackkist-managment/blackkist-managment.component";
import { FakeaccountsComponent } from "./back/fakeaccounts/fakeaccounts.component";
import { CoronaCountriesComponent } from "./pages/corona/corona-countries/corona-countries.component";
import { CoronaHomeComponent } from "./pages/corona/corona-home/corona-home.component";

import { EventFrontComponent } from "./event-front/event-front.component";
import { CagnottecomponentComponent } from "./back/card/cagnottecomponent/cagnottecomponent.component";
import { ReservationComponent } from "./eventscomponent/reservation/reservation.component";

import { AddTrainingComponent } from "./back/add-training/add-training.component";
import { TrainingsbackComponent } from "./back/trainingsback/trainingsback.component";
import { DetailtrainingComponent } from "./pages/detailtraining/detailtraining.component";
import { UpdatetrainingComponent } from "./back/updatetraining/updatetraining.component";
import { RecherchevocaleComponent } from "./pages/recherchevocale/recherchevocale.component";
import { ChatTrainingComponent } from "./chat-training/chat-training.component";





const routes: Routes = [






  { path: "coronahome", component: CoronaHomeComponent },
  { path: "countries", component: CoronaCountriesComponent },




  
  { path: "reservation", component: ReservationComponent },

  { path: "home", component: IndexComponent },
  { path: "trainings", component: TrainingComponent  },
  { path: "addtrainings/:email", component: AddTrainingComponent ,
   canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},


  { path: "profile/:email", component: ProfilepageComponent},

  { path: "gestionformation", component: TrainingsbackComponent },
  { path: "trainings/:idFormation", component: DetailtrainingComponent },
  { path: "updatetrainings/:email/:idFormation", component: UpdatetrainingComponent },
  { path: "rechercheVocale", component: RecherchevocaleComponent },
  { path: "callTraining", component: ChatTrainingComponent },


  { path: "profile/:email", component: ProfilepageComponent},  
  { path: "profile", component: ProfilepageComponent,
   canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN','USER']} },
  { path: "register", component: RegisterpageComponent,canActivate:[IsSignedInGuard] },



  
  {path : "publication", component : PublicationComponent},
  
  {path : "publication/get/:id", component : detailsPublicationComponent},

  
  {path : "add-publication", component : AddPublicationComponent},
  {path : "commentaire", component : CommentaireComponent} ,



  { path: "landing", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent ,canActivate:[IsSignedInGuard]},
  { path: "todo", component: TodoComponent },


  
  { path: "userManagement", component: UserManagementComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},


  { path: "reporting", component: ReportinManagmentComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},

  { path: "fakeaccounts", component: FakeaccountsComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},


  { path: "blacklist", component: BlackkistManagmentComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},

  { path: "forgetpassword", component: ForgetpasswordComponent ,canActivate:[IsSignedInGuard]},
  { path: "resetpassword/:email/:token", component: ResetpasswordComponent ,canActivate:[IsSignedInGuard]},


  { path: "userManagement", component: UserManagementComponent },

  
  { path: "events", component: EventscomponentComponent,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}
  },
  { path: "Eventfront", component: EventFrontComponent },
  { path: "cagnotte", component: CagnottecomponentComponent },


  


  { path: "offers", component: OfferComponent },
  { path: "Quiz", component: QuizComponent },
  { path: "Question", component: QuestionComponent },
  { path: "Candidatur", component: CandidaturComponent},
  { path: "Addoffer", component: AddofferComponent},
  { path: "Jobofferfront", component: JobofferfrontComponent},
  { path: "Stat", component: StatComponent},

   
  
  { path: 'dashboard', component: DashComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}
  },

  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}


  
 
];

@NgModule({


  

 
    
   

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}

