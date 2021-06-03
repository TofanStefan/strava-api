import { IsDate, IsNotEmpty } from 'class-validator';
export class CreateActivityDto{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    type: string;

    @IsNotEmpty() @IsDate()
    start_date_local: Date;

    @IsNotEmpty()
    elapsed_time: number;

    description?: string;

    distance?: number;

    trainer?: number;

    commute?: number;






}