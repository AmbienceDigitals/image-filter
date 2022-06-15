import express from 'express';
import bodyParser from 'body-parser';
import {Router, Request, Response} from 'express'
import { FilteredImageRouter } from './filteredImage/routes/filteredImage.router';

(async () => {

  // Init the Express application
  const app = express();

  // const router: Router = Router();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.use('/api/v0', FilteredImageRouter)
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Welcome to the Filtered Image Microservice Api \n try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();