import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ClubActivity } from "./club-activity.entity";
import { ClubMember } from "./club-member.entity";

@Entity()
export class Club {
    @PrimaryColumn()
    id: number;

    @OneToMany(type=> ClubMember, clubMember=> clubMember.club,{
        cascade: true
    })
    members: ClubMember[]

     @OneToMany(type=> ClubActivity, clubActivity=> clubActivity.club,{
        cascade: true
    })
    activities: ClubActivity[]

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({nullable:true})
    club_type: string;

    @Column()
    sport_type: string;

    @Column({nullable:true})
    profile: string;

    @Column()
    city: string;

    @Column({nullable:true})
    state: string;

    @Column({nullable:true})
    country: string;

    @Column({nullable:true})
    member_count: number;

    // club -> club activities relationship to be done 

}