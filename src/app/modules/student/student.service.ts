// import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate('academicDepartment')

  return result
}

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id })

  const result = await Student.aggregate([{ $match: { id: id } }])

  return result
}

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
}
