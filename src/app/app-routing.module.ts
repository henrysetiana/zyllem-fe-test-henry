// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component'; // Import the new component

const routes: Routes = [
  { path: '', component: ArticleListComponent },  // Default route (Article List)
  { path: 'article/:id', component: ArticleDetailComponent },  // Article Detail page, dynamic route based on article ID
  { path: '**', redirectTo: '' }  // Wildcard for 404 redirection
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}