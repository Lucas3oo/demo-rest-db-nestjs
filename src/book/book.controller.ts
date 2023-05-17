import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';

@Controller('api/v1/books')
export class BookController {
  constructor(private readonly service: BookService) {}

  /*
   * If there isn't any match then the framework will return 200 OK.
   */
  @Get()
  readAll(
    @Query('title') titel: string,
    @Query('isbn') isbn: string,
  ): Promise<BookEntity[]> {
    // if query string is empty return all else search for titel or isbn
    if (titel) {
      return this.service.findByTitle(titel);
    } else if (isbn) {
      return this.service.findByIsbn(isbn);
    } else {
      return this.service.findAll();
    }
  }
}
