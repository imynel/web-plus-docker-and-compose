import { MainEntity } from 'src/entities/main.entities';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Wish extends MainEntity {
  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number; // с округлением до сотых

  @Column({ default: 0 })
  raised: number; // с округлением до сотых

  @Column()
  description: string;

  @Column({ default: 0 })
  copied: number; // целое десятичное число

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists: Wishlist[];
}
