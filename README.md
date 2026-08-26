# Yoat Park — Réservation d'amarrages de yachts

Site immersif permettant aux propriétaires de yachts de trouver et réserver une
place dans les marinas, à commencer par **Port Hercule (Monaco)**. Construit sur
**Webflow** (piloté via le MCP Webflow).

## 🌐 En ligne

**https://yoat-parks.webflow.io** — déployé sur la page d'accueil du projet Webflow « Yoat Parks »
(site `6a8f28f6be330c0ca07aef3d`, page Home `6a8f28fcbe330c0ca07aef76`).
CSS + Poppins dans le `<head>`, markup + JS dans le bloc **Footer** de la page.

## État actuel — V1 « Vitrine immersive »

- ✅ **Intro cinématique** (mer animée, identité Yoat Park, CTA « Choisir ma place »)
- ✅ **Plan interactif de Port Hercule** : pontons A–D, Quai Antoine 1ᵉʳ, Quai Albert 1ᵉʳ,
  Digue du Large. Chaque place est cliquable → panneau latéral avec longueur/largeur max,
  tirant d'eau, tarif/nuit et statut (disponible / premium / réservée).
- ✅ **Filtres** (toutes / disponibles / premium) et compteur de disponibilités.
- ✅ **Demande de pré-réservation** (V1 sans paiement en ligne — cf. road map).

Le tout tient dans un seul bloc auto-suffisant : [`webflow/embed-port-hercule.html`](webflow/embed-port-hercule.html).

## Intégration dans Webflow

Aucune session Designer requise — tout passe par l'API Data du MCP.

1. Créer un projet Webflow « Yoat Park ».
2. Créer une page (ex. `accueil` ou `port-hercule`).
3. Coller le contenu de `webflow/embed-port-hercule.html` dans le
   **code personnalisé « Footer »** de la page (Page settings → Custom code),
   ou via l'API : `data_scripts_tool → set_page_freeform_code` (location `footer`).
4. (Optionnel) Charger la police **Poppins** dans le `<head>` du site pour la typo exacte.
5. Publier.

Le bloc se positionne en `position:fixed; inset:0` : il prend tout l'écran et fonctionne
sur une page vierge comme par-dessus une page existante.

## Modèle de données (pour la suite CMS)

Chaque place = un item CMS : `id`, `ponton/quai`, `longueur_max`, `largeur_max`,
`tirant_eau`, `tarif_nuit`, `statut`, `premium`. Actuellement généré côté client de façon
déterministe ; l'étape suivante branche ces valeurs sur une **Collection CMS Webflow**.

## Road map

| Phase | Contenu | Statut |
|-------|---------|--------|
| **1 — Vitrine immersive** | Intro + carte interactive Port Hercule | ✅ Fait |
| **2 — CMS** | Collections Marinas / Places, carte alimentée par le CMS | À faire |
| **3 — Disponibilité** | Calendrier + logique de blocage (backend : Supabase/Airtable) | À faire |
| **4 — Paiement** | Stripe Checkout + confirmation + email | À faire |
| **5 — Multi-marinas & i18n** | Autres ports, espace propriétaire (Memberstack), FR/EN/IT | À faire |
| **6 — Go-live** | Domaine, SEO, RGPD, analytics | À faire |

## Structure

```
webflow/embed-port-hercule.html   Expérience complète (intro + carte) — prête à coller dans Webflow
README.md                         Ce document
```
