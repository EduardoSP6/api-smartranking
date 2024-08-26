import { Player } from './interfaces/player.interface';
import { CreatePlayerDto } from './dtos/create-player.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async listAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async createPlayer(inputDto: CreatePlayerDto): Promise<Player> {
    const { email } = inputDto;

    if (await this.playerModel.findOne({ email }).exec()) {
      throw new BadRequestException(`O e-mail ${email} já está em uso`);
    }

    const player = new this.playerModel(inputDto);

    return await player.save();
  }

  async updatePlayer(inputDto: UpdatePlayerDto, _id: string): Promise<void> {
    try {
      await this.playerModel.findOneAndUpdate({ _id }, inputDto).exec();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email }).exec();
    if (!player) {
      throw new NotFoundException(`Jogador ${email} não encontrado`);
    }

    return player;
  }

  async findById(id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id: id }).exec();
    if (!player) {
      throw new NotFoundException(`Jogador não encontrado`);
    }

    return player;
  }

  async delete(_id: string): Promise<void> {
    await this.playerModel.deleteOne({ _id }).exec();
  }
}
