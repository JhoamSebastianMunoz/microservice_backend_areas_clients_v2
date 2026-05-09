interface CacheItem<T> {
    data: T;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
}

class CacheService {
    private static instance: CacheService;
    private cache: Map<string, CacheItem<any>> = new Map();
    
    private constructor() {}
    
    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }
    
    /**
     * Almacena datos en caché con un TTL específico
     */
    public set<T>(key: string, data: T, ttl: number = 300000): void { // Default 5 minutos
        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            ttl
        };
        this.cache.set(key, item);
    }
    
    /**
     * Obtiene datos del caché si no han expirado
     */
    public get<T>(key: string): T | null {
        const item = this.cache.get(key);
        
        if (!item) {
            return null;
        }
        
        // Verificar si el item ha expirado
        if (Date.now() - item.timestamp > item.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }
    
    /**
     * Elimina un item específico del caché
     */
    public delete(key: string): boolean {
        return this.cache.delete(key);
    }
    
    /**
     * Limpia todo el caché
     */
    public clear(): void {
        this.cache.clear();
    }
    
    /**
     * Elimina items expirados del caché
     */
    public cleanExpired(): void {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                this.cache.delete(key);
            }
        }
    }
    
    /**
     * Obtiene estadísticas del caché
     */
    public getStats(): { size: number; keys: string[] } {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

export default CacheService;
