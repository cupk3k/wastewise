# Changing the link and the QR code

For anyone on the team. The live link is now <https://wastewise-desa-mentari.vercel.app>, and the poster QR code in `docs/qr/` points to it.

## Can the link be shorter, or lose "vercel"?

- **Free:** anything ending in **`.vercel.app`**. Only the part in front can change, e.g. `wastewise-dm.vercel.app`, if nobody else has taken it. (`wastewise.vercel.app` is already taken.)
- **Not free:** a link without "vercel", like `wastewise.app` or `wastewisedm.com`. That is a domain name you have to buy (roughly RM 50–100 a year), which breaks the plan's RM 0 software and hosting budget.

## 1. Change the link (Vercel account owner only)

The free Vercel plan has one owner and no team members, so only the person who owns the Vercel project can do this.

1. Open <https://vercel.com>, sign in, open the project **wastewise-desa-mentari**.
2. **Settings → Domains → Add**. Type the new name, e.g. `wastewise-dm.vercel.app`, and add it. If Vercel says it is taken, try another name.
3. Open the new link on your phone to check it works.
4. **Keep the old link** in the list (don't remove it). Anyone who already has the old link or an old QR print can still open the app.
5. Tell the person who updates the QR code (step 2) the new link.

## 2. Make a new QR code (anyone with the repo)

1. Get the code: `git clone https://github.com/cupk3k/wastewise.git`, then `cd wastewise` and `npm install` (needs Node.js 20 or newer).
2. Open `scripts/qr.mjs` and change the line `const URL_ = '...'` to the new link.
3. Run `npm run qr`. It replaces `docs/qr/wastewise-qr.png` and `docs/qr/wastewise-qr.svg`.
4. Scan the new PNG with an iPhone and an Android phone: both must open the app.
5. Change the link in `README.md`, `docs/prototype-overview.md` and `docs/demo-day-checklist.md` too.
6. Send the change: commit and push to `main` (you need to be added as a collaborator first, see below), or send the files to Jing Liang.
7. Reprint the poster with the new QR code. An old print keeps working only if the old link was kept in step 1.4.

## Letting a teammate push changes

The repository owner adds them on GitHub: **github.com/cupk3k/wastewise → Settings → Collaborators → Add people**, with the teammate's GitHub username. They accept the email invite. After that, anything they push to `main` goes live on Vercel within about a minute.

## Things that don't need the link changed

- **"Add to Home Screen"** uses the same link: the home screen icon opens it. People who added the app to their home screen before a link change keep the old link, so keep the old domain (step 1.4).
- Text, schedule, drop-off points and translations: edit `src/data/` and push. The link and QR code stay the same.
