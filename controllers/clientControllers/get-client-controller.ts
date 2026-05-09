import { Request, Response } from "express";
import GetClient from "../../Dto/GetClientDto";
import DependencyContainer from '../../container/DependencyContainer';

let get_client = async (req: Request, res: Response) => {  
    try {
        const { id_cliente } = req.params;
        const clientService = DependencyContainer.getInstance().clientService;
        const result = await clientService.getClient(new GetClient (parseInt(id_cliente)))
        if(result.length === 0) {
            return res.status(404).json({message: 'Cliente no encontrado'})
        }else{
            return res.status(200).json(result);
        }
        
        } catch (error: any) {    
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
        }
    };

    export default get_client;