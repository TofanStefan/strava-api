import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Athlete } from "./athlete.entity";
import { TimeStampEntity } from "./timestamp.entity";

@Entity()
export class Activity extends TimeStampEntity{
    @PrimaryColumn()
    id: number
    
    @ManyToOne(type => Athlete, athlete => athlete.id)
    athlete: Athlete;
    
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
    start_date: Date

    @Column()
    start_date_local: Date

    @Column({nullable:true})
    start_latlng: string

    @Column({nullable:true})
    end_latlng: string

    @Column({nullable:true})
    location_city: string

    @Column({nullable:true})
    location_state: string

    @Column({nullable:true})
    location_country: string

    @Column({nullable:true})
    achievement_count: number

    @Column({nullable:true})
    kudos_count: number

    @Column({nullable:true})
    comment_count: number

    @Column({nullable:true})
    athlete_count: number

    @Column()
    photo_count: number

    @Column()
    trainer: boolean

    @Column()
    commute: boolean

    @Column()
    private: boolean

    @Column()
    flagged: boolean

    @Column({nullable : true})
    gear_id: number

    @Column()
    from_accepted_tag: boolean

    @Column("float8",{nullable : true})
    average_speed: number

    @Column("float8",{nullable : true})
    max_speed: number

    @Column("float8",{nullable : true})
    average_cadence: number

    @Column("float8",{nullable : true})
    average_watts: number

    @Column("float8",{nullable : true})
    weighted_average_watts: number

    @Column("float8",{nullable : true})
    kilojoules: number

    @Column()
    device_watts: boolean

    @Column()
    has_heartrate: boolean

    @Column("float8",{nullable : true})
    average_heartrate: number
    
    @Column("float8",{nullable : true})
    max_heartrate: number

    @Column("float8",{nullable : true})
    max_watts: number

    @Column()
    pr_count: number

    @Column()
    total_photo_count: number

    @Column()
    has_kudoed: boolean

    @Column()
    suffer_score: number





}
