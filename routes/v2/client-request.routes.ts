import { Router } from "express";
import verifyToken from '../../middleware/verifyToken';
import checkRoleAndPermission from '../../middleware/checkRoleAndPermission';

// Validators
import clientCreationRequestMiddleware from '../../middleware/clientCreationRequestMiddleware/clientCreationRequestMiddleware';

// Controllers
import requestCreateClient from '../../controllers/clientCreationRequestController/requestCreateClient';
import getPendingRequests from '../../controllers/clientCreationRequestController/getPendingRequests';
import acceptOrRejectController from '../../controllers/clientCreationRequestController/acceptOrRejectController';

const router = Router();

/**
 * @route   POST /api/v2/client-requests
 * @desc    Create a client request (pending approval)
 * @access  Private (COLABORADOR)
 */
router.post(
  '/',
  verifyToken,
  checkRoleAndPermission(["COLABORADOR"]),
  clientCreationRequestMiddleware.validatorParams,
  clientCreationRequestMiddleware.validator,
  requestCreateClient
);

/**
 * @route   GET /api/v2/client-requests
 * @desc    Get all client requests (with optional status filter)
 * @access  Private (ADMINISTRADOR, COLABORADOR)
 */
router.get(
  '/',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR", "COLABORADOR"]),
  getPendingRequests
);

/**
 * @route   PATCH /api/v2/client-requests/:id/approve
 * @desc    Approve a client request
 * @access  Private (ADMINISTRADOR)
 */
router.patch(
  '/:id_client/approve',
  verifyToken,
  checkRoleAndPermission(["ADMINISTRADOR"]),
  acceptOrRejectController
);

export default router;
