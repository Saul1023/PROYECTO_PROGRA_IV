import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { NewPartidoDto } from './dto/new.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('partidos')
export class PartidosController {
    constructor(private readonly partidosService: PartidosService) {}

    @Get('')
    public index() {
      return this.partidosService.list();
    }
    
    @Get('/search')
    public searchPaginar(
      @Query('page') page:number,
      @Query('limit') limit:number,
      @Query('search') search:string,
    ){
      page = page===undefined?0:page;
      limit = limit===undefined?10:limit;
      console.log("datos",page,limit,search);
      return this.partidosService.searchPaginate(page,limit,search);
    }

    @Post()
    public create(@Body() createPartidoDto: NewPartidoDto) {
      return this.partidosService.create(createPartidoDto);
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }))
    async createWithImage(
      @UploadedFile() file: Express.Multer.File,
      @Body() createPartidoDto: NewPartidoDto
    ) {
      if (file) {
        createPartidoDto.foto = `http://localhost:3000/uploads/${file.filename}`;
      }
      return this.partidosService.create(createPartidoDto);
    }

    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePartidoDto: NewPartidoDto,
    ) {
      return await this.partidosService.edit(id, updatePartidoDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return await this.partidosService.delete(id);
    }
}
