import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { Member } from '@/typings'

const EVENT_QUERY = groq`*[_type == "team"]`;


export async function GET(req: NextRequest) {
    const team: Member[] = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ team });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;