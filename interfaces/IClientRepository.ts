import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';

export interface IClientRepository {
    add(client: Client): Promise<any>;
    getAll(): Promise<GetClient[]>;
    get(getClient: GetClient): Promise<GetClient[]>;
    delete(deleteClient: DeleteClient): Promise<number>;
    update(updateClient: UpdateClient): Promise<any>;
}
