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
  selectedCells: boolean[][] = [];

  ngOnInit(): void {
    const savedCard = localStorage.getItem(this.STORAGE_KEY);
    const savedSelected = localStorage.getItem(this.STORAGE_KEY + '-selected');

    if (savedCard) {
      this.card = JSON.parse(savedCard);
    } else {
      this.generateCard();
    }

    // Initialize selectedCells from localStorage or as all false
    if (savedSelected) {
      this.selectedCells = JSON.parse(savedSelected);
    } else {
      this.selectedCells = this.card.map(row => row.map(_ => false));
    }
  }

  toggleCell(rowIndex: number, colIndex: number) {
    this.selectedCells[rowIndex][colIndex] = !this.selectedCells[rowIndex][colIndex];

    // Save updated selected state to localStorage
    localStorage.setItem(this.STORAGE_KEY + '-selected', JSON.stringify(this.selectedCells));
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

    // Reset selected cells when a new card is generated
    this.selectedCells = this.card.map(row => row.map(_ => false));
    localStorage.setItem(this.STORAGE_KEY + '-selected', JSON.stringify(this.selectedCells));
  }

}
