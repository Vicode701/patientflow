import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';


interface FeedbackDocument extends Document {
    _id: string;
    userId: string;
    name: string;
    temperature: Number;
    createdDate: String;
    feedbackText: String;
    timeToSignedNotesWithEdits: String;
    totalDurationOfNoteCompletion: String;
    accuracyOfResponse: String;
    decreaseInNoteRelatedStress: String;
    overallExperience: String;
    caseId: String;
    submittedAt: Date;
    timeToSatisfactoryResponse: String;
  }


// Create a new schema for feedback
const feedbackSchema: Schema = new Schema<FeedbackDocument, {}, {}>({
  feedbackText: {
    type: String,
    required: true,
  },
  timeToSatisfactoryResponse: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  timeToSignedNotesWithEdits: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  totalDurationOfNoteCompletion: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  accuracyOfResponse: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  decreaseInNoteRelatedStress: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  overallExperience: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  userId: {
    type: String,
    required: true
  },
  caseId: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export a model using the schema
const FeedbackModel = models.Feedback || model('Feedback', feedbackSchema);
export default FeedbackModel as Model<FeedbackDocument, {}, {}>;
