import { Request, Response } from "express";
import Area from '../../Dto/AreaDto';
import DependencyContainer from '../../container/DependencyContainer';

let register_area = async (req: Request, res: Response) => {  
  try {
    const {
      nombre_zona_trabajo,
      descripcion,
    } = req.body;
    
    const areaService = DependencyContainer.getInstance().areaService;
    const result = await areaService.register_area(new Area(nombre_zona_trabajo, descripcion))
    
    return res.status(201).json(
      { status: 'Zona registrada con éxito'}
    );
  } catch (error: any) {    
    if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ errorInfo: error.sqlMessage });
    } else {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
};

export default register_area;