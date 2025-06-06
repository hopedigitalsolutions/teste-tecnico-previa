import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookRepository } from '../repositories/update-book.repository';
import { IBookEntity } from '../interfaces/IBookEntity';

@Injectable()
export class UpdateBookService {
  constructor(private readonly updateBookRepository: UpdateBookRepository) {}

  async execute(id: string, updateData: Partial<IBookEntity>) {
    const updated = await this.updateBookRepository.update(id, updateData);
    if (!updated) throw new NotFoundException('Livro não encontrado');
    return updated;
  }
}