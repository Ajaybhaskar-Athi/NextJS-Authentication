// // src/lib/utils.js

/**
 * Combines class names conditionally.
 * @param {...(string|boolean)} classes - Class names to combine.
 * @returns {string} Combined class names.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }
