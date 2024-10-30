import { CompetitionItemResponse, CompetitionsResponse } from '@/ts/interfaces/competitions-response.interface';
import CompetitionCard from './competition-card';
import Link from 'next/link';

interface CompetitionsWrapperProps {
  competitionsResponse: CompetitionsResponse;
}

export function CompetitionsWrapper({ competitionsResponse }: CompetitionsWrapperProps) {
  return (
    <>
      <h1 className="text-center my-12 font-bold text-2xl underline underline-offset-3">
        Liste des compétitions à travers le monde
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {competitionsResponse.competitions.map((competition: CompetitionItemResponse) => (
          <Link href={`/competitions/${competition.code}`} key={competition.id}>
            <CompetitionCard name={competition.name} emblem={competition.emblem} />
          </Link>
        ))}
      </div>
    </>
  );
}
