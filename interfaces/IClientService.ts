import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';
import PaginationParams from '../Dto/PaginationDto';

export interface IClientService {
    register_client(client: Client): Promise<any>;
    getClients(): Promise<GetClient[]>;
    getClientsPaginated(pagination: PaginationParams): Promise<{clients: GetClient[], total: number}>;
    getClient(getClient: GetClient): Promise<GetClient[]>;
    deleteClient(deleteClient: DeleteClient): Promise<number>;
    updateClient(updateClient: UpdateClient): Promise<any>;
}
