const databaseSchema = 'senior_care'

exports.up = pgm => {

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."users" (
			"id" VARCHAR(255) PRIMARY KEY,
			"email" VARCHAR(255) NOT NULL,
			"password" VARCHAR(255) NOT NULL,
			"date_created" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"last_modified" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"first_name" VARCHAR(128),
			"last_name" VARCHAR(128),
			"status" VARCHAR(16) NOT NULL,
			"phone_number" VARCHAR(64),
			"avatar" VARCHAR(512),
			"location" VARCHAR(255),
			"user_type" VARCHAR(16)
		)
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."family" (
			"user_id" VARCHAR(255) PRIMARY KEY,
			FOREIGN KEY (user_id) REFERENCES ${databaseSchema}.users (id)
		);
	`)

	pgm.sql(`
    CREATE TABLE "${databaseSchema}"."caregiver" (
			"user_id" VARCHAR(255) PRIMARY KEY,
			"birthdate" VARCHAR(64),
			"years_experience" INT,
			"description" TEXT,
			"gender" VARCHAR(32),
			"availability" VARCHAR(10),
			"average_rating" FLOAT(2),
			"hourly_rate" INT,
			FOREIGN KEY (user_id) REFERENCES ${databaseSchema}.users (id)
    );
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."blacklist_jwt" (
			"user_id" VARCHAR(255),
			"token" TEXT NOT NULL,
			"date_added" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			"token_issued" BIGINT NOT NULL,
			"token_expiration" BIGINT NOT NULL
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."senior" (
			"id" SERIAL PRIMARY KEY,
			"family_id" VARCHAR(255),
			"first_name" VARCHAR(128),
			"last_name" VARCHAR(128),
			"date_created" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_DATE,
			"last_modified" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"birthdate" VARCHAR(64),
			"gender" VARCHAR(32),
			"relation" VARCHAR(32),
			"language" VARCHAR(32),
			"medical_condition" TEXT,
			"bio" TEXT,
			"avatar" TEXT,
			FOREIGN KEY (family_id) REFERENCES ${databaseSchema}.family (user_id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."job_posting" (
			"id" SERIAL PRIMARY KEY,
			"family_id" VARCHAR(255),
			"date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
			"title" VARCHAR(64) NOT NULL,
			"start_date" DATE NOT NULL,
			"end_date" DATE NOT NULL,
			"address" VARCHAR(64),
			"city" VARCHAR(32),
			"province" VARCHAR(16),
			"postal_code" VARCHAR(8),
			"availability" VARCHAR(10),
			"hourly_rate" INT,
			"gender_pref" VARCHAR(16),
			"req_drivers_license" BOOLEAN,
			"cig_smoking" BOOLEAN,
			"pets" BOOLEAN,
			"cannabis" BOOLEAN,
			FOREIGN KEY (family_id) REFERENCES ${databaseSchema}.family (user_id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."caregiver_reviews" (
			"id" SERIAL PRIMARY KEY,
			"caregiver_id" VARCHAR(255),
			"family_id" VARCHAR(255),
			FOREIGN KEY (caregiver_id) REFERENCES ${databaseSchema}.caregiver (user_id),
			FOREIGN KEY (family_id) REFERENCES ${databaseSchema}.family (user_id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."services" (
			"id" SERIAL PRIMARY KEY,
			"title" VARCHAR(64) NOT NULL
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."services_job" (
			"job_id" INT NOT NULL,
			"service_id" INT NOT NULL,
			FOREIGN KEY (job_id) REFERENCES ${databaseSchema}.job_posting (id),
			FOREIGN KEY (service_id) REFERENCES ${databaseSchema}.services (id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."applicants" (
			"id" SERIAL PRIMARY KEY,
			"jobpost_id" INT NOT NULL,
			"caregiver_id" VARCHAR(255),
			"family_id" VARCHAR(255),
			"date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
			FOREIGN KEY (caregiver_id) REFERENCES ${databaseSchema}.caregiver (user_id),
			FOREIGN KEY (family_id) REFERENCES ${databaseSchema}.family (user_id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."conversations" (
			"id" SERIAL PRIMARY KEY,
			"caregiver_id" VARCHAR(255),
			"family_id" VARCHAR(255),
			FOREIGN KEY (caregiver_id) REFERENCES ${databaseSchema}.caregiver (user_id),
			FOREIGN KEY (family_id) REFERENCES ${databaseSchema}.family (user_id)
		);
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."messages" (
			"id" SERIAL PRIMARY KEY,
			"conversation_id" INT NOT NULL,
			"from_user" VARCHAR(255),
			"date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
			"content" TEXT,
			FOREIGN KEY (conversation_id) REFERENCES ${databaseSchema}.conversations (id)
		);
	`)
};