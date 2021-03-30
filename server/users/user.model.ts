import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@pre<UserClass>('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
})
export class UserClass {
  @prop({
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return value.length > 5 && value.length < 20;
      },
      message: 'Username must be between 5 and 20 characters',
    },
  })
  public username!: string;

  @prop({ required: true, unique: true, lowercase: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: Date.now() })
  public dateCreated?: Date;

  public checkPassword(passwordToCheck: string) {
    if (bcrypt.compareSync(passwordToCheck, this.password)) return true;
    return false;
  }
}

export const UserModel = getModelForClass(UserClass);
