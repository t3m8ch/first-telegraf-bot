import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "todo" })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  text: string;

  @Column({ default: false })
  isCompleted: boolean;
}
