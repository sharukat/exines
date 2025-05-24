"use client";

import React from 'react';
import { Post } from '@/typings';
import Desk from '@/components/Desk';
import SectionHeading from "../components/SectionHeading";
import { fetchPosts } from '@/lib/fetchData';


export default function OurDesk({ posts }: { posts: Post[] }) {    
    return (
        <section id="ourdesk" className="w-[80%] px-auto">
            <SectionHeading title="From Our Desk to Yours" /><br />
            <h2 className='text-center uppercase sm:text-base text-lg'>Our Thoughts and Moments</h2>
            <p className='text-center sm:text-tiny text-sm mt-2'>Already a lab member? Please sign-in to share posts.</p>
            <div className='justify-center items-center flex flex-col'>
                <Desk posts={posts} />

            </div>
        </section>
    );
}

export async function getServerSideProps() {
    const posts: Post[] = await fetchPosts();
    return {
        props: {
            posts: posts
        }
    };
}