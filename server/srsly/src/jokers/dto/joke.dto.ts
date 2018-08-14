import {ApiModelProperty} from "@nestjs/swagger";
import { IsString, IsDate } from 'class-validator';

export class JokeDto {
    @ApiModelProperty()
    @IsString()
    readonly id: string;
    @ApiModelProperty()
    @IsString()
    readonly joke: string;
    @ApiModelProperty()
    @IsString()
    readonly context: string;
    @ApiModelProperty({type: Date})
    @IsDate()
    readonly date: Date;
}