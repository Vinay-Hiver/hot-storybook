SETUP for a new Hiver prototype in this folder. Short messages. Order matters: ASK FIRST, then build.
1 `node -v` (<18 or missing: tell user to install from nodejs.org, stop)
2 folder has files other than this one/hidden: tell user, stop (never overwrite)
3 ASK NOW, before copying, installing or running anything, then STOP and wait for the answers. Designer may skip any (use the default).
  Use your structured question UI if you have one (Claude Code: ONE AskUserQuestion call with these 3 questions; max 4 options per question). Else ask in ONE short plain message. Use these exact question texts and option labels, one label per option, no descriptions that combine things, NO "(Recommended)" tags, NO notes in brackets in the questions:
  Q1 "Which channels do you want in your prototype?" single choice: option "All six channels" (description: Chat, WhatsApp, SMS, Slack, Email and Voice) | option "Only some" (description: Type them under Other, for example Email, Chat, Slack). The channels are typed in the free-text Other field (the tool cannot set its placeholder, so the hint lives in the option description). Typed names: accept any spelling/case, "website chat" = chat. Nothing answered = all six.
  Q2 "How many conversations per channel?" single choice: 3 | 5 (Other = free text, may include topics; default 3, general support topics)
  Q3 "Anything else you wanna include?" single choice: Nothing else | A new page from a Figma link | A new page from a screenshot (default: nothing else; if a link/screenshot is chosen, ask for it after)
  Do NOT ask about custom fields, inboxes or the Admin panel. Custom fields only if the designer mentions them (see PRODUCT-GUIDE).
4 after the answers: `npx --yes degit Vinay-Hiver/hot-storybook/starter . --force` (fail: `git clone --depth 1 https://github.com/Vinay-Hiver/hot-storybook.git _hot`, copy `_hot/starter/*` incl. hidden here, rm `_hot`)
5 `npm install --silent --no-audit --no-fund`
6 read CLAUDE.md, PRODUCT-GUIDE.md. NOTHING else yet (COMPONENTS.md only when a request needs a new page/component; ICONS.md only to pick an icon)
7 build from the answers: edit src/pages/HomePage/homeData.ts, AND src/pages/SharedInboxes/data.ts so Admin lists exactly the same channels/inboxes (ALWAYS, no question; PRODUCT-GUIDE has the steps). Check with `npx tsc --noEmit`.
8 `npm run dev` in background (not before this step: the first thing the designer sees is the finished prototype). Tell the user the address in 2 lines: what it has, and that Home and Admin (Main nav) are ready. Do not poll or tail logs. Offer nothing else.
