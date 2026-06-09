import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { userRole } from './enums';
import { workspaces } from './workspaces';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRole('role').notNull().default('User'),
  avatarUrl: text('avatar_url'),
  refreshToken: text('refresh_token'),
  activeWorkspaceId: uuid('active_workspace_id').references(
    () => workspaces.id,
    { onDelete: 'set null' },
  ),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdateFn(() => new Date()),
});
