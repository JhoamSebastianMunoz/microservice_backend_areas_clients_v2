import {Request, Response} from 'express';
import UpdateArea from '../../Dto/UpdateAreaDto';
import DependencyContainer from '../../container/DependencyContainer';

let update_area = async(req:Request, res:Response)=>{
    try {
        const{ id_zona_de_trabajo } =req.params;
        const {
            nombre_zona_trabajo,
            descripcion,
            } = req.body;
        
        const areaService = DependencyContainer.getInstance().areaService;
        const result = await areaService.updateArea(new UpdateArea(id_zona_de_trabajo, nombre_zona_trabajo, descripcion));
            if(!result || result.affectedRows === 0){
                return res.status(404).json({ error: "Zona de trabajo no encontrado." });
            }
            return res.status(200).json(
                {status:'ok, Zona de trabajo actualizado con éxito'}
            ); 
            
        }catch(error:any){
            if(error && error.code == "ER_DUP_ENTRY"){
                return res.status(500).json({errorInfo: error.sqlMessage})
            }else{
                return res.status(500).json({error: "Internal Server Error", details: error.message })
            }
        }
};

export default update_area;