// batches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const batches = new Schema({
    number: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    students: [studentSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  const studentSchema = new Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    evaluations:[evaluationSchema],
  });

  const evaluationSchema = new Schema({
    color: { type: Number, required: true },
    remarks: { type: String, required: true },
    evaluations:[evaluationSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('batches', batches);
};
