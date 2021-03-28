import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@pre<UserClass>('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
})
export class UserClass {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, default: Date.now() })
  public dateCreated!: Date;

  public checkPassword(passwordToCheck: string) {
    if (bcrypt.compareSync(passwordToCheck, this.password)) return true;
    return false;
  }
}

export const UserModel = getModelForClass(UserClass);
