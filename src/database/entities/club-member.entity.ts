import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Club } from "./club.entity";
import { TimeStampEntity } from "./timestamp.entity";

@Entity()
export class ClubMember extends TimeStampEntity{
    @PrimaryColumn('uuid')
    id: number;

    @ManyToOne(type => Club, club => club.id)
    club: Club
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    membership: string;

    @Column()
    admin: boolean;

    @Column()
    owner: boolean;


}