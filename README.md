# CasePrep AI — Deploy su Vercel

## Struttura del progetto
```
caseprep_vercel/
├── vercel.json          # configurazione routing
├── package.json
├── api/
│   ├── chat.js          # proxy Anthropic (serverless function)
│   └── tts.js           # proxy ElevenLabs (serverless function)
└── public/
    └── index.html       # frontend
```

---

## Deploy su Vercel (5 minuti)

### Opzione A — Da GitHub (consigliata)
1. Crea un repo su github.com e carica questa cartella
2. Vai su vercel.com → "Add New Project"
3. Importa il repo GitHub
4. Clicca "Deploy" — Vercel rileva automaticamente la struttura

### Opzione B — Da terminale
```bash
npm i -g vercel
cd caseprep_vercel
vercel
```

---

## Variabili d'ambiente (obbligatorio dopo il deploy)

Nel dashboard Vercel → Settings → Environment Variables, aggiungi:

| Nome variabile         | Valore             | Obbligatoria |
|------------------------|--------------------|--------------|
| ANTHROPIC_API_KEY      | sk-ant-...         | ✅ Sì        |
| ELEVENLABS_API_KEY     | sk_...             | ⬜ No (voce browser se assente) |

Dopo aver aggiunto le variabili → clicca **Redeploy**.

---

## Come ottenere le API Key

**Anthropic:**
→ https://console.anthropic.com/settings/keys

**ElevenLabs (opzionale, per voce naturale):**
→ https://elevenlabs.io/app/settings/api-keys
→ Piano gratuito: 10.000 caratteri/mese

---

## Note
- Il dominio Vercel (*.vercel.app) è HTTPS → mic e webcam funzionano senza configurazioni extra
- Le API key sono solo sul server, mai esposte al browser
