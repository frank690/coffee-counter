import type { Route } from "./+types/home";
import { PageWrapper } from "~/components/PageWrapper";
import { UserCard } from "~/components/UserCard";
import { LoggedInUserCard } from "~/components/LoggedInUserCard";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coffee Counter", name: "description", content: "Track your coffee usage!" },
  ];
}

type User = {
  uid: string;
  name: string;
  count: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);

  // Fetch API URL from environment variable or default to localhost
  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

  // Get UID from URL query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUid(params.get("uid"));
  }, []);

  // Fetch all users
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data: User[]) => {
        // Sort by count (highest first)
        const sorted = data.sort((a, b) => b.count - a.count);
        setUsers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load users. Please try again later.");
        setLoading(false);
      });
  }, []);


  const handleUpdate = async (userUid: string) => {
    if (uid !== userUid) return; // safeguard

    try {
      const res = await fetch(
        `${API_URL}/update?uid=${uid}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to update");
      const updatedUser: { uid: string; count: number } = await res.json();

      setUsers((prev) =>
        prev.map((user) =>
          user.uid === userUid ? { ...user, count: updatedUser.count } : user
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoading(false), 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  if (loading || minLoading) {
    return (
      <PageWrapper />
    );
  }

  return (
    <PageWrapper>
      <div className="w-full max-w-xl space-y-4">
        <AnimatePresence>
          {/* Logged-in user first with + button */}
          {uid &&
            users
              .filter((user) => user.uid === uid)
              .map((user) => (
                <LoggedInUserCard
                  key={`top-${user.uid}`}
                  user={user}
                  onUpdate={handleUpdate}
                />
              ))}

          {uid && <div className="h-2" />}  {/* Vertical spacer */}

          {/* Full sorted list (logged-in user included again) */}
          {users.map((user) => (
            <UserCard key={user.uid} user={user} />
          ))}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
