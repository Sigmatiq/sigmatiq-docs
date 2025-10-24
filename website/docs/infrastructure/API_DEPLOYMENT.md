---
sidebar_position: 11
title: API Deployment Guide
description: How to build and deploy Sigmatiq APIs
keywords: [deployment, container apps, azure]
---

# API Deployment Guide

This document covers building Docker images and deploying them to Azure Container Apps.

## Build and Push

1. Login to Azure Container Registry (ACR)
2. Build image: `docker build -t acrtradingshared.azurecr.io/sigmatiq-card-api:beta .`
3. Push image: `docker push acrtradingshared.azurecr.io/sigmatiq-card-api:beta`

## Deploy/Update Container App

- Use Bicep/ARM templates or Azure CLI to create/update container apps.
- Configure environment variables, secrets, scaling, and ingress.

## Post-Deploy

- Verify `/healthz`, `/readyz`, and `/docs` endpoints.
- Monitor logs and scaling behavior.

More detailed, per-API steps will be added soon.

