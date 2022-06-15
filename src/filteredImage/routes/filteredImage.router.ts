import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../util/util';


const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

router.get('/filteredimage/', 
async (req: Request, res: Response) => {
    const {image_url} = req.query;
// using try/catch for error handling
    try {
            // checking if image query exists
    if (!image_url) {
        return res.status(400).send('no image url detected');
    }

    // save image_url to a variable
    const filteredPath = await filterImageFromURL(image_url)

    // using res.sendfile to return the file obtained from the filteredpath
    return res.status(200).sendFile(filteredPath, () => {
        // delete file once thw operation is successfully completed
                deleteLocalFiles([filteredPath]);
    })
    } catch (error) {
        return res.status(500).send("There is an error with the link provided")
    }

})



    export const FilteredImageRouter: Router = router;