# Table
`import { Table } from './components/Table'`
- `columns`: TableColumn<Row>[]
- `rows`: Row[]
- `getRowId?`: function — A stable id for each row.
- `rowActions?`: TableAction<Row>[] — Icon buttons (1 to 4) that appear at the right end of a row on hover or keyboard foc…
- `onRowClick?`: function

```tsx
<Table aria-label="Inboxes" columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }]} rows={rows} getRowId={(r) => r.id} rowActions={[{ icon: 'delete', label: 'Delete' }]} />
```
