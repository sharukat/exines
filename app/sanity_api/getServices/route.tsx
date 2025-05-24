import { NextRequest, NextResponse } from 'next/server';
import { groq } from "next-sanity";
import { sanityClient } from '@/sanityClient';
import { Service } from '@/typings'

const EVENT_QUERY = groq`*[_type == "services"]`;


export async function GET(req: NextRequest) {
    const services: Service[] = await sanityClient.fetch(EVENT_QUERY);
    return NextResponse.json({ services });
};

// export const dynamic = "force-dynamic";
// export const revalidate = 3600;