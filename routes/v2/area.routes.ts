import { Router } from "express";
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';

// Validators
import registerAreaValidator from '../../middleware/areaMiddleware/registerAreaValidator';
import getAreaValidator from '../../middleware/areaMiddleware/getAreaValidator';
import updateAreaValidator from '../../middleware/areaMiddleware/updateAreaValidator';
import deleteAreaValidator from '../../middleware/areaMiddleware/deleteAreaValidator';

// Controllers
import registerAreaController from '../../controllers/areaControllers/register-area-controller';
import getAreasController from '../../controllers/areaControllers/get-areas-controller';
import getAreaController from '../../controllers/areaControllers/get-area-controller';
import updateAreaController from '../../controllers/areaControllers/update-area-controller';
import deleteAreaController from '../../controllers/areaControllers/delete-area-controller';

const router = Router();

/**
 * @route   POST /api/v2/areas
 * @desc    Create a new area
 * @access  Private (ADMINISTRADOR)
 */
router.post(
  '/',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  registerAreaValidator.validatorParams,
  registerAreaValidator.validator,
  registerAreaController
);

/**
 * @route   GET /api/v2/areas
 * @desc    Get all areas
 * @access  Private (ADMINISTRADOR, COLABORADOR)
 */
router.get(
  '/',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]),
  getAreasController
);

/**
 * @route   GET /api/v2/areas/:id
 * @desc    Get area by ID
 * @access  Private (ADMINISTRADOR, COLABORADOR)
 */
router.get(
  '/:id_zona_de_trabajo',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]),
  getAreaValidator.validatorParams,
  getAreaValidator.validator,
  getAreaController
);

/**
 * @route   PUT /api/v2/areas/:id
 * @desc    Update area by ID
 * @access  Private (ADMINISTRADOR)
 */
router.put(
  '/:id_zona_de_trabajo',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  updateAreaValidator.validatorParams,
  updateAreaValidator.validator,
  updateAreaController
);

/**
 * @route   DELETE /api/v2/areas/:id
 * @desc    Delete area by ID
 * @access  Private (ADMINISTRADOR)
 */
router.delete(
  '/:id_zona_de_trabajo',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  deleteAreaValidator.validatorParams,
  deleteAreaValidator.validator,
  deleteAreaController
);

export default router;
