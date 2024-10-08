const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  eventId: { type: String, unique: true, required: true },
  title: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  link: { type: String },
  imageSrc: { type: String },
  tags: [{ type: String }],
  interestedPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

eventSchema.virtual('interestedPeopleCount').get(function () {
  return this.interestedPeople.length;
});

const Event = model('Event', eventSchema);

module.exports = Event;
