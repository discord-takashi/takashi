import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
    /**
     * The ID of the user inside discord.
     */
    id: string

    /**
     * The last notification that this user has received.
     */
    last_notification_received: Date
}

const UserSchema = new Schema({
    id: String,
    last_notification_received: Date
})

export default mongoose.model<UserDocument>('User', UserSchema)
