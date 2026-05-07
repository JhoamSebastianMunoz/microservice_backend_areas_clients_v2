import { IClientRepository } from '../interfaces/IClientRepository';
import Client from '../Dto/ClientDto';
import GetClient from '../Dto/GetClientDto';
import DeleteClient from '../Dto/DeleteClientDto';
import UpdateClient from '../Dto/UpdateClientDto';
import { IClientService } from '../interfaces/IClientService';

class ClientService implements IClientService {
    
    constructor(private clientRepository: IClientRepository) {}
    
    async register_client(client: Client) {
        return await this.clientRepository.add(client);
    }
    async getClients(){
        return await this.clientRepository.getAll();
    }
    async getClient(getClient : GetClient){
        return await this.clientRepository.get(getClient);
    }
    async deleteClient(deleteClient: DeleteClient){
        return await this.clientRepository.delete(deleteClient);
    } 
    async updateClient(updateClient: UpdateClient){
        return await this.clientRepository.update(updateClient);
    }
};

export default ClientService;