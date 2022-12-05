import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'de']);
    translate.setDefaultLang('en');
    translate.use('en')
  }

  setLang(lang:string){
    this.translate.use(lang)
  }
}
