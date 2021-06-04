import { IsDate, IsDateString, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateActivityDto{
    @IsNotEmpty() @IsString()
    name: string;
    
    @IsNotEmpty() @IsString()
    type: string;

    @IsNotEmpty() @IsDateString()
    start_date_local: Date;

    @IsNotEmpty() @IsInt()
    elapsed_time: number;

    @IsOptional() @IsString()
    description?: string;

    @IsOptional() @IsNumber()
    distance?: number;

    @IsOptional() @IsInt()
    trainer?: number;

    @IsOptional() @IsInt()
    commute?: number;
}
