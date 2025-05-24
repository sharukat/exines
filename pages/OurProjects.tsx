"use client";

import React from 'react';
import { Project } from '@/typings';
import Projects from '@/components/Projects';
import { fetchProjects } from '@/lib/fetchData';


export default function OurProjects({ projects }: { projects: Project[] }) {
    return (
        <section id="outdesk" className="w-[80%]">
            <p className='text-center sm:text-tiny text-sm mt-2'>Already a lab member? Please sign-in to add projects.</p>
            <div className='justify-center items-center flex flex-col'>
                <Projects projects={projects} />

            </div>
        </section>
    );
}

export async function getServerSideProps() {
    const projects: Project[] = await fetchProjects();
    return {
        props: {
            projects: projects
        }
    };
}