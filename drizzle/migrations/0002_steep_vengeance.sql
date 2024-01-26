CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text,
	`name` text NOT NULL,
	`size` integer,
	`leader_id` text
);
