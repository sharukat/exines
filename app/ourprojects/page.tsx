import React from 'react';
import OurProjects from '@/pages/OurProjects'
import { Project } from '@/typings';
import { fetchProjects } from '@/lib/fetchData';


export default async function ProjectPage() {
    const projects: Project[] = await fetchProjects()
    return (
        <main className="flex flex-col items-center px-4">
            <OurProjects projects={projects}/>
        </main>
    )
}