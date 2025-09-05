import type { Route } from "./+types/home";
import { Button } from "../components/Button";
import { PageWrapper } from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load users. Please try again later.");
        setLoading(false);
      });
  }, []);


  const handleUpdate = async (userUid: string, action: "plus" | "minus") => {
    if (uid !== userUid) return; // safeguard

    try {
      const res = await fetch(
        `${API_URL}/update?uid=${uid}&action=${action}`,
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
          {users.map((user) => (
            <motion.div
              key={user.uid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="user-card"
            >
              <span className="text-2xl font-semibold select-none">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span>
              <div className="flex items-center space-x-4">
                {uid === user.uid ? (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="minus"
                      onClick={() => handleUpdate(user.uid, "minus")}
                      asChild
                    >
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <Minus className="w-5 h-5" />
                      </motion.div>
                    </Button>

                    <motion.span
                      key={user.count}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl font-bold w-12 text-center select-none"
                    >
                      {user.count}
                    </motion.span>

                    <Button
                      variant="plus"
                      onClick={() => handleUpdate(user.uid, "plus")}
                      asChild
                    >
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <Plus className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </div>
                ) : (
                  <motion.span
                    key={user.count}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold text-2xl w-12 text-center"
                  >
                    {user.count}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
