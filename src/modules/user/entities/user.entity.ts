import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { AUTH_CONSTANT } from '@lib/constants';
import { hash } from 'bcryptjs';
import * as randomstring from 'randomstring';
import { Uuid, UuidTransformer } from '@lib/utils';
import { IUserParams, IUser, UserStatus, UserRole } from '@lib/types';

@Entity({ name: `user` })
export class User implements IUser {
  constructor(params?: IUserParams) {
    if (params) {
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.email = params.email;
      if (params.status) this.setStatus(params.status);
    }
  }

  // PrimaryGeneratedColumn decorator create error it store in uuid but return string
  // which cause in cassandra that's why we are using transformer feature
  @PrimaryColumn(`uuid`, {
    transformer: UuidTransformer,
  })
  readonly id: Uuid = new Uuid();

  @Column({
    length: 30,
    nullable: false,
  })
  userName: string;

  @Column({
    length: 30,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 30,
    nullable: false,
  })
  lastName: string;

  @Index()
  @Column({
    length: 100,
    nullable: false,
  })
  readonly email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  salt?: string;

  @Column({
    type: `enum`,
    enum: UserStatus,
    default: UserStatus.UNVERIFIED,
  })
  status: UserStatus = UserStatus.UNVERIFIED;

  @Column({
    type: `enum`,
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole = UserRole.MEMBER;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  // Methods
  setStatus(status: UserStatus) {
    this.status = status;
  }

  async setPassword(password: string) {
    this.salt = randomstring.generate({
      length: AUTH_CONSTANT.USER_PASS_SALT_LENGTH,
      charset: `alphanumeric`,
    });
    this.password = await hash(password + this.salt, 12);
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }
}
