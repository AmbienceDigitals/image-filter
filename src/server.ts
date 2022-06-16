import express from 'express';
import bodyParser from 'body-parser';
import {Router, Request, Response} from 'express'
import { FilteredImageRouter } from './filteredImage/routes/filteredImage.router';

(async () => {

  // Init the Express application
  const app = express();
  const users = [];

  // const router: Router = Router();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use('/assets', express.static('assets'));
    app.use(express.urlencoded({extended: false}));

      // Root Endpoint
  // Displays a simple message to the user
  // app.get( "/", async ( req, res ) => {
  //   res.send("Welcome to the Filtered Image Microservice Api \n try GET /filteredimage?image_url={{}}")
  // } );

    app.get('/register', (req, res) => {
          res.render('register.ejs');
      });

    app.get('/login', (req, res) => {
        res.render('login.ejs');
    });

    app.post('/register', (req, res) => {
      try {
          users.push({
              id: Date.now().toString(),
              name: req.body.name,
              password: req.body.password,
              email: req.body.email
          })
          res.redirect('/login');
      } catch {
          res.redirect('/register');
      }
    });

    app.post('/login', (req, res) => {
      try {
          
      } catch {
          
      }
      res.render('index.ejs', {data: req.body});
    });


  app.use('/api/v0', FilteredImageRouter)
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();