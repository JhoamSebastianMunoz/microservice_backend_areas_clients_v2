import db from '../config/config-db';
import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';
import PaginationParams from '../Dto/PaginationDto';
import { IClientRepository } from '../interfaces/IClientRepository';

class ClientRepository implements IClientRepository {
    async add(client: Client){
        const sql = 'INSERT INTO clientes (cedula, email, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [client.cedula, client.email, client.nombre_completo_cliente, client.direccion, client.telefono, client.rut_nit, client.razon_social, client.estado, client.id_zona_de_trabajo];        
        return db.execute(sql, values);
    }
    async getAll(): Promise<GetClient[]> {
        const sql = "SELECT id_cliente, cedula, email, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo FROM clientes WHERE estado IN('Activo', 'Inactivo')";
        const [rows] = await db.execute(sql); 
        return rows as GetClient[];
    }
    async getAllPaginated(pagination: PaginationParams): Promise<{clients: GetClient[], total: number}> {
        // Primero obtener el total de registros
        const countSql = "SELECT COUNT(*) as total FROM clientes WHERE estado IN('Activo', 'Inactivo')";
        const [countResult] = await db.execute(countSql) as any;
        const total = countResult[0].total;

        // Luego obtener los registros paginados
        const dataSql = "SELECT id_cliente, cedula, email, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo FROM clientes WHERE estado IN('Activo', 'Inactivo') LIMIT ?, ?";
        const [rows] = await db.execute(dataSql, [pagination.offset, pagination.limit]);
        
        return {
            clients: rows as GetClient[],
            total: total
        };
    }
    async get(getClient : GetClient){
        const sql = 'SELECT id_cliente, cedula, email, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo FROM clientes WHERE id_cliente= ?';
        const values = [getClient.id_cliente]; 
        const [rows] = await db.execute(sql, values);      
        return rows as GetClient[];
    }
    async delete(deleteClient : DeleteClient){
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [deleteClient.id_cliente];
        const [result]: any = await db.execute(sql, values);
    return result.affectedRows; // Devuelve el número de filas afectadas.
    }
    async update(updateClient : UpdateClient){
        const sql = 'UPDATE clientes SET cedula = ?, email = ?, nombre_completo_cliente = ?, direccion = ?, telefono =  ?, rut_nit = ?, razon_social = ?, estado = ?, id_zona_de_trabajo = ? WHERE id_cliente = ?';
        const values = [ updateClient.cedula, updateClient.email, updateClient.nombre_completo_cliente, updateClient.direccion, updateClient.telefono, updateClient.rut_nit, updateClient.razon_social, updateClient.estado, updateClient.id_zona_de_trabajo , updateClient.id_cliente]
        const result: any = await db.execute(sql,values);
        return result;
    }
};

export default ClientRepository;