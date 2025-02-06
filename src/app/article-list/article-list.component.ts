import { Component, OnInit } from '@angular/core';
import { ZyllemApiService } from '../app.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Article, ArticleType, NormalArticle } from '../model/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  mainArticle: Article | null = null;
  articles: Array<Article> = [];
  selectedType: string = 'ALL';
  articleTypes: string[] = ['ALL', ...Object.values(ArticleType)];
  loading = true;
  error: string = '';

  constructor(private appService: ZyllemApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData():void {
    this.mainArticle = null;
    this.articles = [];
    this.loading = true;
    this.error = "";

    this.appService.getArticles(this.selectedType).subscribe(
      (data) => {
        this.mainArticle = data.find((article)=>article.type=="VIDEO");
        this.articles = data.filter((article)=> !this.mainArticle || article.id!==this.mainArticle.id);
        this.loading = false;
        this.error ="";
      },
      (error) => {
        //todo : handle actual error message here, can be logged in FE or display the error by set it on this.error
        
        this.error = 'Failed to load articles';
        this.loading = false;
      }
    );
  }

  // Filter articles based on the selected type
  onFilterChange(): void {
    this.fetchData();
  }

  // Method to sanitize YouTube embed URL
  getSanitizedHtml(url: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

  // Method to sanitize YouTube embed URL
  getSanitizedVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Track by function that uses the article's unique ID
  trackByArticleId(index: number, article: Article): string {
    return article.id;
  }
}
