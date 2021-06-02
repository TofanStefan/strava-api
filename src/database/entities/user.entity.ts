import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Athlete } from './athlete.entity';
import { TimeStampEntity } from './timestamp.entity'
@Entity()
export class User  extends TimeStampEntity {
    @PrimaryGeneratedColumn("uuid")
    id : number;

    @Column()
    token_type: string;

    @Column()
    access_token: string;

    @Column()
    refresh_token: string;

    @Column()
    expires_at: number;

    @Column()
    expires_in: number;

    @OneToOne(() => Athlete,{cascade:true})
    @JoinColumn()
    athlete : Athlete


    @Column({nullable:true})
    belongs_assist_club: boolean;
}
