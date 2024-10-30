import Image from 'next/image';

interface CompetitionCardProps {
  name: string;
  emblem: string;
}

export default function CompetitionCard({ name, emblem }: CompetitionCardProps) {
  return (
    <div className="bg-gray-200 p-8 rounded-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-black font-bold uppercase">{name}</h2>
        <Image src={emblem} alt={name} width={500} height={500} />
      </div>
    </div>
  );
}
