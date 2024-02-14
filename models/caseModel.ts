import { Message } from '@/types/chat';
import { OpenAIModel } from '@/types/openai';
import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';

interface CaseDocument extends Document {
  _id: string;
  userId: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  temperature: Number;
  createdDate: String;
}

// Define Message schema
const messageSchema = new Schema<Message>({
  role: {
    type: String,
    enum: ['assistant', 'user'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { _id : false });

// Define OpenAI model schema
const modelSchema = new Schema<OpenAIModel>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  maxLength: {
    type: Number,
    required: false,
  },
  tokenLimit: {
    type: Number,
    required: false,
  }
}, { _id : false });

// Define CaseConversation schema  
const caseSchema: Schema = new Schema<CaseDocument, {}, {}>({
    _id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    messages: {
        type: [messageSchema],
        default: [],
    },
    model: {
        type: modelSchema,
    },
    temperature: {
        type: Number
    },
    createdDate: {
      type: String
  },
}, { _id : false });

// // DOCUMENT MIDDLEWARE: runs before .save() and .create()
// // caseSchema.pre("save", function (next) {
// //   this.slug = slugify(this.name, { lower: true });
// //   next();
// // });

// // caseSchema.pre('save', async function(next) {
// //   const guidesPromises = this.guides.map(async id => await User.findById(id));
// //   this.guides = await Promise.all(guidesPromises);
// //   next();
// // });

// // caseSchema.pre('save', function(next) {
// //   console.log('Will save document...');
// //   next();
// // });

// // caseSchema.post('save', function(doc, next) {
// //   console.log(doc);
// //   next();
// // });

// // QUERY MIDDLEWARE
// // caseSchema.pre('find', function(next) {
// // caseSchema.pre(/^find/, function (next) {
// //   this.find({ secretcase: { $ne: true } });

// //   this.start = Date.now();
// //   next();
// // });

// // caseSchema.pre(/^find/, function (next) {
// //   this.populate({
// //     path: "guides",
// //     select: "-__v -passwordChangedAt",
// //   });

// //   next();
// // });

// // caseSchema.post(/^find/, function(docs, next) {
// //   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
// //   next();
// // });

// // AGGREGATION MIDDLEWARE
// // caseSchema.pre('aggregate', function(next) {
// //   this.pipeline().unshift({ $match: { secretcase: { $ne: true } } });

// //   console.log(this.pipeline());
// //   next();
// // });

// const Case = mongoose.model("Case", caseSchema);

// module.exports = Case;

const CaseConversationModel = models.Case || model("Case", caseSchema);

export default CaseConversationModel as Model<CaseDocument, {}, {}>;