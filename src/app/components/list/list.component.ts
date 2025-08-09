import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnaService } from '../../services/dna.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  records: any[] = [];

  constructor(private dnaService: DnaService) {}

  ngOnInit() {
    this.dnaService.getList().subscribe({
      next: (data: any[]) => {
        console.debug('[DNA UI] List loaded', data);
        this.records = data;
      },
      error: (err) => {
        console.error('[DNA UI] Failed to load list', err);
      }
    });
  }
}
