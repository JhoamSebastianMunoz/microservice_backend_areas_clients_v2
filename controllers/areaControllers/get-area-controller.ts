import { Request, Response } from "express";
import GetArea from "../../Dto/GetAreaDto";
import DependencyContainer from '../../container/DependencyContainer';

let get_area = async (req: Request, res: Response) => {  
    try {
        const { id_zona_de_trabajo } = req.params;
        const areaService = DependencyContainer.getInstance().areaService;
        const result = await areaService.getArea(new GetArea (id_zona_de_trabajo))
        if(result.length === 0) {
            return res.status(404).json({message: 'Zona de trabajo no encontrada'})
        }else{
            return res.status(201).json(result);
        }
        
        } catch (error: any) {    
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
        }
    };

    export default get_area;