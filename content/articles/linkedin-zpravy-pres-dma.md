---
title: "Jak jsem přes EU zákon dostal vlastní LinkedIn zprávy k AI asistentovi"
slug: linkedin-zpravy-pres-dma
date: 2026-09-30
lang: cs
type: own
category: personal
excerpt: "Neoficiální knihovny hrozí banem, oficiální API zprávy nedá. Pomohl až Digital Markets Act a jedno málo známé API."
status: draft
tags: [AI agents, LinkedIn, DMA, automatizace]
---

> **TODO (autor):** Toto je krátký placeholder. Doplnit úvod, konkrétní kroky, screenshoty a závěr – a teprve pak přepnout `status` na `published`.

Chtěl jsem, aby můj AI asistent uměl přečíst moje LinkedIn zprávy a pomohl mi v nich udržet pořádek. První, co člověk najde, jsou neoficiální knihovny, které se přihlašují vaším heslem a předstírají prohlížeč. Funguje to – do chvíle, než LinkedIn usoudí, že jste bot, a účet zablokuje. Riskovat ban kvůli pohodlí se mi nechtělo.

Oficiální cesta vypadala jako slepá ulička: běžné LinkedIn API vám vaše vlastní zprávy prostě nedá. Pak jsem narazil na **Member Data Portability API**. Existuje díky evropskému Digital Markets Act (DMA) a členům z EU umožňuje stáhnout si vlastní data – včetně zpráv – legálně a přes oficiální rozhraní.

Po vygenerování tokenu mi API ještě zhruba hodinu vracelo jen `401 Unauthorized` a já už začínal pochybovat. Pak se to „chytlo“ a najednou jsem měl k dispozici tisíce vlastních zpráv – oficiálně, bez hesla v cizím skriptu a bez rizika banu.

*TODO (autor): doplnit, co z toho asistent dnes reálně dělá a jaká jsou omezení (např. jen čtení, bez odpovídání).*
