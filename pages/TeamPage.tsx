"use client";

import React from 'react';
import { Member } from '@/typings';
import { fetchMembers } from '@/lib/fetchData';
import MemberComponent from '@/components/Members';

export default function Members({ initialMembers }: { initialMembers: Member[] }) {
    return (
        <section id="members" className="w-[80%]">
            <MemberComponent members={initialMembers} />
        </section>
    );
}

export async function getServerSideProps() {
    const members: Member[] = await fetchMembers();
    return {
        props: {
            initialMembers: members
        }
    };
}