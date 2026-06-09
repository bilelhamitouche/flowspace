import { timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { text } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { projects } from './projects';
import { index } from 'drizzle-orm/pg-core';

export const lists = pgTable(
  'lists',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    position: integer('position').notNull(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index('lists_project_position_index').on(table.projectId, table.position),
  ],
);
