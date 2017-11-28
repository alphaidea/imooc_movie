'use strict';

const express = require('express');
const path = require('path');
const _ = require('underscore');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Movie = require('./models/movie');

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost/movie');

app.locals.moment = require('moment');
app.set('views', './views/pages');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);

console.log(`movie started on port${port}`);


// index page
app.get('/', (req, res) => {
    Movie.fetch((err, movies) => {
        if (err) {
            console.error(err);
        }
        res.render('index', {
            movies,
            title: "movie 首页"
        })
    });
});

// detail page
app.get('/movie/:id', (req, res) => {
    const {id} = req.params;
    Movie.findById(id, (err, movie) => {
        res.render('detail', {
            movie,
            title: 'movie 详情页'
        })
    });
});

// admin update movie
app.get('/admin/update/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        Movie.findById(id, (err, movie) => {
            res.render('admin', {
                movie,
                title: "movie 后台更新"
            })
        })
    }
});

// admin post movie
app.post('/admin/movie/new', (req, res) => {
    const id = req.body.movie._id;
    const movieObj = req.body.movie;
    let _movie;
    console.error(id, 'llllllllllll');
    if (id !== undefined) {
        Movie.findById(id, (err, movie) => {
            if (err) {
                console.error(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save((err, movie) => {
                if (err) {
                    console.error(err);
                }
                res.redirect(`/movie/${movie._id}`)
            })
        })
    }
    else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });

        _movie.save((err, movie) => {
            if (err) {
                console.error(err);
            }
            res.redirect(`/movie/${movie._id}`)
        })
    }
});

// list page
app.get('/admin/list', (req, res) => {
    Movie.fetch((err, movies) => {
        if (err) {
            console.error(err);
        }
        res.render('list', {
            movies,
            title: "movie 列表页"
        })
    });
});

// list delete movie
app.delete('/admin/list', (req, res) => {
    const {id} = req.query;

    if (id) {
        Movie.remove({
            _id: id
        }, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                res.json({success: 1})
            }
        })
    }
});

// admin page
app.get('/admin/movie', (req, res) => {
    res.render('admin', {
        title: "movie 后台录入页",
        movie: {
            title: "",
            doctor: "",
            country: "",
            year: "",
            language: "",
            summary: "",
            poster: "",
            flash: ""
        }
    })
});