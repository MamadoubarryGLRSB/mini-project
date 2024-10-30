import Image from 'next/image';

interface TeamCardProps {
  name: string;
  shortName: string;
  crest: string;
}

export default function TeamCard({ name, shortName, crest }: TeamCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-2 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-500">{shortName}</p>
      <Image src={crest} alt={name} width={500} height={500} />
    </div>
  );
}
