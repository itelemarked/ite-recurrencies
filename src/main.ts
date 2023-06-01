// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/_routing';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot()
    )
  ]
});
