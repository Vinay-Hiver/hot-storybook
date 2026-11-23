SETUP (run now, no questions, short messages). Folder = new Hiver prototype.
1 `node -v` (<18 or missing: tell user to install from nodejs.org, stop)
2 folder has files other than this one/hidden: tell user, stop (never overwrite)
3 `npx --yes degit Vinay-Hiver/hot-storybook/starter . --force` (fail: `git clone --depth 1 https://github.com/Vinay-Hiver/hot-storybook.git _hot`, copy `_hot/starter/*` incl. hidden here, rm `_hot`)
4 `npm install --silent --no-audit --no-fund`
5 `npm run dev` in background; tell user the address; do not poll or tail logs
6 read CLAUDE.md, PRODUCT-GUIDE.md. NOTHING else yet (COMPONENTS.md only when a request needs a new page/component; ICONS.md only to pick an icon)
7 tell user it runs, then ask ALL of these in ONE short message, each with its default (designer may skip any):
  a) channels? (chat, whatsapp, sms, slack, email, voice; default: all six)
  b) conversations per channel, and what about? (default: 3 each, general support topics)
  c) anything else? (a new page, a Figma link or screenshot; default: none)
  Do NOT ask about custom fields, inboxes or the Admin panel. Custom fields only if the designer mentions them (see PRODUCT-GUIDE).
8 from the answers: edit src/pages/HomePage/homeData.ts, AND src/pages/SharedInboxes/data.ts so Admin lists exactly the same channels/inboxes (ALWAYS, no question; PRODUCT-GUIDE has the steps). Check with `npx tsc --noEmit`, then tell the user in 2 lines what the prototype now has and that Home and Admin (Main nav) are ready. Offer nothing else.
