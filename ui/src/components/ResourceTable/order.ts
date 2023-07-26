export type Order = "asc" | "desc";

export const isOrder = (value: string): value is Order => ["asc", "desc"].includes(value);
