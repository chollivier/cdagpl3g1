// Chargement d'express
const express = require('express');
const app = express();

// Définition de pug comme moteur de template 
app.set('view engine', 'pug');

// Servir des fichiers statiques 
app.use(express.static(__dirname + '/public'));

// Paramètres de connexion à mongoDb
const dbName = "cdapgl3g1";
const collectionName = "activites";
const dbUrl = "mongodb://localhost:27017/";
const mongoClient = require("mongodb").MongoClient;

// Gestion des routes
// J'aimerais avoir 2 routes : une page d'accueil qui va lister les événements et une page carte qui va afficher les événements sur une carte

// Accueil 
app.get('/', function (req, res) {
    console.log("Page index");

    // Connexion et requete à Mongo
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, function(err, client){
        if(err){
            throw err;
        }
        const collection = client.db(dbName).collection(collectionName);
        collection.find({"fields.date_start" : { $gte : new Date().toISOString()}}).sort({ "fields.date_start": 1 }).toArray(function(err, data){
            if(err){
                throw err;
            }
            // Si je n'ai d'erreur lors de ma requête, je rends le template index en lui passant mes data
            res.render('index', { activites : data });
        })
    })
})

// Carte 
app.get('/carte', function (req, res) {
    console.log("Page carte");
    // Connexion et requete à Mongo
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, function(err, client){
        if(err){
            throw err;
        }
        const collection = client.db(dbName).collection(collectionName);
        // Je ne prends que les activités dont la date est supérieure à celle d'aujourd'hui
        collection.find({"fields.date_start" : { $gte : new Date().toISOString()}}).toArray(function(err, data){
            if(err){
                throw err;
            }
            // Si je n'ai d'erreur lors de ma requête, je rends le template carte en lui passant mes data
            res.render('carte', { activites : data });
        })
    })
})

// Carte 2
app.get('/carte2', function (req, res) {
    console.log("Page carte");
    // Connexion et requete à Mongo
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, function(err, client){
        if(err){
            throw err;
        }
        const collection = client.db(dbName).collection(collectionName);
        // Je ne prends que les activités dont la date est supérieure à celle d'aujourd'hui
        collection.find({"fields.date_start" : { $gte : new Date().toISOString()}}).toArray(function(err, data){
            if(err){
                throw err;
            }
            // Si je n'ai d'erreur lors de ma requête, je rends le template carte en lui passant mes data
            res.render('carte2', { activites : data });
        })
    })
})

// Démarrage de notre app
app.listen(4567, function(){
    console.log("App started at http://localhost:4567");
})