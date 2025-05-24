import React from 'react';
import Members from '@/pages/TeamPage';
import { fetchMembers } from '@/lib/fetchData';
import { Member } from '@/typings';

export default async function People() {
    const members: Member[] = await fetchMembers();
    return (
        <main className="flex flex-col items-center px-4">
            <Members initialMembers={members} />
        </main>
    )
}