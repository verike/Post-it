const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

// User Schema Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [
            true, 'Enter Your Username'
        ],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Minimum username length is 6 characters']
    },
    email: {
        type: String,
        required: [
            true,
            'Enter your email address'
        ],
        unique: true,
        trim: true,
        validate: [
            validator.isEmail,
            'Enter a valid email address'
        ],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        trim: true,
        minlength: [6, 'Minimum password length is 6 characters']
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: 'Confirm the password above'
        }
    },
    posts:  [{
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    }],
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });


// Hashing password with mongoose pre hook
userSchema.pre("save", async function (next) {
    // This only works if the password is modified
    if (!this.isModified("password") && !this.isModified("confirmPassword")) return next();
  
    //Hash the password with cost/salt of 10
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
  
  });

// Method to login user
userSchema.methods.login = async function (email, password) {
    const user = await UserModel.findOne({email: email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password')
    }
    else {
        throw Error('Incorrect email')
    }
}

const UserModel = model('user', userSchema);
module.exports = UserModel;