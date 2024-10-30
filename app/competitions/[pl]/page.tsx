import CompetitionDetails from '@/components/competitions/competition-details';

async function getCompetitionByPL(pl: string) {
  try {
    const competition = await fetch(`${process.env.REACT_BASE_API_URL}v4/competitions/${pl}`, {
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

export default async function CompetitionDetailsPage({ params }: { params: { pl: string } }) {
  const { pl } = params;

  const competitionDetailsResponse = await getCompetitionByPL(pl);

  return <CompetitionDetails competitionDetailsResponse={competitionDetailsResponse} />;
}
