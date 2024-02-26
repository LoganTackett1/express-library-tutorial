const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type:String,required:true,maxLength:100},
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = this.first_name + " " + this.family_name;
    }
    return fullname;
});

AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("dob_formatted").get(function () {
    if (this.date_of_birth) {
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    } else {
        return "?";
    }
});

AuthorSchema.virtual("dob_form").get(function () {
    if (this.date_of_birth) {
        const date = DateTime.fromJSDate(this.date_of_birth);
        const year = date.toLocaleString({year:"numeric"});
        const month = date.toLocaleString({month:"2-digit"});
        const day = date.toLocaleString({day:"2-digit"});
        return year + "-" + month + "-" + day;
    } else {
        return "?";
    }
});

AuthorSchema.virtual("dod_formatted").get(function () {
    if (this.date_of_death) {
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    } else {
        return "?";
    }
});

AuthorSchema.virtual("dod_form").get(function () {
    if (this.date_of_death) {
        const date = DateTime.fromJSDate(this.date_of_death);
        const year = date.toLocaleString({year:"numeric"});
        const month = date.toLocaleString({month:"2-digit"});
        const day = date.toLocaleString({day:"2-digit"});
        return year + "-" + month + "-" + day;
    } else {
        return "?";
    }
});

module.exports = mongoose.model("Author", AuthorSchema);