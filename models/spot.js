const db = require('../config/database');

// Function to get all songs
exports.title = (callback) => {
    const query = 'SELECT * FROM tbl_spoti';  // Make sure the table name matches your database
    db.query(query, callback);
};

// Function to add a new song
exports.addMusic = (musicData, callback) => {
    const query = 'INSERT INTO tbl_spoti SET ?';  // Insert song data into the database
    db.query(query, musicData, callback);
};

// Function to get a song by ID
exports.MusicById = (musicId, callback) => {
    const query = 'SELECT * FROM tbl_spoti WHERE id = ?';
    db.query(query, [musicId], callback);
};

// Function to update a song by ID
exports.updateMusic = (musicId, updatedMusicData, callback) => {
    const query = 'UPDATE tbl_spoti SET ? WHERE id = ?';
    db.query(query, [updatedMusicData, musicId], callback);
};

// Function to delete a song by ID
exports.deleteMusic = (musicId, callback) => {
    const query = 'DELETE FROM tbl_spoti WHERE id = ?';
    db.query(query, [musicId], callback);
};
