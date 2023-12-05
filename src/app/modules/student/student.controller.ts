/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import { studentValidationSchema } from './student.validation'

// import { studentValidationSchema } from './student.validation'

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb()

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    })
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
