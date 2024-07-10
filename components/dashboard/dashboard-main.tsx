"use client"

import React, {MutableRefObject, useEffect, useRef, useState } from "react";
import Card from "@/components/dashboard/card/card"
import { getDashboardData } from "@/lib/actions/getDashboardData"
import { useSession } from "next-auth/react";
import ButtonSlider from "@/components/ui/buttonSlider";
import Loading from "@/app/portal/dashboard/loading";
import AutoCompleteNextUi from "../ui/autoComplpeteNextUi";
import { useQuery } from "@tanstack/react-query";
import { School, Municipality, User } from "@prisma/client";



  type Counts = {
    municipalities: number;
    schools: number;
    users: number;
    [municipalityName: string]: any

  };

export default function DashboardMain({dashboardData}: {dashboardData: dashboardData}) {

  //React query
  const {data, error, isLoading} = useQuery<dashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => await getDashboardData(),
    initialData: dashboardData
  })


  const [schools, setSchools] = useState<School[]>([])
  const [municipalities, setMunicipalities] = useState<municipalityFetched[]>([])
  const [counts, setCounts] = useState<Counts>() 
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("")
  const selectMunicipalityRef= useRef<MutableRefObject<HTMLSelectElement>>(null)

  const {data: session, update} = useSession()

  //Set the selected school and municipality from the session
  useEffect(() => {
    if (!session) return
    console.log(session)
    setSelectedSchool(session.user.school)
    setSelectedMunicipality(session.user.municipality)
  }, [session])
 

  useEffect(() => {
    if(!session) return
    setSelectedMunicipality(session?.user?.municipality)
    setStates()
  }, []) 

  const setStates = async() => {
    if (!session || !data) return
    const {municipalities}: {municipalities: municipalityFetched[], counts: Counts, allSchools: School[] & {users: User[]}} = data
    const currentMunicipality = municipalities.find((e) => e.name === session.user.municipality)

    if(session.user.selectionFilter) {
        setSchools(data.allSchools)
    } else {
       currentMunicipality && setSchools(currentMunicipality.schools)
    }

    setCounts(data.counts)
    setMunicipalities(data.municipalities)
  }

const handleSelectFilterChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            if (!data) return
            setSchools(data.allSchools)
        } else {
            const currentMunicipality = municipalities.find((municipality: any) => municipality.name == selectedMunicipality) as any
            const isSchoolInMunicipality = currentMunicipality?.schools.find((school: any) => school.name == selectedSchool)
            setSchools(currentMunicipality.schools)
            //Update selected School Refs
            isSchoolInMunicipality 
            ? setSelectedSchool(isSchoolInMunicipality.name) 
            : setSelectedSchool(currentMunicipality.schools[0].name)
        }
    await update({selectionFilter: e.target.checked})

    }

const handleMunicipalityChange = async (value: any) => {
  if (!value || !session) return
  const currentMunicipality = municipalities.find((municipality: Municipality) => municipality.name == value) as municipalityFetched
  const isSchoolInMunicipality = currentMunicipality?.schools.find((school: School) => school.name == selectedSchool)
  
  //Update selected School Refs
  isSchoolInMunicipality 
    ? setSelectedSchool(isSchoolInMunicipality.name) 
    : setSelectedSchool(currentMunicipality.schools[0].name)
  //Common session update params
  const updatedSession = {
    municipality: currentMunicipality.name, 
    municipalityId: currentMunicipality.id,
    school: currentMunicipality.schools[0].name
  }
  if (session.user.selectionFilter) {
    if (!data) return
    setSchools(data.allSchools)
  } else {
    setSchools(currentMunicipality.schools)
  }

  if (!isSchoolInMunicipality) {
      await update({
          ...updatedSession
      }) 
  } else {
     await update({
          ...updatedSession,
          school: session.user.school
      }) 
  } 
  setSelectedMunicipality(value)
}

const handleSchoolChange =  async (value: any) => {
    if (!value) return
    const municipality = municipalities.find((municipality: municipalityFetched) => {
        for (const school of municipality.schools) {
            if (school.name.trim() === value.trim()) {
                return municipality.name
            } 
        }
    })
    if (!municipality) return
    setSelectedMunicipality(municipality.name)
    setSelectedSchool(value)
    await update({school: value})
}

if (isLoading) {
    return ( <Loading /> )
}

console.log(selectedSchool)

return (
    <>
    {session && session.user.accessLevel >= 5 && (
      <div>
      <div className="flex ml-auto w-[140px] pr-2">
        <ButtonSlider 
        onChange={handleSelectFilterChange}
        isSelected={session.user?.selectionFilter}
        />
       </div>
       <div className="flex p-2 gap-2 justify-between">
        <div className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 w-full p-2 rounded-sm flex">

            <AutoCompleteNextUi
                label={"Velg skole"}
                defaultItems={schools}
                defaultSelectedKey={selectedSchool}
                selectedKey={selectedSchool}
                onSelectionChange={handleSchoolChange}
            />
          
        </div>

        {session.user.accessLevel >= 6 && (
            <div className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 w-full p-2 rounded-sm flex">
                    <AutoCompleteNextUi
                        label={"Velg kommune"}
                        defaultItems={municipalities}
                        defaultSelectedKey={selectedMunicipality}
                        selectedKey={selectedMunicipality}
                        onSelectionChange={handleMunicipalityChange}           />
            </div>
        )}
        </div>
             


     </div>
    )}
        <div className="flex gap-2 justify-between p-2">
        <Card
          title="Brukere - skole"
          number={counts ? counts[selectedMunicipality][selectedSchool.trim()]?.users : "0"}
          link={"/portal/dashboard/users"}
        /> 
             {session && session.user.accessLevel >= 6 && (
             <Card 
             title="Brukere - kommune"
             number={counts ? counts[selectedMunicipality].users : 0}
             link={"/portal/dashboard/municipalities"}
           /> 
        )} 
          <Card 
          title="Skole - kommune"
          number={counts ? counts[selectedMunicipality].schools : 0}
          link={"/portal/dashboard/schools"}
        />
        <Card 
          title="Skole -totalt"
          number={counts?.schools || 0}
          link={"/portal/dashboard/schools"}
        />
   
        {session && session.user.accessLevel >= 6 && (
             <Card 
             title="Kommune - totalt"
             number={counts?.municipalities || 0}
             link={"/portal/dashboard/municipalities"}
           /> 
        )} 
     
      </div>
    </>


  )
}


