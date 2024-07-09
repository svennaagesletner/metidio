'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/lib/actions/userActions';
import { useRouter } from 'next/navigation'
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

export default function RegisterForm() {
  const router = useRouter()


  const [errorMessage, dispatch] = useFormState(registerUser, {
    message: "",
    errors: undefined,
    fieldValues: {
      name: "",
      email: "",
      password: "",
      municipality: "",
      school: ""
    }
  });

  const formRef = useRef<HTMLFormElement>(null)


  useEffect(()=> {
    if (errorMessage?.message == "success") {
      router.push("/auth/login")
    }
  }, [errorMessage])

  return (
    <div>
    <form action={dispatch} className="space-y-2" ref={formRef}>
      <div className="auth-modal">
        <h1 className={`mb-3 text-2xl`}>
        Ny bruker
        </h1>

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white-500"
              htmlFor="email"
            >
              Navn
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage.errors?.name}, "peer input-primary")}
              id="name"
                type="name"
                name="name"
                placeholder="Fullt navn"
              />
              <IdentificationIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.name && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors.name}</p>
            </>
          )}
          </div>
          <div className='mt-4'>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white-500"
              htmlFor="email"
            >
              E-post
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage.errors?.email}, "peer input-primary")}
              id="email"
                name="email"
                placeholder="E-post"
              />
              <AtSymbolIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.email && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors.email}</p>
            </>
          )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white-500"
              htmlFor="password"
            >
              Passord
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage.errors?.password}, "peer input-primary")}
              id="password"
                type="password"
                name="password"
                placeholder="Passord"
              />
              <KeyIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.password && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors.password}</p>
            </>
          )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white-500"
              htmlFor="municipality"
            >
              Kommune
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage.errors?.municipality}, "peer input-primary")}
              id="municipality"
                name="municipality"
                placeholder="Kommune"
              />
              <KeyIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.municipality && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors.municipality}</p>
            </>
          )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white-500"
              htmlFor="school"
            >
              Skole
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage.errors?.school}, "peer input-primary")}
              id="school"
                name="school"
                placeholder="Skole"
              />
              <KeyIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.school && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors.school}</p>
            </>
          )}
          </div>
        </div>
        <RegisterButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        {errorMessage.message == "errorMessage" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-600">{errorMessage?.errorMessage}</p>
            </>
          )}
        </div>
   


      </div>
      </form>
      <div className="flex items-center">
          <LoginButton />
        </div>
      </div>

  );
}

function RegisterButton() {
    const { pending } = useFormStatus();
   
    return (
      <Button 
      className="mt-4 w-full" aria-disabled={pending}
      >
         {pending ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
           </svg>
           Oppretter... 
          </>
         )
         : (
    <>
      Opprett bruker <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500" />
    </>
  )}

      </Button>
    );
  }
 
  

function LoginButton() {
  const router = useRouter()
  return (
    <Button
    variant={"link"}
    className='flex-1'
    onClick={() => {router.push("/auth/login")}}
    >
      Logg inn
    </Button>
  )
}