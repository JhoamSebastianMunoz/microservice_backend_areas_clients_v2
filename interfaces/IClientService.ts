import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';

export interface IClientService {
    register_client(client: Client): Promise<any>;
    getClients(): Promise<GetClient[]>;
    getClient(getClient: GetClient): Promise<GetClient[]>;
    deleteClient(deleteClient: DeleteClient): Promise<number>;
    updateClient(updateClient: UpdateClient): Promise<any>;
}
