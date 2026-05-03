import { Router } from "express";
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';

// Validators
import registerClientValidator from '../../middleware/clientMiddleware/registerClientValidator';
import getClientValidator from '../../middleware/clientMiddleware/getClientValidator';
import updateClientValidator from '../../middleware/clientMiddleware/updateClientValidator';
import deleteClientValidator from '../../middleware/clientMiddleware/deleteClientValidator';

// Controllers
import registerClientController from '../../controllers/clientControllers/register-client-controller';
import getClientsController from '../../controllers/clientControllers/get-clients-controller';
import getClientController from '../../controllers/clientControllers/get-client-controller';
import updateClientController from '../../controllers/clientControllers/update-client-controller';
import deleteClientController from '../../controllers/clientControllers/delete-client-controller';

const router = Router();

/**
 * @route   POST /api/v2/clients
 * @desc    Create a new client
 * @access  Private (ADMINISTRADOR)
 */
router.post(
  '/',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  registerClientValidator.validatorParams,
  registerClientValidator.validator,
  registerClientController
);

/**
 * @route   GET /api/v2/clients
 * @desc    Get all clients
 * @access  Private (ADMINISTRADOR, COLABORADOR)
 */
router.get(
  '/',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]),
  getClientsController
);

/**
 * @route   GET /api/v2/clients/:id
 * @desc    Get client by ID
 * @access  Private (ADMINISTRADOR, COLABORADOR)
 */
router.get(
  '/:id_cliente',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]),
  getClientValidator.validatorParams,
  getClientValidator.validator,
  getClientController
);

/**
 * @route   PUT /api/v2/clients/:id
 * @desc    Update client by ID
 * @access  Private (ADMINISTRADOR)
 */
router.put(
  '/:id_cliente',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  updateClientValidator.validatorParams,
  updateClientValidator.validator,
  updateClientController
);

/**
 * @route   DELETE /api/v2/clients/:id
 * @desc    Delete client by ID
 * @access  Private (ADMINISTRADOR)
 */
router.delete(
  '/:id_cliente',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  deleteClientValidator.validatorParams,
  deleteClientValidator.validator,
  deleteClientController
);

export default router;
