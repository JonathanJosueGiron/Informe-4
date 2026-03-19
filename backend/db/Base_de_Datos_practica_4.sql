CREATE DATABASE IF NOT EXISTS dbpractica4;
USE dbpractica4;

CREATE TABLE CATEDRATICO 
    ( 
     id_catedratico INTEGER  NOT NULL , 
     nombre         VARCHAR (250)  NOT NULL , 
     apellido       VARCHAR (250)  NOT NULL , 
     correo         VARCHAR (250)  NOT NULL 
    ) 
;

ALTER TABLE CATEDRATICO 
    ADD CONSTRAINT CATEDRATICO_PK PRIMARY KEY ( id_catedratico ) ;

CREATE TABLE COMENTARIO 
    ( 
     id_comentario              INTEGER  NOT NULL , 
     mensaje                    VARCHAR (1000)  NOT NULL , 
     fecha                      DATE  NOT NULL , 
     PUBLICACION_id_publicacion INTEGER , 
     USUARIO_id_usuario         INTEGER 
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_PK PRIMARY KEY ( id_comentario ) ;

CREATE TABLE CURSO 
    ( 
     id_curso INTEGER  NOT NULL , 
     nombre   VARCHAR (250 CHAR)  NOT NULL , 
     creditos INTEGER  NOT NULL , 
     area     VARCHAR (250)  NOT NULL 
    ) 
;

ALTER TABLE CURSO 
    ADD CONSTRAINT CURSO_PK PRIMARY KEY ( id_curso ) ;

CREATE TABLE CURSO_APR 
    ( 
     id_curso_apr       INTEGER  NOT NULL , 
     fecha_apr          DATE  NOT NULL , 
     USUARIO_id_usuario INTEGER , 
     CURSO_id_curso     INTEGER  NOT NULL 
    ) 
;

ALTER TABLE CURSO_APR 
    ADD CONSTRAINT CURSO_APR_PK PRIMARY KEY ( id_curso_apr ) ;

CREATE TABLE PUBLICACION 
    ( 
     id_publicacion             INTEGER  NOT NULL , 
     mensaje                    VARCHAR (1000)  NOT NULL , 
     fecha                      DATE  NOT NULL , 
     USUARIO_id_usuario         INTEGER , 
     CATEDRATICO_id_catedratico INTEGER , 
     CURSO_id_curso             INTEGER 
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_PK PRIMARY KEY ( id_publicacion ) ;

CREATE TABLE USUARIO 
    ( 
     id_usuario INTEGER  NOT NULL , 
     registro   INTEGER  NOT NULL , 
     nombre     VARCHAR (250)  NOT NULL , 
     apellido   VARCHAR (250)  NOT NULL , 
     correo     VARCHAR (250)  NOT NULL , 
     password   VARCHAR (250)  NOT NULL 
    ) 
;

ALTER TABLE USUARIO 
    ADD CONSTRAINT USUARIO_PK PRIMARY KEY ( id_usuario ) ;

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

ALTER TABLE CURSO_APR 
    ADD CONSTRAINT CURSO_APR_CURSO_FK FOREIGN KEY 
    ( 
     CURSO_id_curso
    ) 
    REFERENCES CURSO 
    ( 
     id_curso
    ) 
;

ALTER TABLE CURSO_APR 
    ADD CONSTRAINT CURSO_APR_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_CATEDRATICO_FK FOREIGN KEY 
    ( 
     CATEDRATICO_id_catedratico
    ) 
    REFERENCES CATEDRATICO 
    ( 
     id_catedratico
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_CURSO_FK FOREIGN KEY 
    ( 
     CURSO_id_curso
    ) 
    REFERENCES CURSO 
    ( 
     id_curso
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