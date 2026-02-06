import { z } from 'zod'

export const signupSchema = z.object({
  // Company info
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  subdomain: z
    .string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(32, 'Subdomain must be less than 32 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
    .regex(/^[a-z]/, 'Subdomain must start with a letter')
    .regex(/[a-z0-9]$/, 'Subdomain must end with a letter or number'),
  
  // Admin user info
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export type SignupFormData = z.infer<typeof signupSchema>
