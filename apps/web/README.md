# Webapplikation – Sanity Turbo

Denne mappe indeholder **webapplikationen** til Sanity Turbo-projektet. Den er bygget med **Next.js** og integrerer **Sanity.io** som headless CMS. Applikationen bruger **Tailwind CSS** til styling og følger en modulær arkitektur for skalerbarhed og vedligeholdelse.

---

## 🚀 Funktioner

- **Headless CMS-integration**: Drevet af [Sanity.io](https://www.sanity.io/) til dynamisk indholdsstyring.
- **Next.js Framework**: Understøtter server-side rendering, statisk generering og API-ruter.
- **Tailwind CSS**: Utility-first CSS framework til hurtig og responsiv UI-udvikling.
- **TypeScript**: Stærkt typet kodebase for bedre udvikleroplevelse.
- **Brugerdefinerede plugins**:
  - `presentationTool`: Forbedret visning af indhold.
  - `pagesNavigator`: Effektiv sidestruktur og navigation i Sanity Studio.

---

## 📁 Mappestruktur

```
apps/web/
├── .env                   # Miljøvariabler
├── next.config.ts         # Next.js konfiguration
├── package.json           # Projektets afhængigheder og scripts
├── src/                   # Kildekode
│   ├── app/               # Next.js app-mappe
│   ├── components/        # Genanvendelige React-komponenter
│   ├── hooks/             # Brugerdefinerede React hooks
│   ├── sanity/            # Sanity konfiguration og værktøjer
│   ├── styles/            # Tailwind CSS-styling
│   ├── types/             # TypeScript type-definitioner
│   ├── utils/             # Hjælpefunktioner
├── tailwind.config.ts     # Tailwind CSS-konfiguration
└── tsconfig.json          # TypeScript-konfiguration
```

---

## 🛠 Kom godt i gang

### Forudsætninger

- **Node.js** (version 16 eller nyere)
- **Yarn** eller **npm**

### Installation

1. Klon repositoriet:

   ```bash
   git clone https://github.com/your-repo/sanity-turbo.git
   cd sanity-turbo/apps/web
   ```

2. Installer afhængigheder:

   ```bash
   yarn install
   # eller
   npm install
   ```

3. Konfigurér miljøvariabler:
   ```bash
   cp .env.example .env
   # Opdater .env-filen med dine specifikke værdier
   ```

---

## 👨‍💻 Udvikling

Start udviklingsserveren:

```bash
yarn dev
# eller
npm run dev
```

Applikationen kører nu på [http://localhost:3000](http://localhost:3000)

---

## 📦 Produktion

Byg applikationen til produktion:

```bash
yarn build
# eller
npm run build
```

Start produktionsserveren:

```bash
yarn start
# eller
npm run start
```

---

## 🧹 Kodekvalitet og typer

Kør linting:

```bash
yarn lint
# eller
npm run lint
```

Tjek for TypeScript-typer:

```bash
yarn check-types
# eller
npm run check-types
```

---

## 🧩 Brugerdefinerede Plugins

### `presentationTool`

Et brugerdefineret wrapper-plugin til Sanitys præsentationsværktøj, som forbedrer visning og redigering af indhold.

### `pagesNavigator`

Et plugin til nem navigation og oprettelse af sider i Sanity Studio.

---

## ⚙️ Konfiguration

### Tailwind CSS

Konfigureret i `tailwind.config.ts`. Du kan udvide eller tilpasse temaet efter behov.

### Sanity-integration

Findes i `src/sanity/`. Opdater `sanity.api.ts` med dine projektspecifikke oplysninger.

---

## 🤝 Bidrag

Bidrag er meget velkomne! Følg venligst kodestilen og sørg for at teste dine ændringer, inden du sender en pull request.

---

## 📄 Licens

Dette projekt er licenseret under **MIT-licensen**. Se [LICENSE](LICENSE)-filen for detaljer.
