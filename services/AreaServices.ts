import { IAreaRepository } from '../interfaces/IAreaRepository';
import Area from '../Dto/AreaDto';
import GetArea from '../Dto/GetAreaDto';
import DeleteArea from '../Dto/DeleteAreaDto';
import UpdateArea from '../Dto/UpdateAreaDto';
import PaginationParams from '../Dto/PaginationDto';
import { IAreaService } from '../interfaces/IAreaService';
import CacheService from './CacheService';

class AreaService implements IAreaService {
    
    private static readonly CACHE_KEY_ALL = 'areas:all';
    private static readonly CACHE_KEY_PREFIX = 'area:';
    private static readonly CACHE_TTL = 300000; // 5 minutos
    
    constructor(private areaRepository: IAreaRepository) {}
    
    async register_area(area: Area) {
        // Invalidar caché al crear nueva área
        CacheService.getInstance().delete(AreaService.CACHE_KEY_ALL);
        CacheService.getInstance().cleanExpired();
        
        const result = await this.areaRepository.add(area);
        return result;
    }
    
    async getAreas(){
        const cacheService = CacheService.getInstance();
        
        // Intentar obtener desde caché
        const cachedAreas = cacheService.get<GetArea[]>(AreaService.CACHE_KEY_ALL);
        if (cachedAreas) {
            return cachedAreas;
        }
        
        // Si no está en caché, obtener de BD
        const areas = await this.areaRepository.getAll();
        
        // Almacenar en caché
        cacheService.set(AreaService.CACHE_KEY_ALL, areas, AreaService.CACHE_TTL);
        
        return areas;
    }
    
    async getAreasPaginated(pagination: PaginationParams){
        // Para datos paginados, no usar caché ya que varían según paginación
        return await this.areaRepository.getAllPaginated(pagination);
    }
    
    async getArea(getArea : GetArea){
        const cacheService = CacheService.getInstance();
        const cacheKey = `${AreaService.CACHE_KEY_PREFIX}${getArea.id_zona_de_trabajo}`;
        
        // Intentar obtener desde caché
        const cachedArea = cacheService.get<GetArea[]>(cacheKey);
        if (cachedArea && cachedArea.length > 0) {
            return cachedArea;
        }
        
        // Si no está en caché, obtener de BD
        const area = await this.areaRepository.get(getArea);
        
        // Almacenar en caché si se encontró
        if (area && area.length > 0) {
            cacheService.set(cacheKey, area, AreaService.CACHE_TTL);
        }
        
        return area;
    }
    
    async deleteArea(deleteArea: DeleteArea){
        // Invalidar caché al eliminar área
        const cacheService = CacheService.getInstance();
        cacheService.delete(AreaService.CACHE_KEY_ALL);
        cacheService.delete(`${AreaService.CACHE_KEY_PREFIX}${deleteArea.id_zona_de_trabajo}`);
        
        const result = await this.areaRepository.delete(deleteArea);
        return result;
    } 
    
    async updateArea(updateArea: UpdateArea){
        // Invalidar caché al actualizar área
        const cacheService = CacheService.getInstance();
        cacheService.delete(AreaService.CACHE_KEY_ALL);
        cacheService.delete(`${AreaService.CACHE_KEY_PREFIX}${updateArea.id_zona_de_trabajo}`);
        
        const result = await this.areaRepository.update(updateArea);
        return result;
    }
    
    /**
     * Método para limpiar manualmente el caché de áreas
     */
    clearCache(): void {
        const cacheService = CacheService.getInstance();
        cacheService.clear();
    }
};

export default AreaService;