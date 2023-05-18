import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  constructor(id: number, title: string, isbn: string) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
  }
}
