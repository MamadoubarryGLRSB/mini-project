import { TeamsItemResponse, TeamsResponse } from '@/ts/interfaces/teams-response.interface';
import Link from 'next/link';
import TeamCard from './team-card';

interface TeamsWrapperProps {
  teamsResponse: TeamsResponse;
}

export default function TeamsWrapper({ teamsResponse }: TeamsWrapperProps) {
  return (
    <div className="bg-gray-100 py-12">
      <h1 className="text-center my-8 font-bold text-3xl text-blue-800 underline underline-offset-8">
        Liste des équipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {teamsResponse.teams.map((team: TeamsItemResponse) => (
        <Link href={`/teams/${team.id}`} key={team.id}>
          <TeamCard name={team.name} shortName={team.shortName} crest={team.crest} />
        </Link>
        ))}
      </div>
    </div>
  );
}
