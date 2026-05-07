import { Request, Response } from "express";
import Client from '../../Dto/ClientDto';
import DependencyContainer from '../../container/DependencyContainer';

let register_client = async (req: Request, res: Response) => {  
  try {
    const {
      cedula,
      email,
      nombre_completo_cliente,
      direccion,
      telefono,
      rut_nit,
      razon_social,
      estado,
      id_zona_de_trabajo
    } = req.body;
    
    const clientService = DependencyContainer.getInstance().clientService;
    const result = await clientService.register_client(new Client(cedula, email, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo))
    
    return res.status(201).json(
      { status: 'Cliente registrado con éxito'}
    );
  } catch (error: any) {    
    if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ errorInfo: error.sqlMessage });
    } else {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
};


export default register_client;