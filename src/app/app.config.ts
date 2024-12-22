import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideQuillConfig } from 'ngx-quill';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './utils/interceptors/jwt-interceptors.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    provideNoopAnimations(),
    provideAnimations(),
    provideQuillConfig({
      modules: {
        syntax: true
      }
    }),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withInterceptors([jwtInterceptor]))
    // provideCharts({ registerables: [BarController, Legend, Colors] }),
  ]
};

