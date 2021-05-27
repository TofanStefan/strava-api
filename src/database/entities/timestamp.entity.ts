import { Column, CreateDateColumn } from "typeorm";

export class TimeStampEntity {
  
    @CreateDateColumn()
    created_at: Date
    
    @CreateDateColumn()
    updated_at: Date
}