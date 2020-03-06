import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
    /**
     * The ID of the user inside discord.
     */
    id: string
}

const UserSchema = new Schema({
    id: String
})

export default mongoose.model<UserDocument>('User', UserSchema)
