'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, authenticateWithPorvider } from '@/lib/actions/authActions';
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react';
import clsx from 'clsx';


export default function LoginForm() {

  const [errorMessage, dispatch] = useFormState(authenticate, {
    message: "",
    errors: undefined,
    fieldValues: {
      email: "",
      password: ""
    }
  });

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(()=> {
    if (errorMessage?.message == "success") {
      formRef.current?.reset()
    }
  }, [errorMessage])
 
  return (
    <div className="auth-modal">
  
    <div className="flex flex-col w-full">
      
        <h2 className={`mb-3 text-2xl text-center`}>
          Logg inn
        </h2>

        
        <button
        type="button"
        onClick={() => { 
          authenticateWithPorvider("google")
        }}
        className="gsi-material-button">
        <div className="gsi-material-button-state"></div>
        <div className="gsi-material-button-content-wrapper">
          <div className="gsi-material-button-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{display: "block"}}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents">Logg inn med Google</span>
          <span style={{display: "none"}}>Sign in with Google</span>
        </div>
      </button>

      <p className={`text-xs mt-4 text-center linedDiv `}>
          eller
        </p>
 
    <form action={dispatch} className="space-y-2">
  
      

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-2 block text-xs font-medium text-white-500"
              htmlFor="email"
            >
              E-post
            </label>
            <div className="relative">
              <input
              className={clsx({"border-red-400": errorMessage?.errors?.email}, "peer input-primary")}
                id="email"
                name="email"
                placeholder="E-post"
              />
              <AtSymbolIcon className="input-primary-icon" />
            </div>

            {errorMessage?.errors?.email && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors?.email}</p>
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
              className={clsx({"border-red-400": errorMessage?.errors?.email}, "peer input-primary")}
              id="password"
                type="password"
                name="password"
                placeholder="Passord"
              />
              <KeyIcon className="input-primary-icon" />
            </div>
            {errorMessage?.errors?.password && (
            <>
              <p className="text-sm text-red-600">{errorMessage?.errors?.password}</p>
            </>
          )}
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage?.message == "errorMessage" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-600">{errorMessage?.errorMessage}</p>
            </>
          )}
        </div>
   



      </form>
      </div>
      <div className="flex items-center">
          <RegisterButton />
        </div>
      </div>

  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {pending ? "Logger inn..." : (
        <>
          Logg inn <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-500" />
        </>
      )}
    </Button>
  );
}

function RegisterButton() {
  const router = useRouter()
  return (
    <Button
    variant={"link"}
    className='flex-1'
    onClick={() => {router.push("/auth/register")}}
    >
      Ny bruker
    </Button>
  )
}