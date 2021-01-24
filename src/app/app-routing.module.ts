import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreditsComponent } from './credits/credits.component';
import { LessonComponent } from './lesson/lesson.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect default home
  { path: 'home', component: HomeComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'lesson/:id', component: LessonComponent },
  { path: 'lesson/:id/:type', component: LessonComponent }
  , { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  // imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
