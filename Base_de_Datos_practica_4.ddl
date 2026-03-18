-- Generado por Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   en:        2026-03-12 10:11:39 CST
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE CATEDRATICO 
    ( 
     CURSO_id_curso INTEGER  NOT NULL , 
     id_catedratico VARCHAR2 (13 CHAR)  NOT NULL , 
     nombre         VARCHAR2 (250 CHAR)  NOT NULL , 
     edad           INTEGER  NOT NULL 
    ) 
;

ALTER TABLE CATEDRATICO 
    ADD CONSTRAINT CATEDRATICO_PK PRIMARY KEY ( CURSO_id_curso, id_catedratico ) ;

CREATE TABLE COMENTARIO 
    ( 
     id_comentario              INTEGER  NOT NULL , 
     mensaje                    VARCHAR2 (1000)  NOT NULL , 
     USUARIO_id_usuario         VARCHAR2 (13 CHAR)  NOT NULL , 
     CATEDRATICO_id_curso       INTEGER  NOT NULL , 
     CATEDRATICO_id_catedratico VARCHAR2 (13 CHAR)  NOT NULL , 
     PUBLICACION_id_publicacion INTEGER  NOT NULL 
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_PK PRIMARY KEY ( id_comentario, CATEDRATICO_id_curso, CATEDRATICO_id_catedratico, PUBLICACION_id_publicacion ) ;

CREATE TABLE CURSO 
    ( 
     id_curso INTEGER  NOT NULL , 
     nombre   VARCHAR2 (250 CHAR)  NOT NULL , 
     creditos INTEGER  NOT NULL 
    ) 
;

ALTER TABLE CURSO 
    ADD CONSTRAINT CURSO_PK PRIMARY KEY ( id_curso ) ;

CREATE TABLE CURSO_APROBADO 
    ( 
     id_curso_aprobado INTEGER  NOT NULL , 
     nombre            VARCHAR2 (250)  NOT NULL , 
     creditos          INTEGER  NOT NULL 
    ) 
;

ALTER TABLE CURSO_APROBADO 
    ADD CONSTRAINT CURSO_APROBADO_PK PRIMARY KEY ( id_curso_aprobado ) ;

CREATE TABLE PUBLICACION 
    ( 
     id_publicacion     INTEGER  NOT NULL , 
     titulo             VARCHAR2 (100 CHAR)  NOT NULL , 
     fecha              DATE  NOT NULL , 
     mensaje            VARCHAR2 (1000 CHAR) , 
     votos              INTEGER , 
     USUARIO_id_usuario VARCHAR2 (13 CHAR)  NOT NULL 
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_PK PRIMARY KEY ( id_publicacion ) ;

CREATE TABLE Relacion_usuario_curso 
    ( 
     USUARIO_id_usuario VARCHAR2 (13 CHAR)  NOT NULL , 
     CURSO_id_curso     INTEGER  NOT NULL 
    ) 
;

ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Relacion_usuario_curso_PK PRIMARY KEY ( USUARIO_id_usuario, CURSO_id_curso ) ;

--  ERROR: Table name length exceeds maximum allowed length(30) 
CREATE TABLE Relacion_usuario_curso_aprobado 
    ( 
     USUARIO_id_usuario               VARCHAR2 (13 CHAR)  NOT NULL , 
--  ERROR: Column name length exceeds maximum allowed length(30) 
     CURSO_APROBADO_id_curso_aprobado INTEGER  NOT NULL 
    ) 
;

--  ERROR: PK name length exceeds maximum allowed length(30) 
ALTER TABLE Relacion_usuario_curso_aprobado 
    ADD CONSTRAINT Relacion_usuario_curso_aprobado_PK PRIMARY KEY ( USUARIO_id_usuario, CURSO_APROBADO_id_curso_aprobado ) ;

CREATE TABLE USUARIO 
    ( 
     id_usuario      VARCHAR2 (13 CHAR)  NOT NULL , 
     nombre          VARCHAR2 (250)  NOT NULL , 
     edad            INTEGER  NOT NULL , 
     contraseña      VARCHAR2 (100 CHAR)  NOT NULL , 
     años_de_carrera INTEGER  NOT NULL 
    ) 
;

ALTER TABLE USUARIO 
    ADD CONSTRAINT USUARIO_PK PRIMARY KEY ( id_usuario ) ;

ALTER TABLE CATEDRATICO 
    ADD CONSTRAINT CATEDRATICO_CURSO_FK FOREIGN KEY 
    ( 
     CURSO_id_curso
    ) 
    REFERENCES CURSO 
    ( 
     id_curso
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_CATEDRATICO_FK FOREIGN KEY 
    ( 
     CATEDRATICO_id_curso,
     CATEDRATICO_id_catedratico
    ) 
    REFERENCES CATEDRATICO 
    ( 
     CURSO_id_curso,
     id_catedratico
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_PUBLICACION_FK FOREIGN KEY 
    ( 
     PUBLICACION_id_publicacion
    ) 
    REFERENCES PUBLICACION 
    ( 
     id_publicacion
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE Relacion_usuario_curso_aprobado 
    ADD CONSTRAINT Relacion_usuario_curso_aprobado_CURSO_APROBADO_FK FOREIGN KEY 
    ( 
     CURSO_APROBADO_id_curso_aprobado
    ) 
    REFERENCES CURSO_APROBADO 
    ( 
     id_curso_aprobado
    ) 
;

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE Relacion_usuario_curso_aprobado 
    ADD CONSTRAINT Relacion_usuario_curso_aprobado_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Relacion_usuario_curso_CURSO_FK FOREIGN KEY 
    ( 
     CURSO_id_curso
    ) 
    REFERENCES CURSO 
    ( 
     id_curso
    ) 
;

--  ERROR: FK name length exceeds maximum allowed length(30) 
ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Relacion_usuario_curso_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             8
-- CREATE INDEX                             0
-- ALTER TABLE                             17
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   7
-- WARNINGS                                 0
