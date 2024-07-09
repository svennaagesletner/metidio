"use client"

import Image from 'next/image';
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
import ProfileCard from './profileCard';
import {Avatar} from "@nextui-org/avatar";


function ProfileMenu() {
    const [showEditModal, setShowEditModal] = useState(false);
    const {data: session} = useSession()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowEditModal(false);
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



    return (
        <div>
            <div className="relative">
                <div className="group flex items-center cursor-pointer" onClick={toggleEditModal} onMouseEnter={() => setShowEditModal(true)}>
                    <div className="flex items-center justify-center  hover:rounded-lg">
                    <Avatar showFallback name={session.user.name} className="rounded-full"/>
                    </div>
            
                </div>
            </div>  
            {showEditModal && (
                <div ref={modalRef} className="absolute z-50 p-3 right-5 mt-2 text-sm w-48 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg">
                    <ProfileCard 
                    name={session.user.name}
                    image={session.user.image}
                    />
                    <div><p>Navn</p>   {session.user.name}</div>
                    <div><p>E-post</p>    {session.user.email}</div>
                    <div><p>Rolle</p>  {session.user.role}</div>

                </div>
            )}
        </div>
        
    );
}

export default ProfileMenu;
