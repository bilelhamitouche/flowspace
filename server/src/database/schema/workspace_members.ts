import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces';
import { users } from './users';
import { timestamp } from 'drizzle-orm/pg-core';
import { memberRole } from './enums';
import { primaryKey } from 'drizzle-orm/pg-core';

export const workspaceMembers = pgTable(
  'workspace_members',
  {
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    role: memberRole('member_role').notNull().default('Member'),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.workspaceId] })],
);
