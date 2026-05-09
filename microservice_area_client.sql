-- ---------------Microservice areas/clients ------------------------------------------
create database microservice_area_client;
use microservice_area_client;

drop table if exists zonas_de_trabajo;
drop table if exists clientes;
drop table if exists usuario_zona;

create table zonas_de_trabajo(
id_zona_de_trabajo int auto_increment primary key,
nombre_zona_trabajo varchar(45),
descripcion varchar(255)
);

create table clientes(
id_cliente int auto_increment primary key,
cedula varchar(15) not null unique,
email varchar(100) null,
nombre_completo_cliente varchar(200) not null,
direccion varchar(255) not null, 
telefono varchar(15) not null,
rut_nit varchar(30) null,
razon_social varchar(120) null,
fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE),
estado enum('Activo', 'Inactivo', 'Pendiente') not null default 'Activo',
id_zona_de_trabajo int,
foreign key (id_zona_de_trabajo) references zonas_de_trabajo(id_zona_de_trabajo)
on delete set null on update cascade
);

CREATE TABLE usuario_zona (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_zona_de_trabajo INT NOT NULL,
    FOREIGN KEY (id_zona_de_trabajo) REFERENCES zonas_de_trabajo(id_zona_de_trabajo) ON DELETE CASCADE,
    UNIQUE (id_usuario, id_zona_de_trabajo) -- Evitar asignaciones duplicadas
);

-- Consultas de prueba (comentadas para producción)
-- select * from zonas_de_trabajo;
-- select * from clientes;
-- select * from usuario_zona;
-- join clientes using(id_zona_de_trabajo);
