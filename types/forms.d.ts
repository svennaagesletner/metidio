type Fields = {
    type?: string
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    role?: string
    municipality?: String,
    school?: String,
    isActive?: boolean
  }
  
type FormState = {
    message: string
    errors?: Record<keyof Fields, string> | undefined
    fieldValues?: Fields | undefined
    errorMessage?: string | undefined
    successMessage?: string | undefined 
  }

  type municipalityFetched = Municipality & {
    schools: School[]
  }

  type dashboardData = {
    municipalities: municipalityFetched[]
    counts: Counts
    allSchools: School[] & {users: User[]}
  }
