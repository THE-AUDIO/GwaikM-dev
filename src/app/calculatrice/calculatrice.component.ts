import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calculatrice',
  imports: [CommonModule],
  templateUrl: './calculatrice.component.html',
  styleUrl: './calculatrice.component.css'
})
export class CalculatriceComponent {
  currentCalculation = '';
  isCalculating = false;

  sarcasticResponses: string[] = [
    "Ton QI doit être égal à la température ambiante pour avoir besoin d'aide sur ça...",
    "Si la stupidité était une énergie, tu pourrais alimenter une ville entière.",
    "Je savais pas qu'on pouvait descendre si bas intellectuellement...",
    "T'es le genre de personne qui compte sur ses doigts en public, hein ?",
    "Tes parents doivent être tellement déçus de toi...",
    "Même une calculatrice de supermarché à 2€ aurait honte pour toi.",
    "T'as dû rater le jour où ils ont expliqué comment compter en maternelle.",
    "Je pensais que l'évolution allait vers l'avant, visiblement pas pour toi.",
    "Si tu étais un peu plus lent, tu serais en arrière dans le temps.",
    "C'est pas toi qui devrais faire des calculs, c'est ton psy qui devrait calculer ses honoraires."
  ];

  errorResponses: string[] = [
    "Putain mais t'es vraiment une catastrophe ambulante...",
    "Même un singe avec une calculatrice ferait mieux que ça.",
    "T'as quoi dans le crâne ? De la purée ?",
    "Je crois que j'ai perdu des neurones rien qu'en voyant ton calcul.",
    "T'es la preuve vivante que l'éducation nationale a échoué."
  ];

  resultContent: string = '';
  thinking = false;
  showResult = false;

  appendToDisplay(value: string): void {
    if (this.isCalculating) return;
    this.currentCalculation += value;
  }

  clearDisplay(): void {
    if (this.isCalculating) return;
    this.currentCalculation = '';
    this.showResult = false;
  }

  calculate(): void {
    if (this.isCalculating || this.currentCalculation === '') return;
    this.isCalculating = true;
    this.thinking = true;
    this.showResult = false;

    setTimeout(() => {
      try {
        const sanitizedInput = this.currentCalculation.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(sanitizedInput);

        const sarcastic = this.sarcasticResponses[Math.floor(Math.random() * this.sarcasticResponses.length)];

        this.resultContent = `
          <p class="text-gray-600 text-sm">Ton \"calcul\":</p>
          <p class="text-gray-800 font-medium">${this.currentCalculation}</p>
          <p class="text-gray-600 text-sm mt-2">Résultat (évident):</p>
          <p class="text-green-600 text-2xl font-bold">${result}</p>
          <p class="text-red-500 text-sm mt-3 italic">\"${sarcastic}\"</p>
        `;

        this.currentCalculation = result.toString();
      } catch (error) {
        const randomError = this.errorResponses[Math.floor(Math.random() * this.errorResponses.length)];
        this.resultContent = `
          <p class="text-red-600 font-medium">Erreur de calcul!</p>
          <p class="text-red-500 text-sm mt-1 italic">\"${randomError}\"</p>
        `;
        this.currentCalculation = '';
      }

      this.isCalculating = false;
      this.thinking = false;
      this.showResult = true;
    }, 5000);
  }

  get calculationMessage(): string {
    if (this.currentCalculation === '') {
      return '<p class="text-gray-500 text-sm">En attente de calcul...</p>';
    } else if (this.isCalculating) {
      return `<p class="text-gray-600">Je réfléchis à: <span class="font-medium">${this.currentCalculation}</span></p>`;
    } else {
      return `<p class="text-gray-800 font-medium">${this.currentCalculation}</p>`;
    }
  }
}