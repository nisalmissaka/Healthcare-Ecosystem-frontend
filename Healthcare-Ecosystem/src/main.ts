import { bootstrapApplication } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';

const finalConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideCharts(withDefaultRegisterables())
  ]
};

bootstrapApplication(App, finalConfig)
  .catch((err) => console.error(err));
