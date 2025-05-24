import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { Teaching } from '@/typings'

const EVENT_QUERY = groq`*[_type == "teaching"]`;


export async function GET(req: NextRequest) {
    const teaching: Teaching[] = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ teaching });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;