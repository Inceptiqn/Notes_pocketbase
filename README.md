#  Notes App con PocketBase

Un'applicazione web moderna per prendere appunti, costruita con Vite, TailwindCSS, DaisyUI e PocketBase come backend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

##  Caratteristiche

-  **Interfaccia moderna**: UI pulita e responsive con TailwindCSS e DaisyUI
-  **Design responsive**: Funziona perfettamente su desktop e mobile
-  **Salvataggio automatico**: Le note vengono sincronizzate automaticamente con il database
-  **Sincronizzazione in tempo reale**: Pulsante sync per aggiornare le note dal server
-  **Editor semplice**: Interfaccia intuitiva per creare e modificare note
-  **Gestione completa**: Crea, modifica ed elimina note facilmente
-  **Theme support**: Supporto per temi chiari e scuri tramite DaisyUI

##  Tecnologie Utilizzate

### Frontend
- **Vite** - Build tool veloce e moderno
- **TailwindCSS v4** - Framework CSS utility-first
- **DaisyUI** - Componenti UI per TailwindCSS
- **JavaScript ES6+** - Moduli nativi e sintassi moderna

### Backend
- **PocketBase** - Database real-time con API REST automatiche
- **SQLite** - Database incorporato per la persistenza dei dati

##  Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** (versione 18 o superiore)
- **npm** o **yarn**
- **PocketBase** (incluso nel progetto)

##  Installazione

1. **Clona il repository:**
   ```bash
   git clone <url-repository>
   cd Notes_pocketbase
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Avvia PocketBase:**
   
   Su **Windows:**
   ```powershell
   .\pocketbase_0.33.0_windows_amd64\pocketbase.exe serve
   ```
   
   Su **Linux/macOS:**
   ```bash
   ./pocketbase_0.33.0_linux_amd64/pocketbase serve
   ```

4. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

5. **Apri l'applicazione:**
   - Frontend: http://localhost:5173
   - PocketBase Admin: http://localhost:8090/_/

##  Struttura del Progetto

```
├── index.html                          # File HTML principale
├── package.json                        # Dipendenze e script npm
├── vite.config.js                      # Configurazione Vite
├── src/
│   ├── css/
│   │   └── style.css                   # Stili personalizzati
│   └── js/
│       ├── main.js                     # Entry point dell'applicazione
│       ├── notes.js                    # Logica di gestione delle note
│       ├── events.js                   # Gestione degli eventi UI
│       └── render.js                   # Funzioni di rendering
├── pocketbase_0.33.0_windows_amd64/    # PocketBase per Windows
├── pocketbase_0.33.0_linux_amd64/      # PocketBase per Linux
│   ├── pb_data/                        # Database e configurazioni
│   │   ├── data.db                     # Database SQLite principale
│   │   └── auxiliary.db                # Database ausiliario
│   └── pb_migrations/                  # Migrazioni del database
└── README.md                           # Questo file
```

##  Come Usare l'Applicazione

### Creazione di una Nota
1. Clicca il pulsante **"+"** nella barra laterale sinistra
2. Inserisci il titolo della nota nel campo in alto
3. Scrivi il contenuto nell'area di testo principale
4. Clicca **"Save"** per salvare la nota

### Modifica di una Nota
1. Seleziona una nota dalla lista nella barra laterale
2. Modifica il titolo o il contenuto
3. Le modifiche vengono salvate automaticamente

### Eliminazione di una Nota
1. Seleziona la nota che vuoi eliminare
2. Clicca il pulsante **"Delete"** 
3. La nota verrà eliminata definitivamente

### Sincronizzazione
- Clicca il pulsante **"Sync"** per sincronizzare le note con il server
- Le note non sincronizzate sono contrassegnate visivamente

##  Struttura del Database

L'applicazione utilizza una collezione **"Notes"** in PocketBase con i seguenti campi:

| Campo      | Tipo      | Descrizione                    |
|------------|-----------|--------------------------------|
| `id`       | Text      | ID univoco della nota         |
| `title`    | Text      | Titolo della nota             |
| `content`  | Text      | Contenuto della nota          |
| `created`  | DateTime  | Data di creazione             |
| `updated`  | DateTime  | Data ultima modifica          |

##  Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Costruisce l'applicazione per la produzione
- `npm run preview` - Anteprima dell'applicazione buildatata

##  Configurazione PocketBase

### Setup Iniziale
1. Avvia PocketBase per la prima volta
2. Vai su http://localhost:8090/_/
3. Crea un account admin
4. Le migrazioni del database verranno applicate automaticamente

##  Licenza

Questo progetto è rilasciato sotto la licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli.
