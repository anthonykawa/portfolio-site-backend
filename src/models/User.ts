import mongoose, {
    Schema,
    model,
    Document,
    PassportLocalDocument,
    PassportLocalSchema,
    PassportLocalModel,
    PassportLocalOptions,
    PassportLocalErrorMessages,
} from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

//#region Test Models
interface User extends PassportLocalDocument {
    _id: string;
    username: string;
    hash: string;
    salt: string;
    attempts: number;
    last: Date;
}

const options: PassportLocalOptions = {} as PassportLocalOptions;
options.iterations = 25000;
options.keylen = 512;
options.digestAlgorithm = 'sha256';
options.interval = 100;
options.usernameField = 'username';
options.usernameUnique = true;
options.usernameLowerCase = true;
options.hashField = 'hash';
options.saltField = 'salt';
options.saltlen = 32;
options.attemptsField = 'attempts';
options.lastLoginField = 'last';
options.selectFields = 'undefined';
options.populateFields = 'undefined';
options.encoding = 'hex';
options.limitAttempts = false;
options.maxAttempts = Infinity;
// options.passwordValidator = (password: string, cb: (err: any) => void): void => {};
options.usernameQueryFields = [];

const errorMessages: PassportLocalErrorMessages = {};
errorMessages.MissingPasswordError = 'No password was given';
errorMessages.AttemptTooSoonError = 'Account is currently locked. Try again later';
errorMessages.TooManyAttemptsError = 'Account locked due to too many failed login attempts';
errorMessages.NoSaltValueStoredError = 'Authentication not possible. No salt value stored';
errorMessages.IncorrectPasswordError = 'Password or username are incorrect';
errorMessages.IncorrectUsernameError = 'Password or username are incorrect';
errorMessages.MissingUsernameError = 'No username was given';
errorMessages.UserExistsError = 'A user with the given username is already registered';

mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const UserSchema = new Schema({
    username: String,
    password: String,
}) as PassportLocalSchema;

options.errorMessages = errorMessages;
UserSchema.plugin(passportLocalMongoose, options);

interface UserModel<T extends Document> extends PassportLocalModel<T> {}

// UserDetails.register({ username: 'candy', active: false }, 'cane');
// UserDetails.register({ username: 'starbuck', active: false }, 'redeye');

const UserModel: UserModel<User> = mongoose.model<User>('userData', UserSchema, 'userData');

export default UserModel;