import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsNotEmpty } from 'class-validator';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @IsNotEmpty()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  username: string;

  @IsNotEmpty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
