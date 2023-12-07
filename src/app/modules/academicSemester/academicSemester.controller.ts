import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
})

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters retrieved successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
}
