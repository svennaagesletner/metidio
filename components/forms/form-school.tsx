'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

import { GraduationCap, School } from 'lucide-react';

import { useFormState, useFormStatus } from 'react-dom';
import { deleteSchool, registerSchool } from '@/lib/actions/schoolActions';
import clsx from 'clsx';
import { useEffect, useRef, useState} from 'react';
import FormInput from './form-input';
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/actions/getDashboardData"
import { toast } from 'sonner';
import { DeleteButton } from '../buttons/deleteButton';
import FormAutoCompleteNextUi from './form-search-nextUI';
import { RegisterButton } from '../buttons/registerButton';
import Loading from '@/app/portal/dashboard/loading';
import FormSelectNextUI from './form-select-nextUI';
import { redirect } from 'next/navigation';
import EnableToggle from '../ui/enableToggle';


export default function SchoolForm({schoolId, searchParams, dashboardData}: {schoolId?: string, searchParams?: any, dashboardData?: dashboardData}) {
  const {data, error, isLoading, refetch} = useQuery<dashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => await getDashboardData(),
    initialData: dashboardData
  })

    const [showSuccess, setShowSuccess] = useState(false)
    const [isActive, setIsActive] = useState(dashboardData?.allSchools.find((school) => school.id === schoolId)?.isActive || false)
    const [formState, dispatch] = useFormState(registerSchool, {
      message: "",
      errors: undefined,
      fieldValues: {
        type: "",
        name: dashboardData?.allSchools.find((school) => school.id === schoolId)?.name || "",
        municipality: dashboardData?.allSchools.find((school) => school.id === schoolId)?.municipality.name || "",
        isActive: dashboardData?.allSchools.find((school) => school.id === schoolId)?.isActive || false,
      },
    });

  const formRef = useRef<HTMLFormElement>(null)

    //Populate form with data if schoolId is provided
    useEffect(() => {
      if (schoolId && data) {
        const school = data.allSchools.find((school) => school.id === schoolId)
        if (school && formState.fieldValues) {
          formState.fieldValues.name = school.name
          formState.fieldValues.municipality = school.municipality.name
          formState.fieldValues.isActive = school.isActive
        }

      }
    }, [data])
  
  
  //Toast & Redirect to dashboard if user is successfully added
  useEffect(()=> {
    if (formState?.message == "success") {
      toast.success(formState.successMessage)
      redirect("/portal/dashboard/schools")
    } else if (formState?.message == "errorMessage") {
      toast.error(formState.errorMessage)
    }
  }, [formState])

  //Show loading spinner while fetching data
  if (!data && isLoading) {
    return (<><Loading /></>)
  } 

  //Check if school exists and redirect if not and show error
  if (schoolId && !dashboardData?.allSchools.find((school) => school.id === schoolId)){
    toast.error("Skolen ble ikke funnet. Det kan bety at den er slettet eller at du ikke har tilgang til den.")
    redirect("/portal/dashboard/schools")
  }

  return (
    <div className='p-3'>

    <form action={dispatch} 
    ref={formRef}
    className="space-y-2">
      <div className="">
        <h1 className={`mb-3 text-2xl`}>
        <input type="hidden" name="type" value={schoolId ? "edit" : "add"} />
        <input type="hidden" name="id" value={schoolId} />
        <input type="hidden" name="isActive" value={JSON.stringify(isActive)} />
        {schoolId ? "Rediger skole" : "Opprett ny skole"}
        </h1>

        <div className="w-full">

          <FormInput 
                    id="name"
                    name="name"
                    type="text"
                    label="Navn"
                    placeholder='Skolenavn'
                    defaultValue={formState?.fieldValues?.name}
                    className={clsx({"border-red-400": formState.errors?.name}, "peer input-primary")}
                    logo={<School className="input-primary-icon" />}
                    formstate={formState}
          />

            <FormAutoCompleteNextUi 
              label="Kommune"
              id="municipality"
              name="municipality"
              aria-label='municipality'
              placeholder="Kommune"
              defaultItems={data?.municipalities}
              defaultSelectedKey={(formState?.fieldValues?.municipality) as string | undefined}
              onChange={(e) => {if (formState.fieldValues)formState.fieldValues.municipality = e.target.value}}
              formState={formState}
              logo={<GraduationCap size={24} className="input-primary-icon" />}
            />

            <EnableToggle 
              id="isActive"
              name="isActive"
              aria-label='isActive'
              defaultSelected={isActive || false}
              state={setIsActive}                  
              />  

       
        <RegisterButton 
        title={"skole"}
        />

        {schoolId &&
        <DeleteButton
        id={schoolId} 
        buttonTitle='Slett skole'
        deletefunction={deleteSchool} 
        confirmStr='Er du sikker på at du vil slette skolen? Dette kan ikke angres!'
        redirect='/portal/dashboard/schools'
        />
        
        }

        <div
          className="flex h-8 items-end space-x-1"
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