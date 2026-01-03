-- Полная очистка и наполнение базы данных
-- Это удалит всё старое и запишет всё заново БЕЗ ошибок

TRUNCATE quizzes, questions, options, results, quiz_submissions CASCADE;

-- 1. Создаем Квиз
INSERT INTO quizzes (id, slug, title, description, category, image_url)
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'what-dog-breed-are-you', 'What Dog Breed Are You?', 'Discover your inner canine personality with the most accurate dog breed quiz ever made!', 'dogs', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800');

-- 2. Создаем Вопросы
INSERT INTO questions (id, quiz_id, text, order_index) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Imagine it is a rainy Saturday morning. What are you doing?', 0),
('550e8400-e29b-41d4-a716-446655440001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'A stranger approaches you at a party. Your first reaction is...', 1);

-- 3. Создаем Варианты ответов
INSERT INTO options (question_id, text, scores) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Staring out the window!', '{"Golden Retriever": 3, "Border Collie": 1}'),
('550e8400-e29b-41d4-a716-446655440000', 'Curled up in a blanket.', '{"Bulldog": 3, "Basset Hound": 3}'),
('550e8400-e29b-41d4-a716-446655440001', 'New best friend!', '{"Golden Retriever": 3, "Labrador": 3}'),
('550e8400-e29b-41d4-a716-446655440001', 'Polite but cautious.', '{"Shiba Inu": 3, "Akita": 2}');

-- 4. Создаем Результаты
INSERT INTO results (quiz_id, title, personality_type, description, image_url) VALUES 
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Golden Retriever: The Sunshine Friend', 'Golden Retriever', 'You are the ultimate ray of sunshine! Your personality is defined by an overflowing cup of loyalty, kindness, and an almost suspicious amount of optimism.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400');
