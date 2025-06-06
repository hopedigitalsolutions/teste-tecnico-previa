import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteBookRepository } from '../repositories/delete-book.repository';

@Injectable()
export class DeleteBookService {
  constructor(private readonly deleteBookRepository: DeleteBookRepository) {}

  async execute(id: string) {
    const deleted = await this.deleteBookRepository.delete(id);
    if (!deleted) throw new NotFoundException('book not found');
    return deleted;
  }
}   