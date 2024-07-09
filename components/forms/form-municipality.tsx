'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

import { GraduationCap, School } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { useEffect, useRef, useState} from 'react';
import FormSelect from './form-select';
import FormInput from './form-input';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/lib/actions/getDashboardData';
import { RegisterButton } from '../buttons/registerButton';
import { DeleteButton } from '../buttons/deleteButton';
import { deleteMunicipality, registerMunicipality } from '@/lib/actions/municipalittyActions';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import EnableToggle from '../ui/enableToggle';

export default function MunicipalityForm({id, searchParams, dashboardData}: {id?: string, searchParams?: any, dashboardData?: dashboardData}) {
  const {data, error, isLoading, refetch} = useQuery<dashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => await getDashboardData(),
    initialData: dashboardData
  })

    const [isActive, setIsActive] = useState(dashboardData?.municipalities.find((municipality) => municipality.id === id)?.isActive || false)
    const [formState, dispatch] = useFormState(registerMunicipality, {
      message: "",
      errors: undefined,
      fieldValues: {
        name: dashboardData?.municipalities.find((municipality) => municipality.id === id)?.name || "",
        municipality: dashboardData?.municipalities.find((municipality) => municipality.id === id)?.name || "",
        isActive: dashboardData?.municipalities.find((municipality) => municipality.id === id)?.isActive || false,
      },
    });

  const formRef = useRef<HTMLFormElement>(null)
  let activeRef: any = useRef<HTMLElement>(null)

  
 //Toast & Redirect to dashboard if user is successfully added
 useEffect(()=> {
  if (formState?.message == "success") {
    toast.success(formState.successMessage)
    redirect("/portal/dashboard/municipalities")
  } else if (formState?.message == "errorMessage") {
    toast.error(formState.errorMessage)
  }
}, [formState])

  //Check if municipalit exists and redirect if not and show error
  if (dashboardData?.municipalities && !dashboardData?.municipalities.find((municipality) => municipality.id === id)){
    toast.error("Kommunen ble ikke funnet. Det kan bety at den er slettet eller at du ikke har tilgang til den.")
    redirect("/portal/dashboard/municipalities")
  }

  return (
    <div className='p-3'>
    <form action={dispatch} 
    ref={formRef}
    className="space-y-2">
      <div className="">
        <h1 className={`mb-3 text-2xl`}>
        {id ? "Rediger kommune" : "Opprett ny kommune"}
        <input type="hidden" name="type" value={id ? "edit" : "add"} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="isActive" value={JSON.stringify(isActive)} />
        </h1>

        <div className="w-full">

          <FormInput 
                    id="name"
                    name="name"
                    type="text"
                    label="Navn"
                    placeholder='Kommunenavn'
                    defaultValue={formState?.fieldValues?.name}
                    className={clsx({"border-red-400": formState.errors?.name}, "peer input-primary")}
                    logo={<School className="input-primary-icon" />}
                    formstate={formState}
          />

          <EnableToggle 
              id="isActive"
              name="isActive"
              aria-label='isActive'
              defaultSelected={isActive || false}
              state={setIsActive}                  
              />

      
       
        <RegisterButton 
        title={"kommune"}
        />
         {id &&
        <DeleteButton 
        id={id}
        buttonTitle='Slett kommune'
        deletefunction={deleteMunicipality}
        confirmStr='Er du sikker på at du vil slette denne kommunen?'
        redirect='/portal/dashboard/municipalities'

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




