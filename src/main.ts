import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: BrowserAnimationsModule,
      useValue: BrowserAnimationsModule.withConfig({
        // Configure the animations module here
        // For example, you can set the animation disable flag
        disableAnimations: false
      })
    },
    // Other providers from appConfig
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));