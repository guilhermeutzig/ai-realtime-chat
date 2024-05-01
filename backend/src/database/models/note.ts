import mongoose, { Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  date: Date;
}

const schema: mongoose.SchemaDefinition<INote> = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
};

const collectionName: string = "notes";
const noteSchema: mongoose.Schema = new mongoose.Schema(schema);

const Note = (connection: mongoose.Connection): mongoose.Model<INote> => {
  return connection.model<INote>(collectionName, noteSchema);
};

export default Note;
