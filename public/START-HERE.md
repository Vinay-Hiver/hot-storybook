SETUP for a new Hiver prototype in this folder. Short messages. Order matters: ASK FIRST, then build.
1 `node -v` (<18 or missing: tell user to install from nodejs.org, stop)
2 folder has files other than this one/hidden: tell user, stop (never overwrite)
3 ASK NOW, before copying, installing or running anything. Designer may skip any (use the default). Exact wording, no "(Recommended)" tags, no notes in brackets in questions.
  3a Channels = plain TYPED answer, no options. Send ONE short chat message: "Which channels do you want in your prototype? Type them, for example: Email, Chat, Slack, etc, or say All channels" Then STOP and wait. Accept any spelling/case ("website chat" = chat); "All channels" or nothing = all six (chat, whatsapp, sms, slack, email, voice).
  3b After the reply, ask ONE more question, with your structured question UI if you have one (Claude Code: AskUserQuestion), else a short plain message:
    Q "Anything else you wanna include?" options: "Nothing else" | "A new page from a Figma link" | "A new page from a screenshot" (if link/screenshot: ask for it after)
  Dummy conversations are NOT asked: add 2-3 in every inbox, general support topics, unless the designer already said a number or topics.
  Do NOT ask about conversations, custom fields, inboxes or the Admin panel. Custom fields only if the designer mentions them (see PRODUCT-GUIDE).
4 after the answers: `npx --yes degit Vinay-Hiver/hot-storybook/starter . --force` (fail: `git clone --depth 1 https://github.com/Vinay-Hiver/hot-storybook.git _hot`, copy `_hot/starter/*` incl. hidden here, rm `_hot`)
5 `npm install --silent --no-audit --no-fund`
6 read CLAUDE.md, PRODUCT-GUIDE.md. NOTHING else yet (COMPONENTS.md only when a request needs a new page/component; ICONS.md only to pick an icon)
7 build from the answers: edit src/pages/HomePage/homeData.ts, AND src/pages/SharedInboxes/data.ts so Admin lists exactly the same channels/inboxes (ALWAYS, no question; PRODUCT-GUIDE has the steps). Check with `npx tsc --noEmit`.
8 `npm run dev` in background (not before this step: the first thing the designer sees is the finished prototype). Tell the user the address in 2 lines: what it has, and that Home and Admin (Main nav) are ready. Do not poll or tail logs. Offer nothing else.
