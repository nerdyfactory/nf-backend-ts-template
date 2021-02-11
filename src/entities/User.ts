/*
 * @format
 */
import { Entity, Column, Index } from "typeorm";
import { Base } from "src/entities";
import { getJWT, getHash, compareHash, verifyJWT } from "src/lib/encryption";

@Entity()
export class User extends Base {
  static findByToken(token: string): Promise<User> {
    if (!token || token.length === 0) {
      return Promise.resolve(null);
    }
    let payload: { id: string };
    try {
      payload = verifyJWT(token) as any;
    } catch (e) {
      console.warn(Promise.resolve(null));
    }
    const { id } = payload;
    if (!id) {
      return Promise.resolve(null);
    }
    return User.findOne(id);
  }

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  encryptedPassword: string;

  set password(password: string) {
    this.encryptedPassword = getHash(password);
  }

  comparePassword(plainString: string): boolean {
    return compareHash(plainString, this.encryptedPassword);
  }

  get jwt(): string {
    if (!this.id) {
      return;
    }
    return getJWT({ id: this.id });
  }
}
