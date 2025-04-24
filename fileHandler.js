const fs = require('fs');
const path = require('path');

// Define data file paths
const dataDir = path.join(__dirname, 'data');
const moviesFile = path.join(dataDir, 'movies.json');
const seriesFile = path.join(dataDir, 'series.json');
const songsFile = path.join(dataDir, 'songs.json');

// Initial data
const initialData = {
    movies: [
        { id: 1, title: "Sicario", year: 2015, director: "Denis Villeneuve", genre: "Crime" },
        { id: 2, title: "Arrival", year: 2016, director: "Denis Villeneuve", genre: "Sci-Fi" },
        { id: 3, title: "Gattaca", year: 1997, director: "Andrew Niccol", genre: "Sci-Fi" },
        { id: 4, title: "Sky Blue", year: 2003, director: "Moon-saeng Kim", genre: "Animation" },
        { id: 5, title: "The Matrix", year: 1999, director: "Wachowski Sisters", genre: "Sci-Fi" }
    ],
    series: [
        { id: 1, title: "Black Mirror", seasons: 6, creator: "Charlie Brooker", genre: "Sci-Fi" },
        { id: 2, title: "Billions", seasons: 7, creator: "Brian Koppelman, David Levien, Andrew Ross Sorkin", genre: "Drama" },
        { id: 3, title: "Succession", seasons: 4, creator: "Jesse Armstrong", genre: "Drama" },
        { id: 4, title: "Vikings", seasons: 6, creator: "Michael Hirst", genre: "Historical Drama" },
        { id: 5, title: "Silo", seasons: 1, creator: "Graham Yost", genre: "Sci-Fi" }
    ],
    songs: [
        { id: 1, title: "Jerusalema", artist: "Master KG ft. Nomcebo Zikode", year: 2019, genre: "House" },
        { id: 2, title: "Drive", artist: "Black Coffee & David Guetta ft. Delilah Montagu", year: 2018, genre: "House" },
        { id: 3, title: "Banomoya", artist: "Prince Kaybee ft. Busiswa & TNS", year: 2018, genre: "House" },
        { id: 4, title: "You Need Me", artist: "Black Coffee ft Sun El Musician, Maxine Ashley ", year: 2021, genre: "House" },
        { id: 5, title: "Umlilo", artist: "DJ Zinhle ft. Mvzzle & Rethabile", year: 2019, genre: "House" }
    ]
};

// Function to initialize data files
function initializeDataFiles() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(moviesFile)) {
        fs.writeFileSync(moviesFile, JSON.stringify(initialData.movies, null, 2));
    }

    if (!fs.existsSync(seriesFile)) {
        fs.writeFileSync(seriesFile, JSON.stringify(initialData.series, null, 2));
    }

    if (!fs.existsSync(songsFile)) {
        fs.writeFileSync(songsFile, JSON.stringify(initialData.songs, null, 2));
    }

    console.log('Data files initialized successfully');
}

// Function to get all items from a file
function getAllItems(type) {
    try {
        const filePath = getFilePath(type);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${type} data:`, error);
        return [];
    }
}

// Function to add a new item
function addItem(type, newItem) {
    try {
        const items = getAllItems(type);
        const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
        newItem.id = maxId + 1;
        
        items.push(newItem);
        
        const filePath = getFilePath(type);
        fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
        
        return items;
    } catch (error) {
        console.error(`Error adding ${type}:`, error);
        return [];
    }
}

// Function to update an item
function updateItem(type, itemId, updatedData) {
    try {
        const items = getAllItems(type);
        const index = items.findIndex(item => item.id === itemId);
        
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedData, id: items[index].id };
            
            const filePath = getFilePath(type);
            fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
            
            return items;
        }
        return null; // Item not found
    } catch (error) {
        console.error(`Error updating ${type}:`, error);
        return null;
    }
}

// Function to delete an item
function deleteItem(type, itemId) {
    try {
        const items = getAllItems(type);
        const index = items.findIndex(item => item.id === itemId);
        
        if (index !== -1) {
            items.splice(index, 1);
            
            const filePath = getFilePath(type);
            fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
            
            return items;
        }
        return null; // Item not found
    } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        return null;
    }
}

// Helper function to get the file path for a given data type
function getFilePath(type) {
    switch (type) {
        case 'movies':
            return moviesFile;
        case 'series':
            return seriesFile;
        case 'songs':
            return songsFile;
        default:
            throw new Error(`Unknown data type: ${type}`);
    }
}

module.exports = {
    initializeDataFiles,
    getAllItems,
    addItem,
    updateItem,
    deleteItem
};