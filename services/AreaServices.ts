import { IAreaRepository } from '../interfaces/IAreaRepository';
import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';
import { IAreaService } from '../interfaces/IAreaService';

class AreaService implements IAreaService {
    
    constructor(private areaRepository: IAreaRepository) {}
    
    async register_area(area: Area) {
        return await this.areaRepository.add(area);
    }
    async getAreas(){
        return await this.areaRepository.getAll();
    }
    async getArea(getArea : GetArea){
        return await this.areaRepository.get(getArea);
    }
    async deleteArea(deleteArea: DeleteArea){
        return await this.areaRepository.delete(deleteArea);
    } 
    async updateArea(updateArea: UpdateArea){
        return await this.areaRepository.update(updateArea);
        }
};

export default AreaService;