# HOT Design System Storybook

## Copy and paste this prompt into your AI tool

Open an **empty folder** in Claude Code (or any AI agent), then paste:

```text
Fetch https://raw.githubusercontent.com/Vinay-Hiver/hot-storybook/main/public/START-HERE.md and follow it for this folder.
```

It sets up a working Hiver prototype and gives you a local address to open. Then tell the AI what you want, for example: "Build me the boilerplate of Hiver with only SMS and WhatsApp, 2-3 dummy convos in each, and 3 custom fields: MRR (number), Plan (text), Date (date)."

## Sample prompts to get started

After the setup, tell the AI what you want. Pick one and change the details:

**Two channels with custom fields**
```text
Build me the boilerplate of Hiver with only SMS and WhatsApp, 2-3 dummy convos in each, and 3 custom fields: MRR (number), Plan (text), Date (date).
```

**An email support team**
```text
Build the Hiver home page with only the Email channel, 5 conversations about refunds and invoices (two of them unread, one with an overdue first response time), and custom fields Order ID (text) and Refund amount (number).
```

**Chat and Slack for onboarding**
```text
I want only Website Chat and Slack, 3 conversations each about customers stuck during onboarding. Add High and Billing tags on a few cards, and a Renewal date custom field.
```

**Everything, to demo the product**
```text
Show all six channels (Chat, WhatsApp, SMS, Slack, Email, Voice) with 2 conversations each, and custom fields Plan (text), Seats (number) and Renewal date (date). Keep the Admin panel's shared inboxes in step with it.
```

**A new page from a design**
```text
Build a new page from this Figma link (or screenshot): <paste it here>. Use only the Hiver components and tokens, and tell me if one is missing.
```

## What is this

Hiver's HOT design system as working React components, built from Figma. Prototypes built from it use the real components, colours and icons, so they look like the product. Browse it: https://hot-storybook.vercel.app

## What's inside

| Section in Storybook | What you find |
|---|---|
| Foundations | Colours, typography, spacing, radius, icons |
| Components | Button, Input, Dropdown, Modal, Tabs, Table and more, with props and Docs |
| Patterns | Main nav, Sub-nav, Admin sidebar, Conversations sidebar, Conversation list, Right panel |
| Conversation Views | Chat, WhatsApp, SMS, Slack and Email conversations |
| Pages | Home page and Admin panel |
