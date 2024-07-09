import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function findSchoolAndMunicipality(userId: string | undefined, data: dashboardData): { school: string; municipality: string } {
  if (!userId) return { school: "", municipality: "" };
  const school = data.allSchools.find(school => school.users.some((user: any) => user.id === userId));
  if (school) {
      const municipality = data.municipalities.find(m => m.id === school.municipalityId);
      if (municipality) {
          return {
              school: school.name,
              municipality: municipality.name
          };
      }
  }
  return {
    school: "",
    municipality: ""
};
}
