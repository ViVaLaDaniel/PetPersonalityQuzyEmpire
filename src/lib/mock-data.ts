import { Quiz } from '@/types/quiz';

export const mockDogQuiz: Quiz = {
  id: 'dog-breed-quiz-id',
  slug: 'what-dog-breed-are-you',
  title: 'What Dog Breed Are You?',
  description: 'Discover your inner canine personality with the most accurate dog breed quiz ever made!',
  category: 'dogs',
  image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800',
  viral_score: 1250,
  questions: [
    {
      id: 'q1',
      quiz_id: 'dog-breed-quiz-id',
      text: 'Imagine it is a rainy Saturday morning. What are you doing?',
      image_url: null,
      order_index: 0,
      options: [
        { id: 'o1-1', question_id: 'q1', text: 'Staring out the window, waiting for the sun to come out and play!', scores: { 'Golden Retriever': 3, 'Border Collie': 1 } },
        { id: 'o1-2', question_id: 'q1', text: 'Curled up in the softest blanket I can find, not moving for 5 hours.', scores: { 'Bulldog': 3, 'Basset Hound': 3, 'Pug': 2 } },
        { id: 'o1-3', question_id: 'q1', text: 'Organizing my bookshelf or planning next week’s activities.', scores: { 'Poodle': 3, 'German Shepherd': 2 } },
        { id: 'o1-4', question_id: 'q1', text: 'Barking at the raindrops hitting the glass.', scores: { 'Chihuahua': 3, 'Jack Russell': 2 } }
      ]
    },
    {
      id: 'q2',
      quiz_id: 'dog-breed-quiz-id',
      text: 'A stranger approaches you at a party. Your first reaction is...',
      image_url: null,
      order_index: 1,
      options: [
        { id: 'o2-1', question_id: 'q2', text: 'New best friend! I’m practically vibrating with excitement.', scores: { 'Golden Retriever': 3, 'Labrador': 3 } },
        { id: 'o2-2', question_id: 'q2', text: 'Polite but cautious. You have to earn my trust.', scores: { 'Shiba Inu': 3, 'Akita': 2 } },
        { id: 'o2-3', question_id: 'q2', text: 'Who invited this person? I’m keeping a close eye on them.', scores: { 'German Shepherd': 3, 'Rottweiler': 2 } },
        { id: 'o2-4', question_id: 'q2', text: 'I’m already hiding behind the snacks.', scores: { 'Greyhound': 2, 'Chihuahua': 1 } }
      ]
    },
    {
      id: 'q3',
      quiz_id: 'dog-breed-quiz-id',
      text: 'What is your relationship with "rules"?',
      image_url: null,
      order_index: 2,
      options: [
        { id: 'o3-1', question_id: 'q3', text: 'Rules are suggestions. I follow them when they’re convenient.', scores: { 'Husky': 3, 'Beagle': 2 } },
        { id: 'o3-2', question_id: 'q3', text: 'I thrive on structure. Tell me what to do and I’ll do it perfectly.', scores: { 'German Shepherd': 3, 'Border Collie': 3 } },
        { id: 'o3-3', question_id: 'q3', text: 'Rules? I didn’t even know there were rules. I was looking at a squirrel.', scores: { 'Golden Retriever': 2, 'Boxer': 2 } }
      ]
    },
    {
      id: 'q4',
      quiz_id: 'dog-breed-quiz-id',
      text: 'Choose a lunch style:',
      image_url: null,
      order_index: 3,
      options: [
        { id: 'o4-1', question_id: 'q4', text: 'A quick protein bar while I work out or run errands.', scores: { 'Border Collie': 3, 'Greyhound': 2 } },
        { id: 'o4-2', question_id: 'q4', text: 'A fancy three-course meal with the best ingredients.', scores: { 'Poodle': 3, 'Afghan Hound': 3 } },
        { id: 'o4-3', question_id: 'q4', text: 'Whatever is in the fridge. I’m not picky.', scores: { 'Labrador': 3, 'Mutt': 2 } }
      ]
    },
    {
      id: 'q5',
      quiz_id: 'dog-breed-quiz-id',
      text: 'How do you handle conflict or arguments?',
      image_url: null,
      order_index: 4,
      options: [
        { id: 'o5-1', question_id: 'q5', text: 'I stand my ground and make my voice heard!', scores: { 'Chihuahua': 3, 'Terrier': 2 } },
        { id: 'o5-2', question_id: 'q5', text: 'I try to mediate and make everyone happy again.', scores: { 'Golden Retriever': 3, 'Cavalier King Charles': 2 } },
        { id: 'o5-3', question_id: 'q5', text: 'I just walk away. It’s not worth my energy.', scores: { 'Shiba Inu': 3, 'Greyhound': 2 } }
      ]
    },
    {
      id: 'q6',
      quiz_id: 'dog-breed-quiz-id',
      text: 'Your favorite type of weather is...',
      image_url: null,
      order_index: 5,
      options: [
        { id: 'o6-1', question_id: 'q6', text: 'Snowy and freezing! I love the cold.', scores: { 'Husky': 3, 'Samoyed': 3, 'Saint Bernard': 2 } },
        { id: 'o6-2', question_id: 'q6', text: 'Sunny and hot. Perfect for a long nap in the sun.', scores: { 'Bulldog': 2, 'Chihuahua': 3 } },
        { id: 'o6-3', question_id: 'q6', text: 'Crisp autumn air. Perfect for a long walk.', scores: { 'Border Collie': 2, 'Labrador': 2 } }
      ]
    },
    {
      id: 'q7',
      quiz_id: 'dog-breed-quiz-id',
      text: 'What is your "special skill"?',
      image_url: null,
      order_index: 6,
      options: [
        { id: 'o7-1', question_id: 'q7', text: 'Being incredibly smart and solving puzzles.', scores: { 'Poodle': 3, 'Border Collie': 3, 'German Shepherd': 2 } },
        { id: 'o7-2', question_id: 'q7', text: 'Making everyone laugh with my goofy personality.', scores: { 'Boxer': 3, 'Pug': 3 } },
        { id: 'o7-3', question_id: 'q7', text: 'Being the most loyal friend someone could ask for.', scores: { 'Golden Retriever': 3, 'Rottweiler': 2 } }
      ]
    },
    {
      id: 'q8',
      quiz_id: 'dog-breed-quiz-id',
      text: 'Pick a travel destination:',
      image_url: null,
      order_index: 7,
      options: [
        { id: 'o8-1', question_id: 'q8', text: 'A rustic cabin in the mountains.', scores: { 'Husky': 2, 'Bernese Mountain Dog': 3 } },
        { id: 'o8-2', question_id: 'q8', text: 'A luxury spa resort.', scores: { 'Poodle': 3, 'French Bulldog': 2 } },
        { id: 'o8-3', question_id: 'q8', text: 'A crowded music festival.', scores: { 'Golden Retriever': 2, 'Labrador': 2 } }
      ]
    },
    {
      id: 'q9',
      quiz_id: 'dog-breed-quiz-id',
      text: 'How is your workspace organized?',
      image_url: null,
      order_index: 8,
      options: [
        { id: 'o9-1', question_id: 'q9', text: 'Immaculate. Everything in its place.', scores: { 'Poodle': 3, 'German Shepherd': 2 } },
        { id: 'o9-2', question_id: 'q9', text: 'A bit of a mess, but I know where everything is.', scores: { 'Beagle': 2, 'Mutt': 2 } },
        { id: 'o9-3', question_id: 'q9', text: 'Workspace? I work from my bed or a coffee shop.', scores: { 'Pug': 2, 'French Bulldog': 2 } }
      ]
    },
    {
      id: 'q10',
      quiz_id: 'dog-breed-quiz-id',
      text: 'What do you do if you see a squirrel?',
      image_url: null,
      order_index: 9,
      options: [
        { id: 'o10-1', question_id: 'q10', text: 'CHASE IT! IMMEDIATELY!', scores: { 'Jack Russell': 3, 'Beagle': 3, 'Greyhound': 2 } },
        { id: 'o10-2', question_id: 'q10', text: 'Bark until it knows I’m here and gets scared.', scores: { 'Chihuahua': 2, 'Sheltie': 2 } },
        { id: 'o10-3', question_id: 'q10', text: 'Observe it calmly from a distance.', scores: { 'Greyhound': 1, 'Shiba Inu': 2 } }
      ]
    },
    {
      id: 'q11',
      quiz_id: 'dog-breed-quiz-id',
      text: 'How do you react to a surprise party?',
      image_url: null,
      order_index: 10,
      options: [
        { id: 'o11-1', question_id: 'q11', text: 'I’m the life of the party! Let’s go!', scores: { 'Golden Retriever': 3, 'Labrador': 2 } },
        { id: 'o11-2', question_id: 'q11', text: 'I hide until I’m comfortable with who’s there.', scores: { 'Shiba Inu': 2, 'Basenji': 3 } },
        { id: 'o11-3', question_id: 'q11', text: 'I appreciate the gesture, but I need a schedule.', scores: { 'German Shepherd': 2, 'Border Collie': 2 } }
      ]
    },
    {
      id: 'q12',
      quiz_id: 'dog-breed-quiz-id',
      text: 'Choose a superpower:',
      image_url: null,
      order_index: 11,
      options: [
        { id: 'o12-1', question_id: 'q12', text: 'Super strength and bravery.', scores: { 'German Shepherd': 3, 'Rottweiler': 3 } },
        { id: 'o12-2', question_id: 'q12', text: 'Hyper-intelligence and problem-solving.', scores: { 'Poodle': 3, 'Border Collie': 3 } },
        { id: 'o12-3', question_id: 'q12', text: 'Invisibility for maximum relaxation.', scores: { 'Bulldog': 3, 'Basset Hound': 2 } }
      ]
    }
  ],
  results: [
    {
      id: 'res-golden',
      quiz_id: 'dog-breed-quiz-id',
      title: 'Golden Retriever: The Sunshine Friend',
      personality_type: 'Golden Retriever',
      description: 'You are the ultimate ray of sunshine! Your personality is defined by an overflowing cup of loyalty, kindness, and an almost suspicious amount of optimism. Like a Golden Retriever, you believe that everyone is potentially your new best friend, and you have a unique ability to make anyone feel welcome and loved.\n\nIn social situations, you’re the glue that holds the group together. You don’t care for drama and would much rather be having fun or helping someone out. You’re adaptable, patient, and incredibly hardworking when it comes to the things you care about—especially if there’s a reward involved!\n\nYour creative side is expressed through your playfulness and your ability to find joy in the smallest things. While some might call you naive, the truth is that you’ve mastered the art of happiness. Never stop wagging your metaphorical tail!',
      image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400'
    },
    {
      id: 'res-collie',
      quiz_id: 'dog-breed-quiz-id',
      title: 'Border Collie: The Super-Genius',
      personality_type: 'Border Collie',
      description: 'Is it even legal to be this smart? You are the intellectual powerhouse of the dog world. Your brain is a finely tuned machine that never stops working. You have an intense focus that can be both impressive and a little bit intimidating to those who lack your drive.\n\nYou thrive on challenges and get bored easily if you’re not learning something new. You probably have a million hobbies and you’re probably better at all of them than anyone else. Your loyalty is deep, but it’s earned through mutual respect and shared goals.\n\nYou have a "work hard, play hard" mentality. Whether you’re organizing your life or mastering a new skill, you do it with 110% effort. Just remember to take a break once in a while—even the most brilliant minds need to rest!',
      image_url: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=400'
    },
    {
      id: 'res-bulldog',
      quiz_id: 'dog-breed-quiz-id',
      title: 'Bulldog: The Chill Master',
      personality_type: 'Bulldog',
      description: 'You have mastered the ancient art of "Not Giving a Heck." You are reliable, stubborn in your convictions, and possess a level of chill that others can only dream of. Like a Bulldog, you appreciate the finer things in life—comfort, good food, and a very, very long nap.\n\nWhile you might seem low-energy to the uninitiated, those who know you understand that you are incredibly steadfast. When you decide to do something, you do it on your terms and in your own time. You are deeply affectionate with your inner circle, but you don’t feel the need to impress strangers.\n\nYour presence is grounding and calming. In a world that’s constantly rushing around, you are the rock who reminds everyone to take a breath and enjoy the moment. Stay comfortable, friend!',
      image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400'
    },
    {
      id: 'res-shepherd',
      quiz_id: 'dog-breed-quiz-id',
      title: 'German Shepherd: The Brave Guardian',
      personality_type: 'German Shepherd',
      description: 'Bravery, intelligence, and a sense of duty define you. You are a natural leader who takes responsibility seriously. Like a German Shepherd, you are fiercely protective of your loved ones and consistently exhibit a level of courage that inspires others.\n\nYou are "on duty" even when you’re relaxing, always keeping an eye on the situation and making sure everything is as it should be. You value discipline and structure, and you’re often the one people turn to when they need help or guidance. Your confidence is quiet but unshakable.\n\nYou have a sharp mind that learns quickly and a heart that is completely devoted. While you might keep your guard up initially, once someone is in your "pack," you would go to the ends of the earth for them.',
      image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=400'
    }
  ]
};
