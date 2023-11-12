import { Route } from '@angular/router';
import { registerTestNoteComponent } from '../register-test-note/pages/register-test-note/register-test-note.component';


export const registerTestNoteRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | RegisterResult',
    component: registerTestNoteComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
