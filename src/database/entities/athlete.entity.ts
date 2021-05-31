import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Activity } from "./activity.entity";
import { TimeStampEntity } from "./timestamp.entity";
@Entity()
export class Athlete extends TimeStampEntity{
    @PrimaryColumn()
    id: number;


    @OneToMany(type=> Activity, activity=> activity.athlete,{
        cascade: true
    })
    activities: Activity[]
    
    @Column({nullable : true})
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable : true})
    profile: string;

    @Column({ nullable: true })
    profile_medium: string;

    @Column({ nullable: true })
    city: string;
    
    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    sex: string;

    @Column("float4",{nullable : true})
    weight: number;

    @Column()
    follower_count: number;

    @Column()
    friend_count: number;

    @Column({ nullable: true })
    biggest_ride_distance: number;

    @Column({ nullable: true })
    biggest_climb_elevation_gain: number;



}