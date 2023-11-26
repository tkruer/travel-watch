CREATE TABLE `FlightPrices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer,
	`dateString` text,
	`flightNumber` text,
	`price` text
);
--> statement-breakpoint
CREATE TABLE `HotelPrices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer,
	`dateString` text,
	`locationAddress` text,
	`price` text
);
