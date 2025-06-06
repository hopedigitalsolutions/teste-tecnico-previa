import { TopBook } from "@/app/interfaces/ITopBook";

export const getBook = async (id: string): Promise<TopBook> => {
  const res = await fetch(`http://localhost:3001/books/${id}`);
  if (!res.ok) {
    throw new Error('Erro ao buscar livro');
  }
  return res.json();
};