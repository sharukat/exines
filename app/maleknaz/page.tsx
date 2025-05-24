import React from 'react';
import Maleknaz from '@/pages/Maleknaz'
import { HeadInfo, Service, Teaching } from '@/typings';
import { fetchHeadInfo, fetchServices, fetchTeaching } from '@/lib/fetchData';

export default async function MaleknazPage() {
    const headInfo: HeadInfo = await fetchHeadInfo();
    const services: Service[] = await fetchServices();
    const teaching: Teaching[] = await fetchTeaching();
    return (
        <main className="flex flex-col items-center px-4">
            <Maleknaz headInfo={headInfo} services={services} teaching={teaching} />
        </main>
    )
}