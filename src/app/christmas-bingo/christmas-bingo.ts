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
  readonly SELECTED_KEY = this.STORAGE_KEY + '-selected';
  readonly TIMESTAMP_KEY = this.STORAGE_KEY + '-timestamp';
  readonly EXPIRY_HOURS = 8;

  bingoNumbers: number[] = Array.from({ length: 75 }, (_, i) => i + 1);

  card: any[][] = [];
  selectedCells: boolean[][] = [];
  isPrintMode: boolean = false;
  private Save: boolean = false;

  ngOnInit(): void {
    // Check for ?clear=true
    const params = new URLSearchParams(window.location.search);
    this.Save = params.get('noclear') === 'true';
    this.isPrintMode = params.get('print') === 'true';

    const savedCard = this.Save ? null : localStorage.getItem(this.STORAGE_KEY);
    const savedSelected = this.Save ? null : localStorage.getItem(this.SELECTED_KEY);
    const savedTimestamp = this.Save ? null : localStorage.getItem(this.TIMESTAMP_KEY);

    const now = Date.now();

    if (savedCard && savedTimestamp) {
      const ageMs = now - parseInt(savedTimestamp, 10);
      const expiryMs = this.EXPIRY_HOURS * 60 * 60 * 1000;

      if (ageMs > expiryMs) {
        this.generateCard();
      } else {
        this.card = JSON.parse(savedCard);
      }
    } else {
      this.generateCard();
    }

    if (savedSelected) {
      this.selectedCells = JSON.parse(savedSelected);
    } else {
      this.selectedCells = this.card.map(row => row.map(_ => false));
    }
  }

  toggleCell(rowIndex: number, colIndex: number) {
    this.selectedCells[rowIndex][colIndex] = !this.selectedCells[rowIndex][colIndex];
    if (!this.Save) {
      localStorage.setItem(this.SELECTED_KEY, JSON.stringify(this.selectedCells));
    }
  }

  generateCard(): void {
    const shuffled = [...this.bingoNumbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);

    this.card = [];
    while (shuffled.length) {
      this.card.push(shuffled.splice(0, 5));
    }

    // Set the center cell to "FREE"
    const middle = Math.floor(this.card.length / 2);
    this.card[middle][middle] = 'FREE';

    // Initialize selectedCells, optionally mark free space as selected
    this.selectedCells = this.card.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === middle && colIndex === middle ? true : false))
    );

    if (!this.Save) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.card));
      localStorage.setItem(this.TIMESTAMP_KEY, Date.now().toString());
      localStorage.setItem(this.SELECTED_KEY, JSON.stringify(this.selectedCells));
    }
  }

}
