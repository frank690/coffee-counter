import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import { UserCard } from "./UserCard";

type User = {
  uid: string;
  name: string;
  count: number;
};

export function LoggedInUserCard({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate: (uid: string, action: "plus" | "minus") => void;
}) {
  return (
    <div className="flex gap-4">
      <UserCard user={user} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="user-card w-20 flex justify-center items-center no-padding"
      >
        <Button 
          variant="plus" 
          onClick={() => onUpdate(user.uid, "plus")}
          className="w-full h-full flex justify-center items-center"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            <Plus className="w-6 h-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
