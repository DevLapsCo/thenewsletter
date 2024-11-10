import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormatDatePipe } from './shared/tiome-format/time-format.pipe';
import { provideQuillConfig } from 'ngx-quill';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './utils/interceptors/jwt-interceptors.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
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
