import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    provideAnimations()
  ]
}).catch(err => console.error(err));
