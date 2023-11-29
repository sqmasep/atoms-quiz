"use client";

import { tv } from "tailwind-variants";
import { motion } from "framer-motion";
import type { VariantProps } from "tailwind-variants";
import type { AnimationRelation } from "~/utils/types";

interface ChoiceCardProps {
  value: string;
}

const choiceCard = tv({
  base: "rounded-lg border-2 border-neutral-500 p-4 focus:border-blue-500 focus:outline-none",
});

const variants = {
  parent: {
    tap: {
      scale: 0.96,
      backgroundColor: "#fff1",
    },
  },
  child: {
    tap: {
      scale: 0.94,
    },
  },
} satisfies AnimationRelation;

const ChoiceCard: React.FC<
  ChoiceCardProps &
    VariantProps<typeof choiceCard> &
    Omit<
      React.ComponentPropsWithoutRef<typeof motion.button>,
      keyof ChoiceCardProps
    >
> = ({ value, ...props }) => {
  return (
    <motion.button
      {...props}
      variants={variants.parent}
      whileTap="tap"
      className={choiceCard()}
    >
      <motion.div variants={variants.child}>{value}</motion.div>
    </motion.button>
  );
};

export default ChoiceCard;
