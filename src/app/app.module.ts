import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ZyllemApiService } from './app.service';
import { ArticleListComponent } from './article-list/article-list.component';
import { FormsModule } from '@angular/forms';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
