ALTER TABLE "boards" RENAME TO "projects";--> statement-breakpoint
ALTER TABLE "lists" RENAME COLUMN "board_id" TO "project_id";--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "boards_workspace_id_workspaces_id_fk";
--> statement-breakpoint
ALTER TABLE "lists" DROP CONSTRAINT "lists_board_id_boards_id_fk";
--> statement-breakpoint
DROP INDEX "lists_board_position_index";--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "lists_project_position_index" ON "lists" USING btree ("project_id","position");