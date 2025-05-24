import React from 'react';
import OurDesk from '@/pages/OurDesk'
import { fetchPosts } from '@/lib/fetchData';
import { Post } from '@/typings';

export default async function DeskPage() {
    const posts: Post[] = await fetchPosts();
    return (
        <main className="flex flex-col items-center px-4">
            <OurDesk posts={posts}/>
        </main>
    )
}