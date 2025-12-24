import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-christmas-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './christmas-bingo.html',
  styleUrls: ['./christmas-bingo.css']
})
export class ChristmasBingoComponent implements OnInit {

  readonly STORAGE_KEY = 'christmas-bingo-card';

  bingoWords: string[] = [
    'Ugly Sweater',
    'Hot Cocoa',
    'Candy Canes',
    'Christmas Lights',
    'Silent Night',
    'Wrapping Paper',
    'Snowman',
    'Jingle Bells',
    'Reindeer',
    'Santa Laugh',
    'Stockings',
    'Christmas Tree',
    'Holiday Music',
    'Eggnog',
    'Mistletoe',
    'Gingerbread',
    'Fireplace',
    'Family Photo',
    'Snowflakes',
    'Holiday Movie',
    'Caroling',
    'Ornaments',
    'Winter Scarf',
    'Christmas Cookies',
    'North Pole'
  ];

  card: string[][] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.card = JSON.parse(saved);
    } else {
      this.generateCard();
    }
  }

  generateCard(): void {
    const shuffled = [...this.bingoWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);

    this.card = [];
    while (shuffled.length) {
      this.card.push(shuffled.splice(0, 5));
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.card));
  }
}
