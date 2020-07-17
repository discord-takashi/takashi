import mongoose, { Schema, Document } from 'mongoose'

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
     * The description of the topic.
     */
    description: string

    /**
     * The provider of the topic.
     */
    provider: string

    /**
     * When the topic is airs.
     */
    airsAt: number

    /**
     * The user subscribed to the topic.
     */
    subscribers: UserDocument[]

    /**
     * The properties that will used to send the message.
     */
    properties: any
}

const TopicSchema = new Schema({
    id: String,
    name: {
        type: String,
        index: { type: 'text' }, // adds a "searchable" trait to this property
    },
    description: String,
    provider: String,
    airsAt: Number,
    properties: Object,
    subscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
})

export default mongoose.model<TopicDocument>('Topic', TopicSchema)
