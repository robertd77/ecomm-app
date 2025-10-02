import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaConfig, FaIconLibrary, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { Navbar } from "./layout/navbar/navbar";
import { Footer } from "./layout/footer/footer";
import { Oauth2Service } from './auth/oauth2.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [RouterModule, FaIconComponent, Navbar, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private faIconLibrary = inject(FaIconLibrary);
  private faConfig = inject(FaConfig);

  private oAuth2Service = inject(Oauth2Service);
  platformId = inject(PLATFORM_ID);
 
  constructor() {
    if(isPlatformBrowser(this.platformId)) {
      this.oAuth2Service.initAuthentication();
    }
    this.oAuth2Service.connectedUserQuery = this.oAuth2Service.fetch();
  }

  ngOnInit(): void {
    this.initFontAwesome();
  }

  private initFontAwesome() {
    this.faConfig.defaultPrefix = 'far';
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
