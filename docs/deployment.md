# Deployment

## GitHub

1. Create a new repo: `room3` (private or public — public reads better as
   a portfolio piece, since the source code is part of the work).
2. From this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:vineet/room3.git
   git push -u origin main
   ```

## Vercel

1. Go to [vercel.com/new](https://vercel.com/new), select "Import Git Repository",
   pick `room3`.
2. Vercel auto-detects Vite. The default settings are correct:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Click Deploy.

Vercel will deploy on every push to `main` and produce a preview URL on
every PR.

## Custom subdomain

1. In Vercel, go to the project → Settings → Domains.
2. Add `room3.vineet.cc`.
3. Vercel walks you through the DNS records (a CNAME at `room3` pointing
   to `cname.vercel-dns.com.`).
4. SSL is automatic.

## On every push

Once `main` is set up, the workflow is:

```bash
# Make changes
git add .
git commit -m "..."
git push
```

Vercel deploys automatically. You'll get a notification when the deploy
is live, usually within ~30 seconds.

## Branch previews

For non-destructive iteration, work on a branch and open a PR:

```bash
git checkout -b feature/pretext-flow
# changes...
git push -u origin feature/pretext-flow
```

Vercel will create a preview deployment with its own URL. Useful for
checking the Pretext flow on a real device before merging to main.
