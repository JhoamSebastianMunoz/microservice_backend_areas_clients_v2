import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';

export interface IAreaRepository {
    add(area: Area): Promise<any>;
    getAll(): Promise<GetArea[]>;
    get(getArea: GetArea): Promise<GetArea[]>;
    delete(deleteArea: DeleteArea): Promise<number>;
    update(updateArea: UpdateArea): Promise<any>;
}
