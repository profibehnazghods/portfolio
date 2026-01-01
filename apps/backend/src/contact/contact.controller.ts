import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
