# Synkora 3D Starter

3D-tier стартовый шаблон для всех новых сайтов Synkora Web Factory.

> Forked from [`pmndrs/react-three-next`](https://github.com/pmndrs/react-three-next) — все credits авторам React Three Fiber.

## Стек

- **Next.js 14** — SSR + App Router
- **React Three Fiber** + `@react-three/drei` — JSX-обёртка над Three.js, ~30 строк на сцену
- **Tailwind CSS** — с Synkora design tokens (`#ff6a26` accent, dark mode default)
- **Lenis** — smooth scroll, де-факто стандарт award-grade сайтов
- **PWA** — out-of-box через `@ducanh2912/next-pwa`

## Synkora design tokens

В `tailwind.config.js` подключены кастомные цвета: `synkora-bg`, `synkora-accent`, `synkora-ink`, etc. Используются как `bg-synkora-bg text-synkora-ink`.

## Дев-режим

```bash
yarn install
yarn dev
# http://localhost:3000
```

## Production build

```bash
yarn build
yarn start
```

## Деплой

Cloudflare Pages: project `synkora-3d-starter` → `3d.synkora-studio.com`. CF token в `~/synkora_leadgen/.env`.

## Tiers

Используй этот стартер для:

| Tier | Что строить | Цена |
|---|---|---|
| **Tier 2** | 1 rotating 3D hero на главной | $5-9k |
| **Tier 3** | Scroll-driven 3D полностраничная сцена | $9-18k |
| **Tier 4** | Real estate showroom + Pannellum 360° | $15-35k |
| **Tier 5** | Interior configurator (drag-and-drop мебель) | $25-60k |

Подробный roadmap: `~/ai_trend_briefing/plans/synkora_3d_tier_roadmap.html`
Unit economics: `~/ai_trend_briefing/plans/synkora_3d_unit_economics.html`

## Что внутри

- `src/components/canvas/` — R3F сцены (Logo example уже есть)
- `src/components/dom/` — обычные React-компоненты, рендерятся поверх 3D
- `src/helpers/` — Three layout, tunnel-rat (для смешивания DOM и canvas)
- `app/` — Next.js App Router pages

## Кастомизация под клиента

1. `cp -r src/components/canvas/Examples src/components/canvas/<ClientName>` — копируешь шаблон сцены
2. `npx gltfjsx model.glb` — конвертируешь GLB-модель в React-компонент
3. Кладёшь модель в `public/models/`, импортируешь
4. Меняешь цвета через `synkora-*` Tailwind классы

## Roadmap

- [ ] Demo сцена: rotating diamond с glass material
- [ ] Lenis интеграция в `app/layout.jsx`
- [ ] Pannellum 360° viewer (для Tier 4)
- [ ] Tier 5 configurator base (drag-and-drop)
- [ ] CI: Lighthouse mobile ≥85 на каждый PR

## License

MIT. Original react-three-next © Renaud Rohlinger.
