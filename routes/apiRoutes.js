const express = require('express');
const router = express.Router();

const db = require('../models');

// ***GET route api/workouts
router.get('/', async (req, res) => {
    try {
        const result = await db.Workout.find({});
        res.json(result);
    } catch (error) {
        res.status(400).json(err);
    }
});

// ***POST route api/workouts
router.post('/', async ({ body }, res) => {
    try {
        const result = await db.Workout.create(body);
        res.json(result);
    } catch (error) {
        res.status(400).json(err);
    }
});

// ***PUT route api/workouts/workout_id
router.put('/:id', async ({ params, body }, res) => {
    try {
        let savedExercises = [];
        const prevWorkout = await db.Workout.findById(params.id);
        savedExercises = prevWorkout.exercises;
        totalExercises = [...savedExercises, body];
        res.json(totalExercises);
        //Update db
        await db.Workout.findByIdAndUpdate(params.id, { exercises: totalExercises });
    } catch (error) {
        res.status(400).json(err);
    }
});

// ***GET route api/workouts/range
router.get('/range', async (req, res) => {
    try {
        const result = await db.Workout.find({}).sort({ day: -1 }).limit(7);
        res.json(result);
    } catch (error) {
        res.status(400).json(err);
    }
});

//Export router
module.exports = router;