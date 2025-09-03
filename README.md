# Centrum Medyczne Endonova - Specjalistyczne badania endoskopowe

strona internetowa dla Centrum Medycznego Endonova - specjalistycznej placówki medycznej koncentrującej się na badaniach endoskopowych przewodu pokarmowego.

## 🎯 Funkcjonalności

- **Nowoczesny design**: Minimalistyczny, profesjonalny wygląd dostosowany do branży medycznej
- **Responsywność**: Pełna kompatybilność z urządzeniami mobilnymi, tabletami i desktopami
- **Dostępność**: Zgodność z wytycznymi WCAG 2.1 AA
- **Interaktywność**: Smooth scroll, animacje, efekty hover
- **Formularz kontaktowy**: Walidacja w czasie rzeczywistym
- **SEO**: Zoptymalizowana struktura HTML i meta tagi

## 🏗️ Technologie

- **Vite** - szybki bundler i dev server
- **Vanilla JavaScript ES6+** - JavaScript bez frameworków
- **CSS3** - wykorzystanie Grid, Flexbox, Custom Properties
- **HTML5** - semantyczny 

## 📱 Sekcje strony

1. **Hero** - Nagłówek z głównym przekazem i statystykami
2. **Usługi** - Karty usług medycznych z ikonami
3. **O nas** - Informacje o centrum
4. **Kontakt** - Dane kontaktowe i formularz umówienia wizyty
5. **Stopka** - Dodatkowe informacje i linki

## 🚀 Uruchomienie projektu

### Wymagania
- Node.js (wersja 18 lub wyższa)
- npm lub yarn

### Instalacja i uruchomienie

1. **Zainstaluj zależności:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Uruchom serwer deweloperski:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Otwórz przeglądarkę:**
   - Strona będzie dostępna pod adresem: http://localhost:5173

### Dostępne komendy

- \`npm run dev\` - uruchomienie serwera deweloperskiego
- \`npm run build\` - budowanie wersji produkcyjnej
- \`npm run preview\` - podgląd wersji produkcyjnej

## 📱 Responsywność

Strona została zaprojektowana z podejściem mobile-first i jest w pełni responsywna:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ♿ Dostępność

Projekt implementuje najlepsze praktyki dostępności:

- Semantyczny HTML5
- Etykiety ARIA
- Nawigacja klawiaturowa
- Odpowiedni kontrast kolorów
- Focus indicators
- Screen reader support

## 🔧 Konfiguracja

### Dostosowywanie kolorów
Edytuj zmienne CSS w pliku \`src/style.css\`:

\`\`\`css
:root {
  --color-primary: #06b6d4;
  --color-secondary: #f0f9ff;
  /* ... */
}
\`\`\
