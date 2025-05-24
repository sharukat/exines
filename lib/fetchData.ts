import {
    HeadInfo,
    Member,
    Publication,
    Post,
    Service,
    Teaching,
    Project
} from '@/typings'
import { promises as fs } from 'fs';
import path from 'path';


export const fetchMembers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getMembers`, { cache: 'no-store' });
    const data = await res.json();
    const team: Member[] = data.team;
    return team;
};

export const fetchHeadInfo = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getHeadInfo`, { cache: 'no-store' });
    const data = await res.json();
    const headInfo: HeadInfo = data.headInfo;
    return headInfo;
};

export const fetchServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getServices`, { cache: 'no-store' });
    const data = await res.json();
    const services: Service[] = data.services;
    return services;
};

export const fetchTeaching = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getTeaching`, { cache: 'no-store' });
    const data = await res.json();
    const teaching: Teaching[] = data.teaching;
    return teaching;
};

// export const fetchPublications = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getPublications`, { cache: 'no-store' });
//     const data = await res.json();
//     const publications: Publication[] = data.articles;
//     return publications;
// };

// export const fetchPublications = async () => {
//     // const result = await fetch(`http://127.0.0.1:5328/api/publications`, { cache: 'no-store' });
//     const res = fs.readFileSync('lib/publications.json', 'utf8');
//     const data = JSON.parse(res);
//     const publications: Publication[] = data.publications;
//     return publications;
// };

export const fetchPublications = async () => {
    const filePath = path.join(process.cwd(), 'lib', 'publications.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    const publications: Publication[] = data.publications;
    return publications;
  };



export const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getPosts`, { cache: 'no-store' });
    const data = await res.json();
    const posts: Post[] = data.posts;
    return posts;
};


export const fetchProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanity_api/getProjects`, { cache: 'no-store' });
    const data = await res.json();
    const projects: Project[] = data.projects;
    return projects;
};