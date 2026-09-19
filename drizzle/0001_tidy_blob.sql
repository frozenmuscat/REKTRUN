CREATE TABLE `profiles` (
	`address` text PRIMARY KEY NOT NULL,
	`shards` integer DEFAULT 0 NOT NULL,
	`runner` text DEFAULT 'byte' NOT NULL,
	`gear` text DEFAULT 'blade' NOT NULL,
	`unlocked_runners` text DEFAULT '["byte"]' NOT NULL,
	`unlocked_gear` text DEFAULT '["blade"]' NOT NULL
);
