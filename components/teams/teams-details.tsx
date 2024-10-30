import { TeamDetails } from '@/ts/interfaces/detail-teams-interface';
import Image from 'next/image';
import { RunningCompetition } from '../../ts/interfaces/detail-teams-interface';

interface TeamDetailProps {
  teamDetailResponse: TeamDetails;
}

export default function TeamsDetails({ teamDetailResponse }: TeamDetailProps) {
  console.log(teamDetailResponse);
  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{teamDetailResponse.name}</h1>
      <p className="text-gray-600 mb-2">{teamDetailResponse.address}</p>
      {teamDetailResponse?.area && (
        <div className="flex flex-col items-center mb-4">
          <Image
            src={teamDetailResponse?.area?.flag}
            alt={teamDetailResponse?.area?.name}
            height={100}
            width={150}
            className="rounded"
          />
          <p className="text-gray-700 mt-2">{teamDetailResponse?.area?.name} ({teamDetailResponse?.area?.code})</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-600">Competitions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {teamDetailResponse.runningCompetitions.map((competition: RunningCompetition) => (
          <div
            key={competition.id}
            className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Image
              src={competition.emblem}
              alt={competition.name}
              width={80}
              height={80}
              className="rounded mb-2"
            />
            <h3 className="text-xl font-medium text-blue-800">{competition.name}</h3>
            <p className="text-gray-500">{competition.type}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
}
