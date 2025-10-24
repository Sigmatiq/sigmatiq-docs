---
sidebar_position: 12
title: Monitoring Setup (Overview)
description: Observability and alerting for Sigmatiq APIs
keywords: [monitoring, observability, alerts]
---

# Monitoring Setup (Overview)

This page will document health checks, metrics, dashboards, and alerting.

## Health Endpoints

- `/healthz` — Liveness
- `/readyz` — Readiness

## Metrics (Planned)

- Request latency (p50/p95/p99)
- Error rate by endpoint
- Cache hit/miss rates
- DB pool usage

## Alerts (Planned)

- API downtime > 2 minutes
- Error rate > 5%
- Redis memory > 90%

