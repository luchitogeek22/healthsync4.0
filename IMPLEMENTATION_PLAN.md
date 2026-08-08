# HealthSync 4.0 — Implementation plan

## Auditoría (2026-08-08)

El repositorio actual es una SPA Vite + React + TypeScript con Tailwind compilado y componentes Radix/shadcn. No es Next.js y no dispone todavía de Supabase, migraciones, RLS, autenticación persistente, rutas reales, telemedicina ni scripts de lint. Las pantallas de paciente, médico, IA y video usan datos simulados.

Esto fija la secuencia: primero asegurar identidad, autorización y modelo de datos; después conectar cada pantalla a datos autorizados. No se debe tratar la UI de demostración existente como funcionalidad clínica terminada.

## Fase 1 — Auth, roles, Supabase y RLS

Estado: **implementada, pendiente de aplicar migración y configurar proyecto Supabase**.

- Cliente Supabase con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Inicio de sesión, registro y cierre de sesión con Supabase Auth.
- Perfiles con roles `PATIENT`, `DOCTOR` y `ADMIN`.
- Registro público crea únicamente perfiles `PATIENT`; el rol no se asigna desde el navegador.
- RLS de perfiles y relaciones médico-paciente; funciones de ayuda para autorización futura.
- Plantilla de entorno y base de TypeScript/lint.

Antes de desplegar: crear el proyecto Supabase, aplicar la migración en `supabase/migrations/`, configurar Auth (confirmación de correo y URLs de redirección) y cargar las variables indicadas en `.env`/Netlify. Nunca usar `service_role` en el navegador.

## Fase 2 — Dominios y paneles por rol

- Tablas de pacientes, profesionales y datos demográficos con RLS.
- Dashboard de paciente, médico y administración respaldados por consultas autorizadas.
- Relaciones médico-paciente administradas por flujo auditado.

## Fase 3 — Citas, seguimientos y signos vitales

- Citas, solicitudes, estados y seguimiento.
- Signos vitales y síntomas con historial longitudinal.
- Consentimientos versionados y trazabilidad.

## Fase 4 — Motor MVP de priorización y alertas

- `AIModelProvider` y `RulesBasedModelProvider`, nunca un modelo clínico fingido.
- Features documentadas y evaluación inmutable en `ai_assessments`.
- Edge Function `ai-risk-assessment`, alertas y aviso de apoyo a decisión clínica.

## Fase 5 — Telemedicina

- `teleconsultations` vinculadas a citas confirmadas.
- Edge Functions de Daily para sala/token, con verificación de JWT, rol, relación y cita.
- No grabar por defecto; consentimiento específico si se incorpora grabación.

## Fase 6 — Realtime y dashboard IA

- Alertas RLS mediante Realtime y pacientes prioritarios.
- Vistas longitudinales, tendencias y modo demo con datos claramente ficticios.

## Fase 7 — PWA, observabilidad y despliegue

- PWA y caché segura.
- `system_events`, `ai_usage`, `video_usage`; límites de coste.
- pgvector para contenido autorizado, separado del motor de riesgo.
- Despliegue Netlify, pruebas de RLS/Edge Functions y revisión de privacidad.

## Validación

Al terminar cada fase ejecutar `npm run build` y `npm run lint`, resolver los fallos antes de continuar, y añadir pruebas de integración de acceso para cada política RLS y Edge Function crítica.
