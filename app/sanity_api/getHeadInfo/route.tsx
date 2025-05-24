import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { HeadInfo } from '@/typings'

const EVENT_QUERY = groq`*[_type == "headInfo"][0]`;


export async function GET(req: NextRequest) {
    const headInfo: HeadInfo = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ headInfo });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;