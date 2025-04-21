import { PartialType } from '@nestjs/mapped-types';
import { CreatePropuestaDto } from './create_propuesta.dto';


export class UpdatePropuestaDto extends PartialType(CreatePropuestaDto) {}
