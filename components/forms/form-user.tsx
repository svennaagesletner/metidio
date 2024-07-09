'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

import { GraduationCap, School } from 'lucide-react';

import { useFormState} from 'react-dom';
import clsx from 'clsx';
import { useEffect, useRef, useState} from 'react';
import { Role, User } from '@prisma/client';
import { TranslateKeysToLanguage } from '@/lib/misc/languageMapping';
import FormInput from './form-input';
import { getUser, deleteUser, registerUser} from '@/lib/actions/userActions';
import Loading from '@/app/portal/dashboard/loading';
import FormAutoCompleteNextUi from './form-search-nextUI';
import { redirect } from 'next/navigation';
import FormSelectNextUI from './form-select-nextUI';
import EnableToggle from '../ui/enableToggle';
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/actions/getDashboardData"
import { toast } from 'sonner';
import { DeleteButton } from '../buttons/deleteButton';
import { RegisterButton } from '../buttons/registerButton';
import { useSession } from 'next-auth/react';
import { findSchoolAndMunicipality } from '@/lib/utils';


export default function UserForm<T>({userId, searchParams, dashboardData, userData}: {userId?: string, searchParams?: any, dashboardData: dashboardData, userData?: User & {municipality: {name: string}} & {school: {name: string}}}) {

  //React query
  const {data, error, isLoading} = useQuery<dashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => await getDashboardData(),
    initialData: dashboardData
  })
    const [showSuccess, setShowSuccess] = useState(false)
    const [school, setSchool] = useState(data?.municipalities[0].schools[0].name || "")
    const [schoolList, setSchoolList] = useState(data?.allSchools)
    const [municipality, setMunicipality] = useState<String | undefined>(data?.municipalities[0].name || "")
    const [municipalityList, setMunicipalityList] = useState(data?.municipalities)
    const [rolesList, setRolesList] = useState<String[]>([])
    const [role, setRole] = useState<String[] | null>([])
    const [isActive, setIsActive] = useState(userData?.isActive || true)
    const [formState, dispatch] = useFormState(registerUser, {
      message: "",
      errors: undefined,
      fieldValues: {
        name: userData?.name || "",
        email: userData?.email || "",
        password: "",
        confirmPassword: "",
        role: userData?.role || "",
        municipality: userData?.municipality?.name || "",
        school: userData?.school?.name || "",
        isActive: userData?.isActive || false,
      },
    });

    const {data: session, update} = useSession()


    const formRef = useRef<HTMLFormElement>(null)

    //Set mappings for roles
    useEffect(() => { 
      const roles = Object.keys(Role);
      const rolesMap= TranslateKeysToLanguage({item: roles, language: "norwegian"})
      const roleItems = rolesMap.map((role, index) => {
          return {name: role, key: roles[index]}
      }) as any
    
      const role = roleItems.find((role: any) => role.key === userData?.role)
      setRole([role?.name || "Gjest"])
      setRolesList(roleItems)

      if (userId) {
        const school = findSchoolAndMunicipality(userId, dashboardData)
        setSchool(school.school)
        setMunicipality(school.municipality)
      }
    },[])

    //Control school list based on selected municipality: TODO: Refactor to custom hook
    useEffect(() => {
      const foundSchool = data?.allSchools.find((e) => e.name == school)
      if (foundSchool && municipalityList) {
          const list = municipalityList.filter((e) => e.id === foundSchool.municipalityId)
          //setMunicipality(list[0].name)
          //setMunicipalityList(list)
      } else {
          setMunicipalityList(data?.municipalities)
      }
    }, [school])

    useEffect(() => {
      const foundMunicipality = data?.municipalities.find((e: any) => e.name === municipality )
      if (foundMunicipality) {
          const list = foundMunicipality.schools.slice();

          if (!list.length) {
              setSchoolList([{name:"Valgt kommune har ingen skoler", id: "0"}] as any)
              return
          }

          //setSchool(list[0].name)
          if (formState.fieldValues) {formState.fieldValues.school = list[0].name}
          setSchoolList(list)

      } else {
          setSchoolList(data?.allSchools)
      }
    }, [municipality])

    //Toast & Redirect to dashboard if user is successfully added
    useEffect(()=> {
      if (formState?.message == "success") {
        toast.success(formState.successMessage)
        //update session if current user is updated
        handleSessionUpdate()
        //redirect("/portal/dashboard/users")
      } else if (formState?.message == "errorMessage") {
        toast.error(formState.errorMessage)
      }
    }, [formState])

    const handleSessionUpdate = async () => {
      if (session?.user.id === userId) {
        await update({...formState.fieldValues})
      }
    }


  if (userId && !userData) {
    return (<><Loading /></>)
  } else if (isLoading){
    return <><Loading /></>
  } 


  return (
    <div className='p-3'>
    {showSuccess && ( 
        <div className='flex w-full p-5 mb-1 bg-green-500/30 rounded-md border border-green-600'>{formState.successMessage} <br/> Skole: {formState?.fieldValues?.school} <br/> Kommune: {formState?.fieldValues?.municipality}</div>
     )}
    <form action={dispatch} ref={formRef} className="space-y-2">
      <div className="">
        <h1 className={`mb-3 text-2xl`}>
        {userId ? "Rediger bruker" : "Ny bruker"}
        <input type="hidden" name="type" value={userId ? "edit" : "add"} />
        <input type="hidden" name="id" value={userId} />
        <input type="hidden" name="isActive" value={JSON.stringify(isActive)} />
        </h1>

        <div className="w-full">
            <FormInput 
            id="name"
            name="name"
            type="text"
            label="Navn"
            defaultValue={formState?.fieldValues?.name || ""}
            placeholder='Fullt navn'
            className={clsx({"border-red-400": formState.errors?.name}, "peer input-primary")}
            logo={<IdentificationIcon className="input-primary-icon" />}
            formstate={formState}
            />

            <FormInput 
            id="email"
            name="email"
            type="email"
            label="E-post"
            placeholder="E-post"
            defaultValue={formState?.fieldValues?.email || ""}
            className={clsx({"border-red-400": formState.errors?.email}, "peer input-primary")}
            logo={<AtSymbolIcon className="input-primary-icon" />}
            formstate={formState}
            />


                {!userId && (
                <>
                <FormInput 
                id="password"
                type="password"
                name="password"
                label="Passord"
                placeholder="Passord"
                aria-label="password"
                defaultValue=''
                className={clsx({"border-red-400": formState.errors?.password}, "peer input-primary")}
                logo={<KeyIcon className="input-primary-icon" />}
                formstate={formState}
                />

                <FormInput 
                  id="confirmpassword"
                  type="password"
                  name="confirmPassword"
                  label="Bekreft passord"
                  aria-label="confirmpassword"
                  placeholder="Bekreft passord"
                  defaultValue=''
                  className={clsx({"border-red-400": formState.errors?.confirmPassword}, "peer input-primary")}
                  logo={<KeyIcon className="input-primary-icon" />}
                  formstate={formState}
                />
                </>
                )} 

            <FormAutoCompleteNextUi 
            label="Skole"
            id="school"
            name="school"
            aria-label='school'
            placeholder="Skole"
            defaultItems={schoolList}
            selectedKey={(school) as string | undefined}
            onSelectionChange={(e:any) => {
              if (formState.fieldValues) {formState.fieldValues.school = e}
              setSchool(e)
            }}
            formState={formState}
            logo={<School className="input-primary-icon" />}            
            /> 
      
       

            <FormAutoCompleteNextUi 
            label="Kommune"
            id="municipality"
            name="municipality"
            aria-label='municipality'
            placeholder="Kommune"
            defaultItems={data?.municipalities}
            selectedKey={(municipality) as string | undefined}
            onSelectionChange={(e: any) => {
              if (formState.fieldValues) {formState.fieldValues.municipality = e}
              setMunicipality(e)
            }}
            formState={formState}
            logo={<GraduationCap size={24} className="input-primary-icon" />}
            />
        
            <div className="flex w-full space-x-2">
            <div className="w-full">
            <FormSelectNextUI
                  id="role"
                  name="role"
                  label="Rolle"
                  aria-label='role'
                  required={true}
                  selectedKeys={(role) as any}
                  onChange={(e) => setRole([e.target.value])}
                  items={rolesList}
                  formState={formState}
                  logo={<AtSymbolIcon className="input-primary-icon" />}
            />
            </div>
            <div className="flex justify-center align-middle mt-8">
              <EnableToggle 
                id="isActive"
                name="isActive"
                aria-label='isActive'
                defaultSelected={isActive || false}
                state={setIsActive as React.Dispatch<React.SetStateAction<boolean>>}                  
              />
            </div>
            </div>

     
        <RegisterButton 
        title='bruker'
        />

        {userData && 
        <DeleteButton
        id={userData?.id} 
        buttonTitle="Slett bruker"
        deletefunction={deleteUser} 
        confirmStr='Er du sikker på at du vil slette brukeren? Dette kan ikke angres!'
        redirect="/portal/dashboard/users"
        />
       }

        <div
          className="flex max-h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >

            {formState.message == "errorMessage" && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                  <p className="text-sm text-red-600">{formState?.errorMessage}</p>
                </>
              )}
        </div>
   

      </div>
      </div>
      </form>
        

        </div>



  );
}

