import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-stress',
  imports: [],
  templateUrl: './stress.component.html',
  styleUrl: './stress.component.css'
})
export class StressComponent {
  errorCount = 0;
  isMouseMoving = false;
  mouseX = 0;
  mouseY = 0;
  cursorTrails: HTMLDivElement[] = [];
  errorContainer!: HTMLElement;
  errorSound!: HTMLAudioElement;
  closeSound!: HTMLAudioElement;
  mainButton!: HTMLElement;

  readonly annoyingMessages = [
    "Erreur 404 : Stress Introuvable",
    "Surcharge Système : Trop de Relaxation",
    "Attention : Votre Ordinateur a des Virus",
    "Erreur Critique : Impossible de Calculer le Calme",
    "Alerte : Votre Niveau de Stress est Trop Bas",
    "Erreur : Échec de Déstressage",
    "Attention : Ceci n'est pas un Exercice",
    "Crash Système Imminent",
    "Fuite Mémoire Détectée",
    "Exception d'Exécution : Trop de Zen à Gérer",
    "Espace Disque Plein - Supprimez des Soucis",
    "Connexion Échouée - Réessayez Plus Tard (Blague)",
    "Votre PC a un Problème et Doit Re-stresser",
    "Écran Bleu de Stress",
    "404 Sérénité Introuvable",
    "Mémoire Insuffisante : Trop de Paix",
    "Clavier Introuvable - Appuyez sur une Touche",
    "Système de Fichiers Corrompu - Toutes Vos Données Sont Perdues",
    "Connexion Réseau Instable - Comme Votre Santé Mentale",
    "Mise à Jour Critique Requise - 99% Complète"
  ];

  readonly annoyingIcons = [
    "fa-exclamation-triangle",
    "fa-bug",
    "fa-skull",
    "fa-bomb",
    "fa-radiation",
    "fa-biohazard",
    "fa-fire",
    "fa-poo",
    "fa-ghost",
    "fa-virus"
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.mainButton = document.getElementById('mainButton')!;
    this.errorContainer = document.getElementById('errorContainer')!;
    this.errorSound = document.getElementById('errorSound') as HTMLAudioElement;
    this.closeSound = document.getElementById('closeSound') as HTMLAudioElement;

    setInterval(() => {
      if (Math.random() < 0.3) {
        document.title = '⚠️ ERROR  ⚠️';
        setTimeout(() => (document.title = 'Anti-Stress Button'), 500);
      }
    }, 2000);

    setInterval(() => {
      if (this.errorCount > 5 && Math.random() < 0.1) {
        document.body.style.backgroundColor = '#ff0000';
        setTimeout(() => {
          document.body.style.backgroundColor = '#f0f0f0';
        }, 100);
      }
    }, 3000);
  }

  onMainButtonClick(): void {
    if (Math.random() < 0.3) {
      this.showBSOD();
    } else {
      for (let i = 0; i < 3; i++) this.createErrorMessage();
    }

    this.moveButtonRandomly();
    // this.errorSound.currentTime = 0;
    // this.errorSound.play();

    const texts = [
      'Why Did You Click Me?',
      'Stop Clicking!',
      "This Isn't Helping!",
      "You're Making It Worse!",
      'Error: User Too Stressed',
      'I Told You Not To Click!',
      "Now Look What You've Done!",
      'System Failure Initiated',
      'Abort! Abort!',
      'Too Late To Go Back Now'
    ];
    const colors = ['bg-red-700', 'bg-yellow-500', 'bg-purple-700', 'bg-pink-700', 'bg-black'];

    this.mainButton.textContent = texts[Math.floor(Math.random() * texts.length)];
    this.mainButton.className = `text-white font-bold py-6 px-12 rounded-full text-2xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none ${colors[Math.floor(Math.random() * colors.length)]}`;

    if (!this.isMouseMoving) {
      this.isMouseMoving = true;
      document.addEventListener('mousemove', this.trackCursor.bind(this));
    }
  }

  moveButtonRandomly(): void {
    const x = Math.random() * (window.innerWidth - this.mainButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - this.mainButton.offsetHeight);
    this.mainButton.style.position = 'absolute';
    this.mainButton.style.left = `${x}px`;
    this.mainButton.style.top = `${y}px`;
    setTimeout(() => this.moveButtonRandomly(), 2000);
  }

  createErrorMessage(): string {
    this.errorCount++;
    const errorId = `error-${this.errorCount}`;
    const msg = this.annoyingMessages[Math.floor(Math.random() * this.annoyingMessages.length)];
    const icon = this.annoyingIcons[Math.floor(Math.random() * this.annoyingIcons.length)];
    const x = Math.random() * (window.innerWidth - 300);
    const y = Math.random() * (window.innerHeight - 200);

    const div = this.renderer.createElement('div');
    div.id = errorId;
    div.className = 'error-message bg-white rounded-lg overflow-hidden';
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.innerHTML = `
      <div class="bg-red-600 text-white p-3 flex justify-between items-center">
        <div class="flex items-center">
          <i class="fas ${icon} mr-2"></i>
          <span class="font-bold">ERROR</span>
        </div>
        <button class="close-btn text-white hover:text-red-200 focus:outline-none" (click)="closeError('${errorId}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-4 text-gray-800">
        ${msg}
        <div class="mt-3 text-xs text-gray-500">Error code: 0x${Math.floor(Math.random() * 10000).toString(16).toUpperCase()}</div>
      </div>
      <div class="bg-gray-100 px-4 py-2 flex justify-between items-center text-sm">
        <button class="text-blue-600 hover:underline focus:outline-none" (click)="createMoreErrors('${errorId}')">Details</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none" (click)="closeError('${errorId}')">OK</button>
      </div>
    `;
    this.renderer.appendChild(this.errorContainer, div);
    return errorId;
  }

  trackCursor(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const trail = this.renderer.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${this.mouseX - 10}px`;
    trail.style.top = `${this.mouseY - 10}px`;
    const colors = ['rgba(255,0,0,0.5)', 'rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,255,0,0.5)', 'rgba(255,0,255,0.5)'];
    trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    this.renderer.appendChild(document.body, trail);
    this.cursorTrails.push(trail);
    if (this.cursorTrails.length > 20) {
      const old = this.cursorTrails.shift();
      old?.remove();
    }
  }

  showBSOD(): void {
    const bsod = this.renderer.createElement('div');
    bsod.className = 'fixed inset-0 bg-blue-600 text-white p-8 z-[9999] font-mono';
    bsod.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-4xl mb-4">:(</div>
        <div class="text-2xl mb-6">Votre PC a rencontré un problème et doit redémarrer.</div>
        <div class="mb-4">Nous allons redémarrer pour vous.</div>
        <div class="mb-8">Code d'erreur : CRITICAL_STRESS_FAILURE</div>
        <div class="text-sm opacity-80">
          <div>0% complété</div>
          <div class="mt-2">Pour plus d'informations sur ce problème, visitez https://www.vousetesstressé.com/stopclicking</div>
          <div class="mt-4">Si vous appelez un technicien, donnez-lui ces informations :</div>
          <div class="mt-2 bg-blue-700 p-2">StopCode: 0x0000005T</div>
        </div>
      </div>
    `;
    this.renderer.appendChild(document.body, bsod);

    setTimeout(() => {
      bsod.remove();
      for (let i = 0; i < 5; i++) this.createErrorMessage();
    }, 5000);
  }

  closeError(errorId: string): void {
    this.closeSound.currentTime = 0;
    this.closeSound.play();
    const el = document.getElementById(errorId);
    if (el) {
      el.remove();
      for (let i = 0; i < 2; i++) this.createErrorMessage();
    }
  }

  createMoreErrors(errorId: string): void {
    for (let i = 0; i < 3; i++) this.createErrorMessage();
    const el = document.getElementById(errorId);
    const messageDiv = el?.querySelector('.p-4') as HTMLElement;
    if (messageDiv) {
      messageDiv.innerHTML = `
        The situation is worse than we thought.<br><br>
        <span class="font-bold">Recommendation:</span> Panic.<br><br>
        <div class="mt-3 text-xs text-gray-500">Error code: 0x${Math.floor(Math.random() * 10000).toString(16).toUpperCase()}</div>
      `;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.mainButton.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) {
      const angle = Math.atan2(distanceY, distanceX);
      const newX = event.clientX + Math.cos(angle) * 100 - rect.width / 2;
      const newY = event.clientY + Math.sin(angle) * 100 - rect.height / 2;
      this.mainButton.style.position = 'absolute';
      this.mainButton.style.left = `${newX}px`;
      this.mainButton.style.top = `${newY}px`;
    }
  }
}
