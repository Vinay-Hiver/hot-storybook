SETUP for a new Hiver prototype in this folder. Short messages. Order matters: ASK FIRST, then build.
1 `node -v` (<18 or missing: tell user to install from nodejs.org, stop)
2 folder has files other than this one/hidden: tell user, stop (never overwrite)
3 ASK NOW, before copying, installing or running anything. ONE short message, each question with its default (designer may skip any), then STOP and wait for the answers:
  a) channels? (chat, whatsapp, sms, slack, email, voice; default: all six)
  b) conversations per channel, and what about? (default: 3 each, general support topics)
  c) anything else? (a new page, a Figma link or screenshot; default: none)
  Do NOT ask about custom fields, inboxes or the Admin panel. Custom fields only if the designer mentions them (see PRODUCT-GUIDE).
4 after the answers: `npx --yes degit Vinay-Hiver/hot-storybook/starter . --force` (fail: `git clone --depth 1 https://github.com/Vinay-Hiver/hot-storybook.git _hot`, copy `_hot/starter/*` incl. hidden here, rm `_hot`)
5 `npm install --silent --no-audit --no-fund`
6 read CLAUDE.md, PRODUCT-GUIDE.md. NOTHING else yet (COMPONENTS.md only when a request needs a new page/component; ICONS.md only to pick an icon)
7 build from the answers: edit src/pages/HomePage/homeData.ts, AND src/pages/SharedInboxes/data.ts so Admin lists exactly the same channels/inboxes (ALWAYS, no question; PRODUCT-GUIDE has the steps). Check with `npx tsc --noEmit`.
8 `npm run dev` in background (not before this step: the first thing the designer sees is the finished prototype). Tell the user the address in 2 lines: what it has, and that Home and Admin (Main nav) are ready. Do not poll or tail logs. Offer nothing else.
