import mongoose, { Schema, Document, model, Model, ObjectId } from "mongoose";

interface IVideo extends Document {
  description: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  duration: number;
  views: number;
  isPublished: boolean;
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
    },
    views: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
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
