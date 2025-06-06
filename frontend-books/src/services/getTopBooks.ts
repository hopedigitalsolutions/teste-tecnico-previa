import { TopBook } from "@/app/interfaces/ITopBook";

export const getTopBooks = async (): Promise<TopBook[]> => {
  const res = await fetch("http://localhost:3001/books/top");
  return res.json();
};