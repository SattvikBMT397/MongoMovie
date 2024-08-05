const {z} = require('zod');

const userSchema = z.object({
   username:z.string().min(4),
    email:z.string().email(),
    password: z.string().min(6)
});
const userSchemaes = z.object({
    email:z.string().email(),
    password: z.string().min(6)
});


const favoriteSchema =z.object({
    imdbID:z.string().min(1)
} )

const commentSchema = z.object({
    userId: z.number().positive().int(),
    imdbID: z.string().min(1),
    comment: z.string().min(1),
    rating: z.number().min(0).max(10),
  });

  module.exports = {
    userSchema,
    favoriteSchema,
    commentSchema,
    userSchemaes
  };