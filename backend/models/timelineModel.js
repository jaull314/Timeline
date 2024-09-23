import mongoose from 'mongoose';

const timelineSchema = mongoose.Schema(
  {
    timelineColor: {type:String, required: true},
    
    timelineName: { type:String, required: true},

    timelineEvents: [
      {
        title: { type: String, required: true },
        timeOfEvent: { type: Number, required: true },
        description: { type: String, required: true }
      }
    ]

  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;