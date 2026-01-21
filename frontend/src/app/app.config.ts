import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroMoon, heroPencil, heroPlus, heroSun, heroTrash } from '@ng-icons/heroicons/outline';
import { provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthState } from './state/auth/auth.state';
import { TasksState } from './state/tasks/tasks.state';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore([AuthState, TasksState]),
    provideIcons({
      heroPencil,
      heroTrash,
      heroPlus,
      heroMoon,
      heroSun,
    }),
  ],
};
