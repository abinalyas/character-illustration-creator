import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContextSelectorComponent } from './context-selector/context-selector.component';

const routes: Routes = [
  // { path: '', redirectTo: '/context-selector', pathMatch: 'full' },
  // { path: 'context-selector', component: ContextSelectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
