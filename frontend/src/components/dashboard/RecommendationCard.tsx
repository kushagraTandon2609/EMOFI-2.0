interface Song {
  title: string;
  artist: string;
  youtube: string;
}

interface RecommendationCardProps {
  songs: Song[];
}

export default function RecommendationCard({
  songs,
}: RecommendationCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        🎵 Recommended For You
      </h2>

      <div className="space-y-5">

        {songs.map((song, index) => (

          <div
            key={index}
            className="rounded-2xl border bg-violet-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >

            <h3 className="text-xl font-semibold">
              {song.title}
            </h3>

            <p className="mt-1 text-gray-600">
              {song.artist}
            </p>

            <a
              href={song.youtube}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-lg bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
            >
              ▶ Play on YouTube
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}