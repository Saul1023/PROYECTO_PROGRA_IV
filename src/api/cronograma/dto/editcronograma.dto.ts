import { PartialType } from '@nestjs/mapped-types';
import { NewCronogramaDto } from './newcronograma.dto';


export class EditCronogramaDto extends PartialType(NewCronogramaDto) {}
