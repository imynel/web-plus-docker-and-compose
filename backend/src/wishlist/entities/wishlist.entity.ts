import { MainEntity } from 'src/entities/main.entities';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends MainEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists, { cascade: true })
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];
}
