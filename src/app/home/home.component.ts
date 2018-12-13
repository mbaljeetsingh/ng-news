import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  news: any;
  newsSubscription;

  constructor(
    private newsService: NewsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.newsSubscription = this.newsService
      .getData('top-headlines?country=us')
      .subscribe(data => {
        this.news = data;
      });
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  onFavorite(article) {
    console.log(article);

    let items = [];
    const val = localStorage.getItem('items');

    if (val !== null) {
      items = JSON.parse(val);
    }
    items.push(article);
    localStorage.setItem('items', JSON.stringify(items));
    this.snackBar.open('Favorite Added', 'ok', {
      duration: 3000
    });
  }
}
