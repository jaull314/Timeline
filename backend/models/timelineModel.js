import mongoose from 'mongoose';

const timelineSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    time: { type: Number, required: true },
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;