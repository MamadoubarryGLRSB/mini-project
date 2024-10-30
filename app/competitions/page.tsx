import { CompetitionsWrapper } from '@/components/competitions/competitions-wrapper';

export async function getCompetitions() {
  try {
    const res = await fetch(`${process.env.REACT_BASE_API_URL}v4/competitions/`, {
      headers: {
        'X-Auth-Token': process.env.API_TOKEN
      } as HeadersInit
    });

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function CompetitionsPage() {
  const competitionsResponse = await getCompetitions();
  return <CompetitionsWrapper competitionsResponse={competitionsResponse} />;
}
