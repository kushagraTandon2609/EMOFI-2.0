import { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import ProfileCard from "../components/profile/ProfileCard";

import { getProfile } from "../services/profile";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <DashboardNavbar />

        <div className="mt-8">
          <ProfileCard user={user} />
        </div>
      </div>
    </div>
  );
}