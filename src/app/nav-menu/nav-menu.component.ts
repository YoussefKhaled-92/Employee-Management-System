import { LanguageService } from './../shared/language.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  otherLanguage = 'عربي';

  constructor(private languageService: LanguageService) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onChangeLanguage() {
    this.languageService.switchLanguage();
    this.otherLanguage = this.languageService.otherLanguage;
  }
}
