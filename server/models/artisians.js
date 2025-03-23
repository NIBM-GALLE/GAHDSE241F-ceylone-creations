import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const artistSchema = new mongoose.Schema({
    firstname: String, 
    email: { type: String, unique: true,}, // Enforce unique email
    password: { type: String,}, // Ensure password is required
    confirmPassword:{ type: String,},
    phone: { type: String, unique: true,  }, // Enforce unique phone
    role:{type: String,  default: 'artist'},
    address: String, 
    profilepicture: String 
});


artistSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

artistSchema.pre("save", async function (next){
    if(!this.isModified("confirmPassword")) return next();

    try{
       const salt = await bcrypt.genSalt(10);
       this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
       next();
    }
    catch(err)
    {
        return next(err);
    }
})

//  Add a method to compare passwords during login
artistSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
