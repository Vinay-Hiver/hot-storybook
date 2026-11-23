# Page recipes (only for NEW layouts; Home and Admin already exist as pages, see PRODUCT-GUIDE.md)

Home layout:
```tsx
<PageLayout variant="home"
  nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value="conversations" user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
  sidebar={<ConversationsSidebar sections={sampleSections(true, ['chat'])} value="chat-unassigned" />}
  rightPanel={<RightPanel aria-label="Details" tabs={[{ id: 'inbox', label: 'Shared Inbox', icon: 'sminbox' }]}><RightPanelTop title="Inbox name"><AssigneeField /><StatusField /></RightPanelTop></RightPanel>}>
  {content}
</PageLayout>
```
imports: PageLayout, MainNav, ConversationsSidebar, RightPanel, RightPanelTop, AssigneeField, StatusField from ./patterns/<Name>; navSample* from ./patterns/MainNav/sampleData; sampleSections from ./patterns/ConversationsSidebar/sampleData.

Admin layout:
```tsx
<PageLayout variant="admin" nav={<MainNav ... value="admin" />} sidebar={<AdminSidebar sections={adminSampleSections} value="shared-inbox" />} subNav={<SubNav title="…" items={items} value={id} onChange={setId} />}>{content}</PageLayout>
```
sample* data only fills navigation with example entries; replace with real items.
