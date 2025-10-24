---
sidebar_position: 10
title: Database Schema (Overview)
description: High-level overview of databases used by Sigmatiq
keywords: [database, schema, postgres]
---

# Database Schema (Overview)

This page outlines the key databases and schemas referenced by the platform. A full ERD and table-level documentation will be added soon.

## Databases

- `sigmatiq_auth` — Authentication and accounts
- `sigmatiq_cards` — Card catalog and usage analytics (cd.*)
- `sigmatiq_backfill` — Market data (sb.*)
- `sigmatiq_native` — Native trading API data
- Others — As listed in the Azure Deployment Plan

## Key Schemas

- `cd` — Cards (catalog, usage logging)
- `sb` — Source/backfill market data tables

## Coming Soon

- Table reference with columns and indexes
- Migration history and ownership

