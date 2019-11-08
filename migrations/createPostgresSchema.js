const databaseSchema = 'senior_care'

exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "${databaseSchema}"."users" (
      "id" SERIAL PRIMARY KEY,
      "email" VARCHAR(255) NOT NULL,
      "password" VARCHAR(255) NOT NULL,
			"user_date_created" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_DATE,
			"last_modified" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"first_name" VARCHAR(128),
			"last_name" VARCHAR(128)
    );
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."blacklist_jwt" (
			"user_id" INT NOT NULL,
			"token" TEXT NOT NULL,
			"date_added" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			"token_issued" BIGINT NOT NULL,
			"token_expiration" BIGINT NOT NULL
		);
	`)
};