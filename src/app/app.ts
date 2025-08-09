import { Component, signal } from '@angular/core';
// RouterOutlet is not used in the template for now
import { CommonModule } from '@angular/common';
import { MutationCheckComponent } from './components/mutation-check/mutation-check.component';
import { StatsComponent } from './components/stats/stats.component';
import { ListComponent } from './components/list/list.component';
import { DnaService } from './services/dna.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MutationCheckComponent, StatsComponent, ListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('dna-mutation-detector-frontend');
  constructor(public dnaService: DnaService) {}
}
