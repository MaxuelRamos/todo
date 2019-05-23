-- SEQUENCE: ponto.companies_id_seq

-- DROP SEQUENCE ponto.companies_id_seq;

CREATE SEQUENCE ponto.companies_id_seq;

ALTER SEQUENCE ponto.companies_id_seq
    OWNER TO ponto;


-- Table: ponto.companies

-- DROP TABLE ponto.companies;

CREATE TABLE ponto.companies
(
    id integer NOT NULL DEFAULT nextval('ponto.companies_id_seq'::regclass),
    cnpj character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "userCount" integer NOT NULL DEFAULT 0,
    expiration date,
    enabled boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT companies_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE ponto.companies
    OWNER to ponto;



-- SEQUENCE: ponto.users_id_seq

-- DROP SEQUENCE ponto.users_id_seq;

CREATE SEQUENCE ponto.users_id_seq;

ALTER SEQUENCE ponto.users_id_seq
    OWNER TO ponto;


-- Table: ponto.users

-- DROP TABLE ponto.users;

CREATE TABLE ponto.users
(
    id integer NOT NULL DEFAULT nextval('ponto.users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    role character varying(255) COLLATE pg_catalog."default" DEFAULT 'USER'::character varying,
    enabled boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "companyId" integer,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId")
        REFERENCES ponto.companies (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE ponto.users
    OWNER to ponto;

-- SEQUENCE: ponto.points_id_seq

-- DROP SEQUENCE ponto.points_id_seq;

CREATE SEQUENCE ponto.points_id_seq;

ALTER SEQUENCE ponto.points_id_seq
    OWNER TO ponto;

    -- Table: ponto.points

-- DROP TABLE ponto.points;

CREATE TABLE ponto.points
(
    id integer NOT NULL DEFAULT nextval('ponto.points_id_seq'::regclass),
    "timestamp" timestamp with time zone,
    lat character varying(255) COLLATE pg_catalog."default",
    "long" character varying(255) COLLATE pg_catalog."default",
    "imgPath" character varying(255) COLLATE pg_catalog."default",
    enabled boolean NOT NULL DEFAULT true,
    comment character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    CONSTRAINT points_pkey PRIMARY KEY (id),
    CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES ponto.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE ponto.points
    OWNER to ponto;


INSERT INTO ponto.users(
	email, password, role, "createdAt", "updatedAt")
	VALUES ('suporte@ponto.com', '$2b$10$dRPZywHBatSJ30RCSYa6AOT76fUy/UscZGRMhFYgy5T54Ld4thNRG', 'ADMIN', now(), now());