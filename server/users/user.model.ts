import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'supersecret';

@pre<UserClass>('save', async function () {
  if (this.isModified('password')) {
    if (this.password.length < 5)
      throw new Error('Password must be no fewer than 5 characters');

    this.password = await bcrypt.hash(this.password, 8);
  }
})
export class UserClass {
  public _id?: string;

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

  public getJwt() {
    const payload = {
      user: {
        id: this._id,
        username: this.username,
        email: this.email,
      },
    };
    return jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
  }
}

export const UserModel = getModelForClass(UserClass);
