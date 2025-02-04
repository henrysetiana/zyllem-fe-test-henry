import { Component, OnInit } from '@angular/core';
import { ZyllemApiService } from '../app.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Article, NormalArticle } from '../model/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  mainArticle: Article | null = null;
  articles: Array<Article> = [];
  filteredArticles: Array<Article> = [];
  selectedType: string = 'All';
  articleTypes: string[] = ['All', 'FEATURED', 'NORMAL', 'VIDEO'];
  loading = true;
  error: string = '';

  constructor(private appService: ZyllemApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.appService.getArticles().subscribe(
      (data) => {
        this.mainArticle = data.find((article)=>article.type=="VIDEO");
        this.articles = data.filter((article)=> this.mainArticle && article.id!==this.mainArticle.id);
        this.onFilterChange();
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load articles';
        this.loading = false;
      }
    );
  }

  // Filter articles based on the selected type
  onFilterChange(): void {
    if (this.selectedType === 'All' || !this.selectedType) {
      this.filteredArticles = this.articles;  // Show all if 'All' is selected or no filter
    } else {
      this.filteredArticles = this.articles.filter(article => article.type === this.selectedType);
    }
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
