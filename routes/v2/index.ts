import { Router } from "express";

// Import route modules
import areaRoutes from './area.routes';
import clientRoutes from './client.routes';
import clientRequestRoutes from './client-request.routes';
import internalRoutes from './internal.routes';

const router = Router();

/**
 * API Version 2 Routes
 * Base path: /api/v2
 */

// Area management routes
router.use('/areas', areaRoutes);

// Client management routes
router.use('/clients', clientRoutes);

// Client request management routes
router.use('/client-requests', clientRequestRoutes);

// Internal microservice routes
router.use('/internal', internalRoutes);

export default router;
