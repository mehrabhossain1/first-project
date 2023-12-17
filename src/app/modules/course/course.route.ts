import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidations } from './course.validation'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(CourseValidations.crateCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/', CourseControllers.getAllCourses)

router.get('/:id', CourseControllers.getSingleCourse)

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// )

router.delete('/:id', CourseControllers.deleteCourse)

export const CourseRoutes = router
