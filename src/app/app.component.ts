import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  constructor(
    private translate: TranslateService,
    languageService: LanguageService
  ) {
    this.translate.setDefaultLang('en');
    const translatedString = this.translate.instant('APP_TITLE');
    console.log('translatedString: ', translatedString);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
