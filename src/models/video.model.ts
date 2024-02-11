import mongoose, { Schema, Document, model, Model, ObjectId } from "mongoose";

interface IVideo extends Document {
  description: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: ObjectId;
}

const videoSchema: Schema<IVideo> = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

interface IVideoModel extends Model<IVideo> {}

export const Video: IVideoModel = model<IVideo, IVideoModel>(
  "Video",
  videoSchema
);
