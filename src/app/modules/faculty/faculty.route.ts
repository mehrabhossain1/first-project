import express from 'express'
import { FacultyControllers } from './faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'

const router = express.Router()

router.get('/', FacultyControllers.getAllFaculties)

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

export const FacultyRoutes = router
