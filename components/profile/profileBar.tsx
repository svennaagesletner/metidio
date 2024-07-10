"use client"

import Image from 'next/image';
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import ProfileCard from './profileCard';
import {Avatar} from "@nextui-org/avatar";
import { ArrowUp01, GraduationCap, School, User, X } from 'lucide-react';
import ProfileItem from './profileItem';
import SchoolYearSelect from './schoolYearSelect';


function ProfileMenu() {
    const [showEditModal, setShowEditModal] = useState(false);
    const {data: session} = useSession()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                //  setShowEditModal(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const modalRef = useRef() as MutableRefObject<HTMLDivElement>;


    if (!session) return


    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const profileItems = [
        {name: "Profil", href: `/portal/dashboard/users/edit/${session.user.id}`, icon: <User />},
        {name: "Din skole", href: `/portal/dashboard/school/edit/${session.user.schoolId}`, icon: <School />},
        {name: "Din kommune", href: `/portal/dashboard/municipalities/edit/${session.user.municipalityId}`, icon: <GraduationCap />},
        {name: "Ressursoversikt", href: "", icon: <ArrowUp01 />}


    ]



    return (
        <div>
            <div className="relative">
                <div className="groupflex items-center cursor-pointer" onClick={toggleEditModal}>
                    <div className="flex items-center justify-center">
                    <Avatar showFallback name={session.user.name} className="rounded-full"/>
                    </div>
            
                </div>
            </div>  
            {showEditModal && (
                <div ref={modalRef} className="absolute z-50 p-4 right-0 top-0 h-full text-sm w-60 bg-white dark:dark-background border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-sm">
                    <div className='flex gap-1 justify-between items-center'>
                    <ProfileCard 
                    name={session.user.name}
                    image={session.user.image}
                    role={session.user.role}
                    />
                     <div className='flex justify-end' onClick={toggleEditModal}>
                        <div className='cursor-pointer hover:dark:bg-neutral-600 hover:bg-neutral-200 rounded-sm p-1'>
                            <X width={16} height={16}/>
                        </div>
                    </div>
                    </div>
                    <hr className='my-3'/>
                    

                    <SchoolYearSelect />
                    <hr className='my-3'/>


                    <div className='mt-3'>
                    {profileItems.map((item, index) => {
                        return (
                            <ProfileItem 
                            key={item.name}
                            name={item.name}
                            href={item.href}
                            icon={item.icon}
                            />
                        )})}
                    </div>
                    
                
        

                </div>
            )}
        </div>
        
    );
}

export default ProfileMenu;
