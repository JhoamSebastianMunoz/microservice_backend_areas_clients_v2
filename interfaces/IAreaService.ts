import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';
import PaginationParams from '../Dto/PaginationDto';

export interface IAreaService {
    register_area(area: Area): Promise<any>;
    getAreas(): Promise<GetArea[]>;
    getAreasPaginated(pagination: PaginationParams): Promise<{areas: GetArea[], total: number}>;
    getArea(getArea: GetArea): Promise<GetArea[]>;
    deleteArea(deleteArea: DeleteArea): Promise<number>;
    updateArea(updateArea: UpdateArea): Promise<any>;
}
