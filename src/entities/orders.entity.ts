import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'


@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    Id: number;
  
    @Column('numeric', { precision: 78, scale: 0 })
    OrdersId: number;
  
    @Column('numeric', { precision: 78, scale: 0 })
    AmountA: number;
  
    @Column('numeric', { precision: 78, scale: 0 })
    AmountB: number;
  
    @Column('char', { length: 42 })
    TokenA: string;
  
    @Column('char', { length: 42 })
    TokenB: string;
  
    @Column('char', { length: 42 })
    UserAddres: string;
  
    @Column('boolean')
    IsActive: boolean;
}