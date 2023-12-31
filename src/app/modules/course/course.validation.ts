import { z } from 'zod'

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const crateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

const updateCourseValidationSchema = crateCourseValidationSchema.partial()

export const CourseValidations = {
  crateCourseValidationSchema,
  updateCourseValidationSchema,
}
