import { Router } from "express";

// Controllers for microservices
import get_dataArea from '../../controllers/microserviceUserController/get_dataArea';
import get_clientArea from '../../controllers/microserviceUserController/get_clientArea';
import getDataClientController from '../../controllers/microservicePresaleControllers/getDataClientController';

// Validators
import getDataClientValidator from '../../middleware/microservicePresaleMiddleware/getDataCliente';

const router = Router();

/**
 * @route   GET /api/v2/internal/areas/:id
 * @desc    Get area data for microservices
 * @access  Internal (Microservices)
 */
router.get('/areas/:id_area', get_dataArea);

/**
 * @route   GET /api/v2/internal/areas/:id/clients
 * @desc    Get clients by area for microservices
 * @access  Internal (Microservices)
 */
router.get('/areas/:id_area/clients', get_clientArea);

/**
 * @route   GET /api/v2/internal/clients/:id
 * @desc    Get client data for microservices (preventa)
 * @access  Internal (Microservices)
 */
router.get(
  '/clients/:id_client',
  getDataClientValidator.validatorParams,
  getDataClientValidator.validator,
  getDataClientController
);

export default router;
