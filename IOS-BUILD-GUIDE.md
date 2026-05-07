# Guide : Obtenir un IPA installable depuis Windows

Ce guide explique comment générer un fichier `.ipa` de l'app Prelease Canada depuis Windows en utilisant **Codemagic** (build cloud Mac gratuit jusqu'à 500 min/mois).

## Étape 1 — Créer un compte Codemagic (gratuit)

1. Va sur https://codemagic.io/signup
2. Connecte-toi avec ton compte GitHub/GitLab/Bitbucket
3. Tier gratuit : **500 minutes de build/mois**

## Étape 2 — Pousser le code sur un repo Git

Le projet mobile actuel n'est pas un repo git. Crée-en un :

```powershell
cd "d:\Prelease Canada\prelease-mobile-master"
git init
git add .
git commit -m "Initial mobile app commit"
# Crée un repo privé sur GitHub, puis :
git remote add origin https://github.com/TON_USER/prelease-mobile.git
git branch -M main
git push -u origin main
```

## Étape 3 — Connecter le repo à Codemagic

1. Dashboard Codemagic → **Add application**
2. Sélectionne ton provider (GitHub/GitLab/Bitbucket)
3. Sélectionne le repo `prelease-mobile`
4. Codemagic détecte automatiquement le `codemagic.yaml`

## Étape 4 — Lancer le build

Sur le dashboard Codemagic, clique **Start new build** et choisis un workflow :

### Workflow A : `ios-unsigned` (RECOMMANDÉ pour tester)

- **Aucune config Apple requise**
- Génère un `.ipa` **non signé**
- Installable via **AltStore** ou **Sideloadly** sur ton iPhone (avec un Apple ID gratuit)
- Limites : l'app expire après **7 jours** (Apple ID gratuit) ou **1 an** (Apple ID payant), il faut re-signer

### Workflow B : `ios-signed-testflight`

- **Nécessite un compte Apple Developer ($99/an)**
- Distribution officielle via TestFlight
- Pas d'expiration, jusqu'à 100 testeurs externes
- Configuration nécessaire dans Codemagic :
  - Settings → **Integrations** → **App Store Connect**
  - Ajouter l'API key (générée depuis https://appstoreconnect.apple.com/access/api)

## Étape 5 — Télécharger l'IPA

Une fois le build terminé (15-25 min) :
1. Dashboard Codemagic → ton build → onglet **Artifacts**
2. Télécharge `Readyrental-unsigned.ipa`

## Étape 6 — Installer l'IPA sur l'iPhone

### Option A : AltStore (recommandé, gratuit)

1. Installe **AltServer** sur ton PC : https://altstore.io/
2. Installe **iTunes** depuis le site Apple (pas le Microsoft Store)
3. Connecte ton iPhone via USB
4. Ouvre AltServer → "Install AltStore" → choisis ton iPhone
5. Sur l'iPhone : Réglages → Général → VPN et gestion de l'appareil → Faire confiance à ton Apple ID
6. Ouvre AltStore sur l'iPhone → onglet "My Apps" → bouton **+** en haut à gauche
7. Sélectionne le fichier `Readyrental-unsigned.ipa`
8. AltStore signe l'IPA avec ton Apple ID gratuit et l'installe ✅

⚠️ **Limitations Apple ID gratuit** :
- 3 apps max simultanément
- Expire au bout de 7 jours → relancer AltStore pour re-signer

### Option B : Sideloadly

1. Télécharge https://sideloadly.io/
2. Connecte l'iPhone, drag & drop l'IPA dans Sideloadly
3. Entre ton Apple ID, clique **Start**

### Option C : Diawi (lien partageable)

Si l'IPA est **signé** (workflow B) :
1. Va sur https://www.diawi.com/
2. Upload l'IPA → reçois un lien
3. Ouvre le lien sur l'iPhone Safari → **Install**

## Quel workflow choisir ?

| Critère | `ios-unsigned` | `ios-signed-testflight` |
|---------|---------------|-------------------------|
| Coût | Gratuit | $99/an Apple Developer |
| Temps de setup | 10 min | 1-2 h (certificats, profiles) |
| Distribution | Sideloadly/AltStore | TestFlight (lien email) |
| Expiration | 7 jours (Apple ID gratuit) | Aucune |
| Testeurs | Toi uniquement | 100 testeurs externes |
| **Verdict** | **✅ Pour tester rapidement** | **Pour distribution équipe/client** |

## Build local sur Mac (alternative)

Si tu as accès à un Mac (collègue, MacinCloud à ~$1/h) :

```bash
cd prelease-mobile-master
npm install --legacy-peer-deps
cd ios
pod install
open Readyrental.xcworkspace
# Dans Xcode : Product → Archive → Distribute App → Ad Hoc / Development
```

## Troubleshooting

- **"No matching profiles"** : assure-toi que `BUNDLE_ID` dans `codemagic.yaml` correspond à ton App ID Apple Developer
- **Build fails on pod install** : ajouter `cd ios && rm -rf Pods Podfile.lock && pod install` dans le script
- **Hermes errors** : déjà désactivé dans `Podfile` (`:hermes_enabled => false`)

## Prochain build après modifications

À chaque push sur `main` (ou autre branche que tu configures), Codemagic peut auto-trigger le build. Configure ça dans Codemagic Settings → **Triggers**.
