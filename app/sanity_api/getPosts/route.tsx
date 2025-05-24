import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { Post } from '@/typings'

const EVENT_QUERY = groq`*[_type == "posts"]`;


export async function GET(req: NextRequest) {
    const posts: Post[] = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ posts });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;