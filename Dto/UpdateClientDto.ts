class UpdateClient {
    
    public readonly id_cliente: string;
    public readonly cedula: string;
    public readonly email: string;
    public readonly nombre_completo_cliente: string;
    public readonly direccion: string;
    public readonly telefono: string;
    public readonly rut_nit: string;
    public readonly razon_social: string;
    public readonly estado: string;
    public readonly id_zona_de_trabajo: string;

    constructor(
        id_cliente:string, 
        cedula: string, 
        email: string,
        nombre_completo_cliente: string,
        direccion: string, 
        telefono: string,
        rut_nit: string, 
        razon_social: string,
        estado: string, 
        id_zona_de_trabajo: string,
    ) {
        this.id_cliente = id_cliente;
        this.cedula = cedula;
        this.email = email;
        this.nombre_completo_cliente = nombre_completo_cliente;
        this.direccion = direccion;
        this.telefono = telefono;
        this.rut_nit = rut_nit;
        this.razon_social = razon_social;
        this.estado = estado;
        this.id_zona_de_trabajo = id_zona_de_trabajo;
    }
};

export default UpdateClient;