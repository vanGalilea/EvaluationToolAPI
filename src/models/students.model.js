// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const evaluationSchema = new Schema({
    color: { type: Number, required: true },
    remarks: { type: String },
    authorName:  { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const students = new Schema({
    batchNum: { type: Number },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    evaluations:[evaluationSchema],
  });

  return mongooseClient.model('students', students);
};
