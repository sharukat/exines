import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { Project } from '@/typings'

const EVENT_QUERY = groq`*[_type == "projects"]`;


export async function GET(req: NextRequest) {
    const projects: Project[] = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ projects });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;