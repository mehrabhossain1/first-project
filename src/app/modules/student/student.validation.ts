import Joi from 'joi'

const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.trim': 'First name cannot have leading or trailing whitespaces',
      'string.max': 'Name cannot be more than 20 characters',
      'string.pattern.base':
        'First name must start with an uppercase letter followed by lowercase letters only',
    }),
  middleName: Joi.string(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.base':
        'Last name must contain only alphabetical characters',
    }),
})

// Joi schema for guardian
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': "Father's name must be a string",
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': "Father's occupation must be a string",
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': "Father's contact number must be a string",
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.base': "Mother's name must be a string",
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': "Mother's occupation must be a string",
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': "Mother's contact number must be a string",
    'string.empty': "Mother's contact number is required",
  }),
})

// Joi schema for local guardian
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': "Local guardian's name must be a string",
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    'string.base': "Local guardian's occupation must be a string",
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'string.base': "Local guardian's contact number must be a string",
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    'string.base': "Local guardian's address must be a string",
    'string.empty': "Local guardian's address is required",
  }),
})

// Joi schema for student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required',
  }),
  name: studentNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'any.only': 'Invalid gender value',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string().valid('A+', 'A-', 'AB+', 'O+').messages({
    'any.only': 'Invalid blood group value',
  }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})

export { studentValidationSchema }
