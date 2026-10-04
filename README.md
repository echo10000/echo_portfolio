# Jericho Blando — Portfolio

A responsive developer portfolio built with Next.js and designed for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1 — GitHub (recommended)

1. Create a new GitHub repository.
2. Push this project to the repository.
3. Go to Vercel and choose **Add New → Project**.
4. Import the GitHub repository.
5. Vercel will detect Next.js automatically.
6. Click **Deploy**.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel
```

Run `vercel --prod` when you are ready to publish the production version.

## Before publishing

- Replace `https://example.vercel.app` in `app/layout.tsx` with your real production URL after your first deployment.
- Add your LinkedIn URL when your profile is ready.
- Add screenshots and links for private projects if you decide to publish them.
- Add a resume PDF to `/public` if you want a download button.

## Main content to edit

Most portfolio content is stored directly in `app/page.tsx` so it is easy to update.
