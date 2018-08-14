import {ApiModelProperty} from "@nestjs/swagger";
import { IsString, ValidateNested } from 'class-validator';
import {JokeDto} from "./joke.dto";

export class UpdateJokerDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty({type: JokeDto, isArray: true, required: false})
    @ValidateNested()
    readonly jokes?: JokeDto[];
}