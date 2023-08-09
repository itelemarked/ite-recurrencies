
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app/app.component';

import { routes } from './app/routing';
import { firebaseConfig } from './app/firebase';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      IonicModule.forRoot(),
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => {
        const firestore = getFirestore();
        // persistence????
        return firestore;
      }),
      provideAuth(() => getAuth())
    )
  ]
});

