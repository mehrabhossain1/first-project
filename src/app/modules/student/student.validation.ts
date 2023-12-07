import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name should be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[a-zA-Z]+$/, {
    message: 'Last name is not valid',
  }),
})

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
})

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'O+']).optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
}
