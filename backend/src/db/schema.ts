import { pgTable, integer, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const museums = pgTable("Museums", {
	id: integer().generatedByDefaultAsIdentity({ name: "Museums_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	country: text("Country"),
	city: text("City"),
	name: text("Name"),
	rating: integer("Rating").default(0),
	pict: text("Pict"),
});
