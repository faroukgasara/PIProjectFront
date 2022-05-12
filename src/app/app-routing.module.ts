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

import { UserManagementComponent } from "./back/card/user-management/user-management.component";
import { TrainingComponent } from "./pages/training/training.component";
import { AddTrainingComponent } from "./back/add-training/add-training.component";
import { TrainingsbackComponent } from "./back/trainingsback/trainingsback.component";
import { DetailtrainingComponent } from "./pages/detailtraining/detailtraining.component";
import { UpdatetrainingComponent } from "./back/updatetraining/updatetraining.component";
import { RecherchevocaleComponent } from "./pages/recherchevocale/recherchevocale.component";
import { ChatTrainingComponent } from "./chat-training/chat-training.component";




const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "trainings", component: TrainingComponent  },
  { path: "addtrainings/:email", component: AddTrainingComponent ,
   canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},

  { path: "gestionformation", component: TrainingsbackComponent },
  { path: "trainings/:idFormation", component: DetailtrainingComponent },
  { path: "updatetrainings/:email/:idFormation", component: UpdatetrainingComponent },
  { path: "rechercheVocale", component: RecherchevocaleComponent },
  { path: "callTraining", component: ChatTrainingComponent },

  { path: "profile/:email", component: ProfilepageComponent},  
  { path: "profile", component: ProfilepageComponent,
   canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN','USER']} },
  { path: "register", component: RegisterpageComponent,canActivate:[IsSignedInGuard] },
  { path: "landing", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent ,canActivate:[IsSignedInGuard]},
  { path: "todo", component: TodoComponent },
  { path: "userManagement", component: UserManagementComponent },
  { path: 'dashboard', component: DashComponent ,
  canActivate:[HasRoleGuard],data:{appUserRole:['ADMIN']}},
  
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
