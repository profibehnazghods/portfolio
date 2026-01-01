import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

type StoredContact = CreateContactDto & { id: string; createdAt: string };

@Injectable()
export class ContactService {
  private readonly items: StoredContact[] = [];

  create(dto: CreateContactDto): StoredContact {
    const item: StoredContact = {
      ...dto,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.items.unshift(item);
    return item;
  }

  findAll(): StoredContact[] {
    return this.items;
  }
}
