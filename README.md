# welcome cv : devSkate Portfolio

React + Three.js welcome CV experience focused on a playful 3D hero scene, readable frontend architecture, and a switchable strict/minimal presentation mode.

## Story

A skate and graffiti styled welcome CV concept with an interactive 3D hero scene and a strict mode for a calmer minimal presentation.

## Experience

- Hover / mouse move controls a soft camera parallax on the 3D scene.
- Dragging the skateboard lets the user rotate and manipulate the model in space.
- Skill tags float around the skateboard scene.
- The hero layout adapts from a two-column desktop composition to a stacked mobile layout.
- Header navigation scrolls to Main, About me, and Work projects sections.
- Projects can be changed by button click or swipe gesture.
- Project cards use animated transitions, progress controls, and production-focused case details.
- Strict mode switches the site into a clean minimal style.
- Strict mode hides the 3D scene and shows a vector poster instead.
- Strict mode preference is saved in localStorage.

## Strict Mode

Strict mode is a presentation toggle for a calmer, document-like version of the portfolio.

When enabled:

- The 3D HeroScene is hidden.
- The graffiti and sticker styling is replaced with a minimal light UI.
- The Skate Dev Card sticker is hidden.
- A vector poster with a Harry Potter-inspired motivational quote is displayed.
- The selected mode persists after page reload.

## Tech Stack

- React.
- TypeScript.
- Vite.
- Three.js.
- React Three Fiber.
- Drei for environment helpers.
- React Three Cannon for lightweight physics.
- Framer Motion for page, card, and swipe animations.
- Tailwind CSS for styling.
- Lucide React for UI icons.
- localStorage for persisted strict mode preference.

## Project Structure

```text
src/
  components/
    AboutProjectsSlider.tsx
    FooterBar.tsx
    HeaderBar.tsx
    HeroProfile.tsx
    HeroScene.tsx
    ImportedSkateboardModel.tsx
    SkateboardModel.tsx
    SkillTag3D.tsx
    StrictHeroVector.tsx
  context/
    ThemeContext.tsx
  data/
    contacts.ts
    profile.ts
    projects.ts
    skills.ts
  scene/
    CameraController.tsx
    Lights.tsx
    PhysicsWorld.tsx
    StreetBackground.tsx
  ui/
    Button.tsx
    SectionTitle.tsx
  App.tsx
  main.tsx
  styles.css
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Note: this Vite version expects a modern Node.js version. Use Node 20.19+ or 22.12+.

## Assets

The skateboard is loaded from OBJ / MTL assets under `public/models/skateboard`. The scene is rendered through React Three Fiber and enhanced with Drei environment lighting.

## Portfolio Data

Profile, contacts, skills, and project cards are data-driven:

- `src/data/profile.ts`
- `src/data/contacts.ts`
- `src/data/skills.ts`
- `src/data/projects.ts`

Updating these files changes the visible portfolio content without touching the scene or layout components.
