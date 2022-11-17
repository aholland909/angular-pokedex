import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './components/pokemon/card.component';
import { PokemonPaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, PokemonCardComponent, PokemonPaginationComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
