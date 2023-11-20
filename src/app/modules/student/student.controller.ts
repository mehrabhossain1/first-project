import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import { studentValidationSchema } from './student.validation'
import { z } from 'zod'

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using zod
    const studentValidationSchema = z.object({
      id: z.string(),
      name: z.object({
        firstName: z
          .string()
          .max(20, {
            message: 'First name can not be more than 20 characters',
          }),
        middleName: z.string(),
        lastName: z
          .string()
          .max(20, { message: 'Last name can not be more than 20 characters' }),
      }),
    })

    // creating a schema validation using Joi
    const { student: studentData } = req.body

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    const result = await StudentServices.createStudentIntoDb(studentData)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      })
    }

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
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
