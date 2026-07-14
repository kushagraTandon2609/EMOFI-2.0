import {
  Brain,
  Music4,
  ChartColumn,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Emotion Detection",
    desc: "Real-time AI powered facial emotion recognition.",
  },
  {
    icon: Music4,
    title: "Smart Recommendation",
    desc: "Personalized songs based on your current mood.",
  },
  {
    icon: ChartColumn,
    title: "Mood Analytics",
    desc: "Track and visualize your emotional journey.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your data is encrypted and protected.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">

        <h2 className="mb-4 text-center text-4xl font-bold">
          Why EMOFI?
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
          EMOFI combines Artificial Intelligence, Emotion Recognition,
          and Music Recommendation into one seamless experience.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                  <Icon className="text-violet-600" size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}