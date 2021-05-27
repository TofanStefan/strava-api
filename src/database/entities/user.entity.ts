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

   
    // for updating access token
    constructor(expires_at: number, expires_in: number, token_type: string,
                refresh_token: string, access_token: string) {
        super();
        this.expires_at = expires_at;
        this.expires_in = expires_in;
        this.token_type = token_type;
        this.refresh_token = refresh_token;
        this.access_token = access_token;

    }
}
