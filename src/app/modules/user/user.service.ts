/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TFaculty } from '../faculty/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../faculty/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user obj
  const userData: Partial<TUser> = {}

  // if password is not given, use default pass
  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  // comment
  // commented for github to look good
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // set generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id // reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  userData.role = 'faculty'

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.id = await generateFacultyId()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  userData.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.id = await generateAdminId()

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
}
