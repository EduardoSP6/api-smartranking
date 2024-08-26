import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersParamsValidation } from './pipes/players-params-validation.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async store(@Body() inputDto: CreatePlayerDto) {
    await this.playersService.createPlayer(inputDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() inputDto: UpdatePlayerDto,
    @Param('_id', PlayersParamsValidation) _id: string,
  ) {
    await this.playersService.updatePlayer(inputDto, _id);
  }

  @Get()
  async listAllPlayers(): Promise<Player[]> {
    return await this.playersService.listAllPlayers();
  }

  @Get('/:_id')
  async findPlayer(@Param('_id') _id: string): Promise<Player> {
    return await this.playersService.findById(_id);
  }

  @Delete('/:_id')
  async delete(
    @Param('_id', PlayersParamsValidation) _id: string,
  ): Promise<void> {
    this.playersService.delete(_id);
  }
}
