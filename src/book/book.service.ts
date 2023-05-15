import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { BookEntity } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private BookEntitysRepository: Repository<BookEntity>,
  ) {}

  findAll(): Promise<BookEntity[]> {
    return this.BookEntitysRepository.find();
  }

  findOne(id: number): Promise<BookEntity | null> {
    return this.BookEntitysRepository.findOneBy({ id });
  }

  // wildcard (like) search for title
  findByTitle(title: string): Promise<BookEntity[]> {
    return this.BookEntitysRepository.find({
      where: {
        title: ILike(`%${title || ''}%`),
      },
    });
  }

  findByIsbn(isbn: string): Promise<BookEntity[]> {
    return this.BookEntitysRepository.findBy({ isbn });
  }

  async remove(id: number): Promise<void> {
    await this.BookEntitysRepository.delete(id);
  }
}
