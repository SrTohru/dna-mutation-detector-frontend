import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DnaService } from '../../services/dna.service';

@Component({
  selector: 'app-mutation-check',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mutation-check.component.html',
  styleUrls: ['./mutation-check.css']
})
export class MutationCheckComponent {
  dnaInput: string = '';
  result: string | null = null;

  constructor(private dnaService: DnaService) {}

  check() {
    const dnaArray = this.dnaInput.split(',').map(s => s.trim());
    console.debug('[DNA UI] Checking mutation for', dnaArray);
    this.dnaService.checkMutation(dnaArray).subscribe({
      next: (res) => {
        console.debug('[DNA UI] Mutation response', res);
        this.result = res.mutation ? 'Mutation detected ✅' : 'No mutation ❌';
      },
      error: (err) => {
        console.error('[DNA UI] Mutation check failed', err);
        this.result = 'Error checking DNA';
      }
    });
  }
}
