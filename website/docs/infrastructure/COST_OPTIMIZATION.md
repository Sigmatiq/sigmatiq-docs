---
sidebar_position: 13
title: Cost Optimization (Overview)
description: Strategies to keep Azure costs low
keywords: [cost, optimization, azure]
---

# Cost Optimization (Overview)

Initial strategies to control costs while maintaining reliability.

## Principles

- Use scale-to-zero for beta wherever practical.
- Right-size databases and caches.
- Share registries and environments when safe.

## Examples

- Set `minReplicas: 0` for beta container apps.
- Use burstable PostgreSQL where possible.
- Apply retention policies to ACR images and logs.

More detailed guidance and calculators will be added soon.

