import { z } from 'zod';

export const profileSchema = z.object({
  display_name: z.string().min(2, 'Display name must be at least 2 characters').max(50, 'Display name must be under 50 characters').optional(),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
  avatar_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const createPostSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be under 100 characters'),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(2000, 'Content must be under 2000 characters'), // Increased limit a bit, but kept safe
  image_url: z.string().url().optional().or(z.literal('')),
});

export const createCommentSchema = z.object({
  content: z.string()
    .min(1, 'Comment cannot be empty')
    .max(500, 'Comment must be under 500 characters'),
  post_id: z.string().uuid(),
  parent_id: z.string().uuid().optional(),
});
