import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaService } from '../../services/dna.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: any = null;

  constructor(private dnaService: DnaService) {}

  ngOnInit() {
    this.dnaService.getStats().subscribe({
      next: (data) => {
        console.debug('[DNA UI] Stats loaded', data);
        this.stats = data;
      },
      error: (err) => {
        console.error('[DNA UI] Failed to load stats', err);
      }
    });
  }
}
