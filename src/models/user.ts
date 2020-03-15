import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
    /**
     * The ID of the user inside discord.
     */
    id: string

    /**
     * The language of the user.
     */
    language: string

    /**
     * The last notification that this user has received.
     */
    last_notification_received: Date
}

const UserSchema = new Schema({
    id: String,
    last_notification_received: Date,
    language: {
        type: String,
        default: 'en_US'
    }
})

export default mongoose.model<UserDocument>('User', UserSchema)
