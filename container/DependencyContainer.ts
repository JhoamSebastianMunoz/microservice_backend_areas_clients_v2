import { IAreaRepository } from '../interfaces/IAreaRepository';
import { IClientRepository } from '../interfaces/IClientRepository';
import { IAreaService } from '../interfaces/IAreaService';
import { IClientService } from '../interfaces/IClientService';
import AreaRepository from '../repositories/AreaRepository';
import ClientRepository from '../repositories/ClientRepository';
import AreaService from '../services/AreaServices';
import ClientService from '../services/ClientServices';

class DependencyContainer {
    private static instance: DependencyContainer;
    
    private _areaRepository: IAreaRepository;
    private _clientRepository: IClientRepository;
    private _areaService: IAreaService;
    private _clientService: IClientService;

    private constructor() {
        this._areaRepository = new AreaRepository();
        this._clientRepository = new ClientRepository();
        this._areaService = new AreaService(this._areaRepository);
        this._clientService = new ClientService(this._clientRepository);
    }

    public static getInstance(): DependencyContainer {
        if (!DependencyContainer.instance) {
            DependencyContainer.instance = new DependencyContainer();
        }
        return DependencyContainer.instance;
    }

    get areaRepository(): IAreaRepository {
        return this._areaRepository;
    }

    get clientRepository(): IClientRepository {
        return this._clientRepository;
    }

    get areaService(): IAreaService {
        return this._areaService;
    }

    get clientService(): IClientService {
        return this._clientService;
    }
}

export default DependencyContainer;
