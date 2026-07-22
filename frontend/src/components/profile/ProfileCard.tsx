interface User {
  id: number;
  name: string;
  email: string;
}

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({
  user,
}: ProfileCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow">
      <h2 className="mb-8 text-2xl font-bold">
        👤 My Profile
      </h2>

      <div className="space-y-6">

        <div>
          <p className="text-sm text-gray-500">
            Name
          </p>

          <h3 className="text-xl font-semibold">
            {user.name}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <h3 className="text-xl font-semibold">
            {user.email}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            User ID
          </p>

          <h3 className="text-xl font-semibold">
            #{user.id}
          </h3>
        </div>

      </div>
    </div>
  );
}