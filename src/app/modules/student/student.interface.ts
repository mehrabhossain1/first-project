import { Schema, model, connect } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TStudent = {
  id: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'AB+' | 'O+'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
}
