import { Router } from 'express';
import {
  createPost,
  deletePost,
  getUserPost,
  getUserPosts,
  searchPosts,
  updatePost,
} from '../services/post';
import { uploadImages } from '../services/blob';
import multer from 'multer';
import { body } from 'express-validator';
import { handleInputErrors } from '../modules/errorHandling';

var upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.get('/post/:id', getUserPost);
router.get('/user-posts', getUserPosts);
router.post('/post', handleInputErrors, createPost);
// router.post('/search-post', searchPosts);
router.put('/post/:id', updatePost);
router.delete('/post', deletePost);

router.post('/blob', upload.array('image'), uploadImages);

export default router;
