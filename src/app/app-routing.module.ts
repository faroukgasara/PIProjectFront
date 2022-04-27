import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { PublicationComponent } from "./publication/publication.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddPublicationComponent } from "./add-publication/add-publication.component";
import { detailsPublicationComponent} from "./publication/detailsPublication.component";
import { CommentaireComponent} from "./commentaire/commentaire.component";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { LoginpageComponent } from "./pages/loginpage/loginpage.component";
import { HasRoleGuard } from "./has-role.guard";
import { TodoComponent } from "./pages/todo/todo.component";
import { IsSignedInGuard } from "./IsSignedInGuard ";
import { DashComponent } from "./back/card/dash/dash.component";
import { OfferComponent } from "./pages/offer/offer.component";
import { QuizComponent } from "./pages/quiz/quiz.component";
import { QuestionComponent } from "./pages/question/question.component";
import { CandidaturComponent } from "./pages/candidatur/candidatur.component";



import { UserManagementComponent } from "./back/card/user-management/user-management.component";

import { TrainingComponent } from "./pages/training/training.component";
import { EventscomponentComponent } from "./eventscomponent/eventscomponent.component";


import { ForgetpasswordComponent } from "./pages/forgetpassword/forgetpassword.component";
import { ResetpasswordComponent } from "./pages/forgetpassword/resetpassword/resetpassword.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";




const routes: Routes = [


  { path: "home", component: IndexComponent },

  { path: "profile/:email", component: ProfilepageComponent},

  { path: "trainings", component: TrainingComponent },
  { path: "profile", component: ProfilepageComponent,

    canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN','USER']}
  },
  { path: "register", component: RegisterpageComponent,canActivate:[IsSignedInGuard] },


  
  {path : "publication", component : PublicationComponent},
  
  {path : "publication/get/:id", component : detailsPublicationComponent},

  
  {path : "add-publication", component : AddPublicationComponent},
  {path : "commentaire", component : CommentaireComponent}
  ,



  { path: "landing", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent ,canActivate:[IsSignedInGuard]},
  { path: "todo", component: TodoComponent },


  
  { path: "userManagement", component: UserManagementComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},

  { path: "forgetpassword", component: ForgetpasswordComponent ,canActivate:[IsSignedInGuard]},
  { path: "resetpassword/:email/:token", component: ResetpasswordComponent ,canActivate:[IsSignedInGuard]},


  { path: "userManagement", component: UserManagementComponent },
  
  { path: "events", component: EventscomponentComponent,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}
  },
  


  { path: "offers", component: OfferComponent },
  { path: "Quiz", component: QuizComponent },
  { path: "Question", component: QuestionComponent },
  { path: "Candidatur", component: CandidaturComponent},
   
   


  
  { path: 'dashboard', component: DashComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}
  },

  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}

  

];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule ,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
