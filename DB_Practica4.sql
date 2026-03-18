CREATE DATABASE Informe_4;
USE Informe_4;
CREATE TABLE CATEDRATICO 
    ( 
     CURSO_id_curso INT  NOT NULL , 
     id_catedratico VARCHAR (13)  NOT NULL , 
     nombre         VARCHAR (250)  NOT NULL , 
     edad           INT  NOT NULL 
    ) 
;

ALTER TABLE CATEDRATICO 
    ADD CONSTRAINT CATEDRATICO_PK PRIMARY KEY ( CURSO_id_curso, id_catedratico ) ;

CREATE TABLE COMENTARIO 
    ( 
     id_comentario              INT  NOT NULL , 
     mensaje                    VARCHAR (1000)  NOT NULL , 
     USUARIO_id_usuario         VARCHAR (13)  NOT NULL , 
     CATEDRATICO_CURSO_id_curso INT  NOT NULL , 
     CATEDRATICO_id_catedratico VARCHAR (13)  NOT NULL , 
     PUBLICACION_id_publicacion INT  NOT NULL 
    ) 
;

ALTER TABLE COMENTARIO 
    ADD CONSTRAINT COMENTARIO_PK PRIMARY KEY ( id_comentario, CATEDRATICO_CURSO_id_curso, CATEDRATICO_id_catedratico, PUBLICACION_id_publicacion ) ;

CREATE TABLE CURSO 
    ( 
     id_curso INT  NOT NULL , 
     nombre   VARCHAR (250)  NOT NULL , 
     creditos INT  NOT NULL 
    ) 
;

ALTER TABLE CURSO 
    ADD CONSTRAINT CURSO_PK PRIMARY KEY ( id_curso ) ;

CREATE TABLE CURSO_APR 
    ( 
     id_curso_apr INT  NOT NULL , 
     nombre       VARCHAR (250)  NOT NULL , 
     creditos     INT  NOT NULL 
    ) 
;

ALTER TABLE CURSO_APR 
    ADD CONSTRAINT CURSO_APROBADO_PK PRIMARY KEY ( id_curso_apr ) ;

CREATE TABLE PUBLICACION 
    ( 
     id_publicacion     INT  NOT NULL , 
     titulo             VARCHAR (100)  NOT NULL , 
     fecha              DATE  NOT NULL , 
     mensaje            VARCHAR (1000) , 
     votos              INT , 
     USUARIO_id_usuario VARCHAR (13)  NOT NULL 
    ) 
;

ALTER TABLE PUBLICACION 
    ADD CONSTRAINT PUBLICACION_PK PRIMARY KEY ( id_publicacion ) ;

CREATE TABLE Rel_usuario_c_apr 
    ( 
     USUARIO_id_usuario     VARCHAR (13)  NOT NULL , 
     CURSO_APR_id_curso_apr INT  NOT NULL 
    ) 
;

ALTER TABLE Rel_usuario_c_apr 
    ADD CONSTRAINT Rel_usuario_c_apr_PK PRIMARY KEY ( USUARIO_id_usuario, CURSO_APR_id_curso_apr ) ;

CREATE TABLE Relacion_usuario_curso 
    ( 
     USUARIO_id_usuario VARCHAR (13)  NOT NULL , 
     CURSO_id_curso     INT  NOT NULL 
    ) 
;

ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Relacion_usuario_curso_PK PRIMARY KEY ( USUARIO_id_usuario, CURSO_id_curso ) ;

CREATE TABLE USUARIO 
    ( 
     id_usuario VARCHAR (13)  NOT NULL , 
     nombre     VARCHAR (250)  NOT NULL , 
     edad       INT  NOT NULL , 
     contrasena VARCHAR (100)  NOT NULL , 
     tiempo     INT  NOT NULL 
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
     CATEDRATICO_CURSO_id_curso,
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

ALTER TABLE Rel_usuario_c_apr 
    ADD CONSTRAINT Rel_usuario_c_apr_C_APR_FK FOREIGN KEY 
    ( 
     CURSO_APR_id_curso_apr
    ) 
    REFERENCES CURSO_APR 
    ( 
     id_curso_apr
    ) 
;

ALTER TABLE Rel_usuario_c_apr 
    ADD CONSTRAINT Rel_usuario_c_apr_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;

ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Rel_usuario_curso_CURSO_FK FOREIGN KEY 
    ( 
     CURSO_id_curso
    ) 
    REFERENCES CURSO 
    ( 
     id_curso
    ) 
;
ALTER TABLE Relacion_usuario_curso 
    ADD CONSTRAINT Rel_usuario_curso_USUARIO_FK FOREIGN KEY 
    ( 
     USUARIO_id_usuario
    ) 
    REFERENCES USUARIO 
    ( 
     id_usuario
    ) 
;