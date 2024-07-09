
type Employee = {
    id: string
    firstName: string
    lastName: string
    fullName: string
    gender: string
    dateOfBirth: Date,
    
    position: {
        function: string
        permanent?: boolean
        startDate?: Date,
        endDate?: Date,
        percentage: number
        department: string
        leave: {
            startDate: Date,
            endDate: Date, 
            percentage: number
        }
    }
    contactTeacher: boolean
    numberOfStudents: number

    resourceAllocation: {
        contactTeacher: number,
        timeResource: number,
        lifePhase: number,
        studies: number,
        [key: string]: number,
    }

    education?: {
        norwegian?: number, 
        english?: number,
        mathematics?: number,
        science?: number, 
        physicalEducation?: number,
        artsAndCrafts?: number,
        cooking?: number,  
        religion?: number, 
        music?: number, 
        socialStudies?: number,
        spanish?: number,
        french?: number, 
        german?: number,
        specialPedagogy?: number
        norwegianSignLanguage?: number
        other?: string
        educationType?: string
        educationEndDate?: Date 
        educationValid1_4?: Boolean
        educationValid5_7?: Boolean
        educationValid8_10?: Boolean
        [key: string]: number,
    }
}

type ColumnFilter = {id: string, value: string}
