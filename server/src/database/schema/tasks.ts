import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';
import { index } from 'drizzle-orm/pg-core';
import { lists } from './lists';

export const tasks = pgTable(
  'tasks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    position: integer('position').notNull(),
    dueDate: timestamp('due_date', { withTimezone: true }),
    listId: uuid('list_id')
      .notNull()
      .references(() => lists.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => users.id),
    assignedTo: uuid('assigned_to')
      .notNull()
      .references(() => users.id),
  },
  (table) => [
    index('tasks_list_position_idx').on(table.listId, table.position),
  ],
);
