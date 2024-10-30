interface CompetitionDetailsProps {
  competitionDetailsResponse: any;
}

export default function CompetitionDetails({ competitionDetailsResponse }: CompetitionDetailsProps) {
  //console.log({ competitionDetailsResponse });
  return (
    <div className="flex flex-col items-center">
      <p>{competitionDetailsResponse.name}</p>
      {competitionDetailsResponse.seasons.map((season: any) => (
        <div key={season.id}>
          <p>{season.currentMatchday}</p>
        </div>
      ))}
    </div>
  );
}
