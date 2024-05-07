import { MainEntity } from 'src/entities/main.entities';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends MainEntity {
  @Column()
  amount: number;

  @Column({ default: true })
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers, { cascade: true })
  item: Wish;
}
