// given: a Revit door element UniqeId;
// it must obviously be unique in the database.

var unique_id
  = '60f91daf-3dd7-4283-a86d-24137b73f3da-0001fd0b';

var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost/firerating ');

var Schema = mongoose.Schema;

var RvtUniqueId = String;

var Door = new Schema(
  { _id          : RvtUniqueId // suppress automatic generation
    , level      : String
    , tag        : String
    , firerating : Number },
  { _id: false } // suppress automatic generation
);

var DoorModel = mongoose.model( 'Door', Door );

var instance = new DoorModel();
instance._id = unique_id; // new RvtUniqueId(unique_id);
instance.level = 'Level 1';
instance.tag = 'Tag 1';
instance.firerating = 123.45;

instance.save(function (err) {
  console.log( 'save returned err = ' + err );
});
