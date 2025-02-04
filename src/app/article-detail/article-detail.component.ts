import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { ActivatedRoute } from '@angular/router';
import { ZyllemApiService } from '../app.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  loading = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private appService: ZyllemApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    this.appService.getArticleById(articleId).subscribe(
      (data) => {
        this.article = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load article detail';
        this.loading = false;
      }
    )
  }
  
  // Method to sanitize YouTube embed URL
  getSanitizedHtml(url: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

  // Method to sanitize YouTube embed URL
  getSanitizedVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
