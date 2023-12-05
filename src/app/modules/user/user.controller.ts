import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(password, studentData)

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: result,
  })
}

export const UserControllers = {
  createStudent,
}
