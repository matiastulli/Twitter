import mongoose from 'mongoose';
const { Schema } = mongoose;
const { model } = mongoose;
// Se crea el schema de un usuario
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        unique: [true, 'El correo ya existe'],
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function(){
    const {__v, password ,_id, ...User} = this.toObject();
    User.uid = _id;
    return User;
}

export default model('User', UserSchema);