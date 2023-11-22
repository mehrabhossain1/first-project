import { Request, Response, response } from 'express'
import { StudentServices } from './student.service'
// import { studentValidationSchema } from './student.validation'
import { z } from 'zod'
import { studentValidationSchema } from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using zod

    // creating a schema validation using Joi
    const { student: studentData } = req.body

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    // data validation using zod

    const zodParsedData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDb(zodParsedData)

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   })
    // }

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
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

const deleteStudent = async (req: Request, res: response) => {
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
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
