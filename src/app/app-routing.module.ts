import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCardComponent } from './components/pokemon/card/card.component';
import { InfoComponent } from './components/pokemon/info/info.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'pokemon/:name', component: InfoComponent},
  { path: '404', component: NotFoundComponent },
  { path: 'quiz', component: QuizComponent}
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
