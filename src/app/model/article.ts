
export abstract class Article {
    id: string
    title: string;
    author: string;
    publishedAt: string; //date time in ISO format 
    url: string;
    type: ArticleType;
    fullContent: string;
}

export class NormalArticle extends Article {
    description: string;
}

export class FeaturedArticle extends  Article{
    featureImgUrl: string;
}

export class VideoArticle extends  Article{
    videoUrl: string;
}

export enum ArticleType {
    NORMAL = "NORMAL",
    FEATURED = "FEATURED",
    VIDEO = "VIDEO",
}