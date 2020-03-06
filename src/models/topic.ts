import mongoose, { Schema, Document, Types } from 'mongoose'

import { UserDocument } from './user'

export interface TopicDocument extends Document {
    /**
     * The ID of the topic.
     */
    id: string

    /**
     * The name of the topic.
     */
    name: string

    /**
     * The user subscribed to the topic.
     */
    subscribers: UserDocument[]
}

const TopicSchema = new Schema({
    id: String,
    name: String,
    subscribers: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
})

export default mongoose.model<TopicDocument>('Topic', TopicSchema)
