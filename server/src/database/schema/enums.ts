import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['Admin', 'User']);

export const memberRole = pgEnum('member_role', ['Admin', 'Owner', 'Member']);

export const projectPriority = pgEnum('project_priority', [
  'None',
  'Low',
  'Mid',
  'High',
  'Urgent',
]);
