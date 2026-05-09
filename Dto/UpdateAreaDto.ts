class UpdateArea {
    
    public readonly id_zona_de_trabajo: number;
    public readonly nombre_zona_trabajo: string;
    public readonly descripcion: string;

    constructor(
        id_zona_de_trabajo:number, 
        nombre_zona_trabajo: string,
        descripcion: string,
    ) {
        this.id_zona_de_trabajo = id_zona_de_trabajo;
        this.nombre_zona_trabajo = nombre_zona_trabajo;
        this.descripcion = descripcion;
    }
};

export default UpdateArea;