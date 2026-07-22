# Roadmap — Forzar WhatsApp normal (no Business)

**Fecha:** 2026-07-22 · **Estado:** hecho (2026-07-22)

## Intención

Si el vecino tiene WhatsApp y WhatsApp Business, el ícono debe abrir la app **normal** (`com.whatsapp`), no Business.

## Pasos

1. ✅ En Android: URL `intent://…;package=com.whatsapp;…` con fallback a `api.whatsapp.com`.
2. ✅ En iOS/desktop: mantener `https://api.whatsapp.com/send?phone=…&text=hola`.
3. ✅ Bump cache.
