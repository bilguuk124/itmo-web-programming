CREATE SEQUENCE IF NOT EXISTS public.jpa_sequence
INCREMENT 1
START 1
MINVALUE 1
MAXVALUE 9223372036854775807
CACHE 1;

CREATE TABLE IF NOT EXISTS public.entry(
    id integer DEFAULT nextval('jpa_sequence'::regclass),
    xvalue double precision,
    yvalue double precision,
    rvalue double precision,
    hitresult character varying(25) COLLATE pg_catalog."default"
)
TABLESPACE pg_default