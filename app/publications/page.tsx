import Publications from '@/components/PublicationsPage'
import { Publication } from '@/typings';
import { fetchPublications } from '@/lib/fetchData';


export default async function Papers() {
    const publications: Publication[] = await fetchPublications();
    return (
        <main className="flex flex-col items-center px-4">
            <Publications Papers={publications}/>
        </main>
    )
}