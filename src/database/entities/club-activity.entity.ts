import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Club } from "./club.entity";
import { TimeStampEntity } from "./timestamp.entity";

@Entity()
export class ClubActivity extends TimeStampEntity{
   @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    })
    id: string;

    @Column()
    name: string

    @Column("float8")
    distance : number
    
    @Column()
    type: string
    
    @Column()
    moving_time: number
    
    @Column()
    elapsed_time: number

    @Column()
    total_elevation_gain: number

    @Column({nullable:true})
    workout_type: string

    @Column()
    athlete_firstname: string
    
    @Column()
    athlete_lastname : string

}