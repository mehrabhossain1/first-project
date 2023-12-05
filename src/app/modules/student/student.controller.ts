import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDb(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDb(studentId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
