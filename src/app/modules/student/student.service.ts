import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDb = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student) // built in static method

  const student = new StudentModel(studentData)
  const result = await student.save() // built in instance method

  return result
}

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find()

  return result
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
}
