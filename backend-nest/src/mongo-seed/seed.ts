import { connect, disconnect, model } from 'mongoose';
import { Book, BookSchema } from 'src/book/schema/book.schema';
import { Review, ReviewSchema } from 'src/review/schema/review.schema';

async function seed() {
  await connect('mongodb://mongo:27017/mydatabase');

  const BookModel = model(Book.name, BookSchema);
  const ReviewModel = model(Review.name, ReviewSchema, 'reviews'); 
  await BookModel.deleteMany({});
  await ReviewModel.deleteMany({});

  const books = await BookModel.insertMany([
    { name: 'Livro A', description: 'Desc A', author_name: 'Autor A' },
    { name: 'Livro B', description: 'Desc B', author_name: 'Autor B' },
    { name: 'Livro C', description: 'Desc C', author_name: 'Autor C' },
    { name: 'Livro D', description: 'Desc D', author_name: 'Autor D' },
    { name: 'Livro E', description: 'Desc E', author_name: 'Autor E' },
  ]);

  const reviews = books.map(book => ({
    comment: `Review para ${book.name}`,
    rating: Math.floor(Math.random() * 5) + 1,
    bookId: book._id,
  }));

  await ReviewModel.insertMany(reviews);

  console.log('✅ Seed finalizado');
  await disconnect();
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  process.exit(1);
});