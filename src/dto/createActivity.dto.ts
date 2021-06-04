import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateActivityDto{
    @IsNotEmpty() @IsString()
    name: string;
    
    @IsNotEmpty() @IsString()
    type: string;

    @IsNotEmpty() @IsDateString()
    start_date_local: Date;

    @IsNotEmpty()
    elapsed_time: number;

    description?: string;

    distance?: number;

    trainer?: number;

    commute?: number;
}
