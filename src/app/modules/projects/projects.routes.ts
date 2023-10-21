import { Route } from '@angular/router';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsCreateComponent } from './pages/projects-create/projects-create.component';

export const projectsRoutes: Route[] = [
  {
    path: '',
    title: 'ABC Jobs | Projects',
    component: ProjectsComponent,
  },

  {
    path: 'create',
    title: 'ABC Jobs | Projects Create',
    component: ProjectsCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
