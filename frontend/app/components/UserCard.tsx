import { motion } from "framer-motion";

type User = {
  uid: string;
  name: string;
  count: number;
};


export function UserCard({ user }: { user: User }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="user-card flex-1"
    >
      <span className="text-2xl font-semibold select-none">
        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
      </span>

      <motion.span
        key={user.count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-bold text-2xl text-center select-none"
      >
        {user.count}
      </motion.span>
    </motion.div>
  );
}
