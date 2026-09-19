CREATE TABLE `auth_nonces` (
	`address` text PRIMARY KEY NOT NULL,
	`nonce` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text NOT NULL,
	`started_at` integer NOT NULL,
	`finished_at` integer,
	`duration_ms` integer,
	`distance` integer,
	`gems` integer,
	`rekt` integer,
	`score` integer,
	`valid` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_runs_valid_score` ON `runs` (`valid`,`score`);--> statement-breakpoint
CREATE INDEX `idx_runs_address` ON `runs` (`address`);