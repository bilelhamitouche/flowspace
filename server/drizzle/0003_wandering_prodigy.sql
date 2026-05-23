ALTER TABLE "workspace_members" RENAME COLUMN "member_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_member_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;