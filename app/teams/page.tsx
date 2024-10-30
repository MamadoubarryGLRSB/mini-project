import TeamsWrapper from '@/components/teams/teams-wrapper';

export async function getTeams() {
  try {
    const res = await fetch(`${process.env.REACT_BASE_API_URL}v4/teams/`, {
      headers: {
        'X-Auth-Token': process.env.API_TOKEN
      } as HeadersInit
    });

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function TeamsPage() {
  const teamsResponse = await getTeams();

  return <TeamsWrapper teamsResponse={teamsResponse} />;
}
