class Area {
    
    public readonly nombre_zona_trabajo: string;
    public readonly descripcion: string;
    
    constructor(
        nombre_zona_trabajo: string, 
        descripcion: string,
    ) {
        this.nombre_zona_trabajo = nombre_zona_trabajo;
        this.descripcion = descripcion;
    }
};

export default Area;