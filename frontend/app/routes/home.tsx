import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

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

  // Get UID from URL query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUid(params.get("uid"));
  }, []);

  // Fetch all users
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (userUid: string, action: "plus" | "minus") => {
    if (uid !== userUid) return; // safeguard

    try {
      const res = await fetch(
        `http://localhost:8000/update?uid=${uid}&action=${action}`,
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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-900 dark:text-gray-100">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="select-none text-5xl">Coffee Counter</h1>
      <div className="space-y-4 mt-4">
        {users.map((user) => (
          <div key={user.uid} className="user-card">
            <span className="font-bold text-xl">{user.name}</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleUpdate(user.uid, "minus")}
                disabled={uid !== user.uid}
                className={`${uid === user.uid ? "button button-minus" : "button button-disabled"} select-none`}
              >
                -
              </button>
              <span className="font-bold text-2xl w-12 text-center">{user.count}</span>
              <button
                onClick={() => handleUpdate(user.uid, "plus")}
                disabled={uid !== user.uid}
                className={`${uid === user.uid ? "button button-plus" : "button button-disabled"} select-none`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
