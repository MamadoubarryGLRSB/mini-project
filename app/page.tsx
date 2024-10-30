import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Bienvenue sur E-Football</h2>
          <p className="text-lg text-gray-700">
            Retrouvez les dernières actualités du monde du football, les compétitions majeures, les équipes et bien plus
            encore !
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Cristiano Ronaldo au Real Madrid</h3>
          <p className="text-gray-700 mb-6">
            Cristiano Ronaldo, aussi connu sous le nom de CR7, est l un des plus grands joueurs de football de
            l histoire. Lors de son passage au Real Madrid de 2009 à 2018, il a remporté de nombreux titres et battu de
            nombreux records. Revivez quelques moments mémorables de sa carrière au Real Madrid.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
                alt="Cristiano Ronaldo au Real Madrid"
                width={400}
                height={300}
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Les débuts de CR7 au Real</h4>
                <p className="text-gray-600">
                  Cristiano Ronaldo a rejoint le Real Madrid en 2009 pour un transfert record. Il a rapidement conquis
                  les fans par ses performances.
                </p>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/79/Cristiano_Ronaldo%2C_2011.jpg"
                alt="Cristiano Ronaldo célébrant un but"
                width={400}
                height={300}
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Les moments de gloire</h4>
                <p className="text-gray-600">
                  CR7 a marqué des buts spectaculaires et a remporté quatre Ligues des champions avec le Real Madrid.
                </p>
              </div>
            </div>

            <div className="rounded-lg shadow-md bg-white">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Cristiano_Ronaldo_with_trophy.jpg"
                alt="Cristiano Ronaldo avec le trophée de la Ligue des champions"
                width={400}
                height={300}
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">Des records inégalés</h4>
                <p className="text-gray-600">
                  Avec plus de 450 buts pour le club, Cristiano Ronaldo est le meilleur buteur de l histoire du Real
                  Madrid.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Découvrez les dernières actualités</h3>
          <p className="text-gray-700 mb-4">
            Ne manquez rien de l actualité des plus grands joueurs et équipes. Découvrez les analyses, les résultats et
            les interviews exclusives.
          </p>
          <Link href="/articles" className="text-blue-500 underline">
            Lire les articles
          </Link>
        </section>
      </main>

      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} E-Football. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
