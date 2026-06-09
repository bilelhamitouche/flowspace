import { text, timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
});
