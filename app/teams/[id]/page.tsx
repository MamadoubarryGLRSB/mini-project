import TeamsDetails from '@/components/teams/teams-details';

async function getTeamById(id: number) {
  try {
    const competition = await fetch(`${process.env.REACT_BASE_API_URL}v4/teams/${id}`, {
      headers: {
        'X-Auth-Token': process.env.API_TOKEN
      } as HeadersInit
    });

    const data = await competition.json();

    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export default async function TeamsDetailPage({ params }: { params: { id: number } }) {
  const { id } = params;

  const teamDetailResponse = await getTeamById(id);
  console.log('Je suis la !!!!! ', teamDetailResponse);
  return <TeamsDetails teamDetailResponse={teamDetailResponse} />;
}
