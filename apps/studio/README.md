# Sanity Studio – Sanity Turbo

Denne mappe indeholder **Sanity Studio** til Sanity Turbo-projektet. Studiet fungerer som et headless CMS, der giver mulighed for at administrere indhold i realtid. Det er bygget med **Sanity.io** og tilpasset med brugerdefinerede plugins og strukturer for at understøtte projektets behov.

---

## 🚀 Funktioner

- **Sanity.io Integration**: Et kraftfuldt headless CMS til indholdsstyring.
- **Brugerdefinerede Plugins**:
  - `presentationTool`: Forbedret visning og redigering af indhold.
  - `pagesNavigator`: Effektiv navigation og oprettelse af sider.
- **Flersproget Support**: Understøtter flere sprog via `documentInternationalization`.
- **Dashboard Widgets**: Tilpassede widgets til projektstyring og hurtig adgang til vigtige funktioner.

---

## 📁 Mappestruktur

```
apps/studio/
├── .env.local              # Lokale miljøvariabler
├── sanity.config.ts        # Sanity Studio konfiguration
├── sanity.cli.ts           # CLI-konfiguration til Sanity
├── src/                    # Kildekode
│   ├── actions/            # Brugerdefinerede Sanity-handlinger
│   ├── api/                 # Brugerdefinerede Sanity API-funktioner
│   ├── components/         # Genanvendelige komponenter til Studio
│   ├── lib/                # Sanity-klient og hjælpefunktioner
│   ├── schemas/            # Sanity-schemas (dokumenter, sektioner, moduler)
│   ├── structure/          # Brugerdefineret struktur til Studio
│   ├── utils/              # Hjælpefunktioner
├── static/                 # Statisk indhold til Studio
├── package.json            # Projektets afhængigheder og scripts
└── tsconfig.json           # TypeScript-konfiguration
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
   cd sanity-turbo/apps/studio
   ```

2. Installer afhængigheder:

   ```bash
   yarn install
   # eller
   npm install
   ```

3. Konfigurér miljøvariabler:
   ```bash
   cp local.env.example .env.local
   # Opdater .env.local med dine specifikke værdier
   ```

---

## 👨‍💻 Udvikling

Start Sanity Studio i udviklingstilstand:

```bash
yarn dev
# eller
npm run dev
```

Studiet kører nu på [http://localhost:3333](http://localhost:3333).

---

## 📦 Produktion

Byg Sanity Studio til produktion:

```bash
yarn build
# eller
npm run build
```

Deploy Sanity Studio:

```bash
yarn deploy
# eller
npm run deploy
```

---

## 🧩 Brugerdefinerede Plugins og Funktioner

### `presentationTool`

Et plugin, der forbedrer visning og redigering af indhold i Sanity Studio.

### `pagesNavigator`

Et plugin til nem navigation og oprettelse af sider i Studio.

### Flersproget Support

Understøttet via `documentInternationalization`, som gør det muligt at administrere indhold på flere sprog.

---

## ⚙️ Konfiguration

### Sanity API

Sanity API-konfiguration findes i `src/lib/sanity.api.ts`. Sørg for at opdatere projekt-ID, dataset og andre nødvendige variabler.

### Brugerdefineret Struktur

Den brugerdefinerede struktur til Studio findes i `src/structure/`. Du kan tilpasse strukturen for at matche dine behov.

---

## 🤝 Bidrag

Bidrag er meget velkomne! Følg venligst kodestilen og sørg for at teste dine ændringer, inden du sender en pull request.

---

## 📄 Licens

Dette projekt er licenseret under **MIT-licensen**. Se [LICENSE](LICENSE)-filen for detaljer.
