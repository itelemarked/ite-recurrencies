import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppMenuContentComponent } from './app-menu-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, AppMenuContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-app>
      <ion-split-pane when="md" contentId="main-container">

        <ion-menu menuId="main-menu" contentId="main-container">
          <ion-header>
            <ion-toolbar>
              <ion-title>Menu Content</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding" [forceOverscroll]="false">
            <app-menu-content></app-menu-content>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="main-container"></ion-router-outlet>
      </ion-split-pane>

    </ion-app>
  `,
  styles: [``]
})
export class AppComponent {
  constructor() {
    //Settings.defaultZone = 'America/New_York'
  }
}
