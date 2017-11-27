'use strict';

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

MovieSchema.pre('save', (next) => {
    const self = this;
    const now = new Date();
    if (self.isNew) {
        self.meta.createAt = now;
        self.meta.updateAt = now;
    }
    else {
        self.meta.updateAt = now;
    }
    next();
});

MovieSchema.statics = {
    fetch(callback) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(callback)
    },
    findById(id, callback) {
        return this
            .findOne({_id: id})
            .exec(callback)
    }
};

module.exports = MovieSchema;