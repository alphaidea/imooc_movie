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

MovieSchema.pre('save', function(next) {
    const now = new Date();
    if (this.isNew) {
        this.meta.createAt = now;
        this.meta.updateAt = now;
    }
    else {
        this.meta.updateAt = now;
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