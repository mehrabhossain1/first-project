import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import Joi from 'joi'

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi
    const JoivalidationSchema = Joi.object({
      id: Joi.string(),
      name: {
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().max(20).required(),
      },
      gender: Joi.string().required().valid(['male', 'female', 'other']),
    })

    const { student: studentData } = req.body
    const result = await StudentServices.createStudentIntoDb(studentData)

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Something went wrong',
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
  } catch (error) {
    console.log(error)
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
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
