const spot = require('../models/spot');

// Get all songs and render the homepage
exports.title = (req, res) => {
    spot.getMusic((err, results) => {
        if (err) {
            console.error('Error fetching music: ', err);
            return res.status(500).send('Error fetching music');
        }
        // Render the index.ejs and pass the songs data to the template
        res.render('index', { 
            title: 'Audio Player Example', 
            tracks: results  // Pass the songs fetched from the database
        });
    });
};

// Show the form to upload a new song
exports.showUpload = (req, res) => {
    res.render('upload');  // Make sure you have this view in your views folder
};

// Add a new song
exports.addMusic = (req, res) => {
    const musicData = {
        title: req.body.title,
        artist: req.body.artist,
        image_url: req.files['image_cover'][0].path,  // Get cover image path
        songs_url: req.files['songFile'][0].path  // Get song file path
    };

    spot.addMusic(musicData, (err, result) => {
        if (err) {
            console.error('Error adding music: ', err);
            return res.status(500).send('Error adding music');
        }
        res.redirect('/');  // Redirect to the home page after upload
    });
};

// Get a song by ID for editing
exports.getMusicById = (req, res) => {
    const musicId = req.params.id;

    spot.getMusicById(musicId, (err, result) => {
        if (err) {
            console.error('Error fetching music by ID: ', err);
            return res.status(500).send('Error fetching music by ID');
        }
        res.render('editForm', { music: result[0] });  // Render the edit form, passing the song data
    });
};

// Update an existing song
exports.updateMusic = (req, res) => {
    const musicId = req.params.id;
    const updatedMusicData = {
        title: req.body.title,
        artist: req.body.artist,
        image_url: req.body.image_url,  // This should be handled similarly for edit functionality
        songs_url: req.file ? req.file.path : req.body.songs_url  // Use new file if uploaded
    };

    spot.updateMusic(musicId, updatedMusicData, (err, result) => {
        if (err) {
            console.error('Error updating music: ', err);
            return res.status(500).send('Error updating music');
        }
        res.redirect('/');
    });
};

// Delete a song
exports.deleteMusic = (req, res) => {
    const musicId = req.params.id;

    spoti.deleteMusic(musicId, (err, result) => {
        if (err) {
            console.error('Error deleting music: ', err);
            return res.status(500).send('Error deleting music');
        }
        res.redirect('/');
    });
};
