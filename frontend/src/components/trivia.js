import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming React Router is used
import styles from '../styles/trivia.module.css'; // UPDATED import

const Trivia = () => {
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const originalQuestions = [
        {
            question: "Who built the ark?",
            options: ["Adam", "Moses", "Noah", "David"],
            correctAnswer: "Noah",
        },
        {
            question: "What did Jesus feed to 5,000 people?",
            options: ["Apples and grapes", "Fish and bread", "Honey and milk", "Corn and wheat"],
            correctAnswer: "Fish and bread",
        },
        {
            question: "What sign did God give after the flood?",
            options: ["A rainbow", "A dove", "A star", "A cloud"],
            correctAnswer: "A rainbow",
        },
        {
            question: "Who was Jesus' earthly father?",
            options: ["Joseph", "Abraham", "Moses", "David"],
            correctAnswer: "Joseph",
        },
        {
            question: "What was the name of the sea that Jesus calmed?",
            options: ["Red Sea", "Dead Sea", "Sea of Galilee", "Mediterranean Sea"],
            correctAnswer: "Sea of Galilee",
        },
        {
            question: "Who was thrown into a den of lions?",
            options: ["Elijah", "Daniel", "Moses", "Joseph"],
            correctAnswer: "Daniel",
        },
        {
            question: "What did God create on the seventh day?",
            options: ["The Sun", "Animals", "He rested", "The stars"],
            correctAnswer: "He rested",
        },
        {
            question: "Who was swallowed by a big fish?",
            options: ["Jonah", "Moses", "Noah", "David"],
            correctAnswer: "Jonah",
        },
        {
            question: "How many of each animal did Noah bring onto the ark?",
            options: ["Two", "Five", "Seven", "Ten"],
            correctAnswer: "Two",
        },
        {
            question: "Who was the first man created by God?",
            options: ["Noah", "Moses", "Adam", "David"],
            correctAnswer: "Adam",
        },
        {
            question: "Who was the first woman created by God?",
            options: ["Mary", "Eve", "Ruth", "Miriam"],
            correctAnswer: "Eve",
        },
        {
            question: "What did God give Moses on Mount Sinai?",
            options: ["A golden calf", "The Ten Commandments", "A burning bush", "A rainbow"],
            correctAnswer: "The Ten Commandments",
        },
        {
            question: "What did Jesus do on the third day after He died?",
            options: ["Stayed in the tomb", "Came back to life", "Disappeared", "Went to Egypt"],
            correctAnswer: "Came back to life",
        },
        {
            question: "Who was Jesus’ mother?",
            options: ["Martha", "Mary", "Sarah", "Esther"],
            correctAnswer: "Mary",
        },
        {
            question: "What kind of animal did Jesus ride into Jerusalem?",
            options: ["A horse", "A camel", "A donkey", "An elephant"],
            correctAnswer: "A donkey",
        },
        {
            question: "Who walked on water with Jesus?",
            options: ["James", "Peter", "John", "Luke"],
            correctAnswer: "Peter",
        },
        {
            question: "What did God use to speak to Moses in the desert?",
            options: ["A cloud", "A burning bush", "A dove", "A pillar of fire"],
            correctAnswer: "A burning bush",
        },
        {
            question: "Who killed Goliath?",
            options: ["Moses", "David", "Joshua", "Solomon"],
            correctAnswer: "David",
        },
        {
            question: "Who was known as the wisest man?",
            options: ["David", "Solomon", "Moses", "Elijah"],
            correctAnswer: "Solomon",
        },
        {
            question: "What did Jesus teach His followers to pray?",
            options: ["Hail Mary", "Psalm 23", "The Lord’s Prayer", "The Ten Commandments"],
            correctAnswer: "The Lord’s Prayer",
        },
        {
            question: "What is the last book of the Bible?",
            options: ["Genesis", "Psalms", "Revelation", "John"],
            correctAnswer: "Revelation",
        },
        {
            question: "How did Jesus die?",
            options: ["He was stoned", "He was crucified", "He drowned", "He was thrown into a lion's den"],
            correctAnswer: "He was crucified",
        },
        {
            question: "Who found baby Moses in the river?",
            options: ["An angel", "Pharaoh's daughter", "His mother", "A fisherman"],
            correctAnswer: "Pharaoh's daughter",
        },
        {
            question: "What is the shortest verse in the Bible?",
            options: ["Jesus wept.", "I am.", "God is love.", "Amen."],
            correctAnswer: "Jesus wept.",
        },
        {
            question: "What is the first book of the Bible?",
            options: ["Genesis", "Exodus", "Psalms", "Revelation"],
            correctAnswer: "Genesis",
        },
        {
            question: "How many days did God take to create the world?",
            options: ["Three", "Five", "Six", "Seven"],
            correctAnswer: "Six",
        },
        {
            question: "What was the name of Jesus’ closest twelve followers?",
            options: ["The Kings", "The Prophets", "The Disciples", "The Angels"],
            correctAnswer: "The Disciples",
        },
        {
            question: "How many books are in the Bible?",
            options: ["27", "39", "66", "100"],
            correctAnswer: "66",
        },
        {
            question: "Who denied Jesus three times before the rooster crowed?",
            options: ["John", "Peter", "Paul", "James"],
            correctAnswer: "Peter",
        },
        {
            question: "Who was the first king of Israel?",
            options: ["David", "Solomon", "Saul", "Samuel"],
            correctAnswer: "Saul",
        },
        {
            question: "What city was Jesus born in?",
            options: ["Nazareth", "Bethlehem", "Jerusalem", "Capernaum"],
            correctAnswer: "Bethlehem",
        },
        {
            question: "What was Paul’s name before he followed Jesus?",
            options: ["Peter", "John", "Saul", "Luke"],
            correctAnswer: "Saul",
        },
        {
            question: "Who was known as the 'father of faith'?",
            options: ["Abraham", "Isaac", "Jacob", "Joseph"],
            correctAnswer: "Abraham",
        },
        {
            question: "What is the greatest commandment Jesus taught?",
            options: ["Do not steal", "Love the Lord and your neighbor", "Pray every day", "Obey your parents"],
            correctAnswer: "Love the Lord and your neighbor",
        },
        {
            question: "Who betrayed Jesus for 30 pieces of silver?",
            options: ["Peter", "Judas", "Thomas", "John"],
            correctAnswer: "Judas",
        },
        {
            question: "What river was Jesus baptized in?",
            options: ["Nile", "Jordan", "Euphrates", "Tigris"],
            correctAnswer: "Jordan",
        },
        {
            question: "What did Jesus turn water into?",
            options: ["Milk", "Juice", "Wine", "Honey"],
            correctAnswer: "Wine",
        },
        {
            question: "What is the name of the garden where Adam and Eve lived?",
            options: ["Gethsemane", "Eden", "Galilee", "Bethlehem"],
            correctAnswer: "Eden",
        },
        {
            question: "Which apostle doubted Jesus' resurrection until he saw Him?",
            options: ["Peter", "Judas", "Thomas", "Andrew"],
            correctAnswer: "Thomas",
        },
        {
            question: "How many plagues did God send on Egypt?",
            options: ["3", "7", "10", "12"],
            correctAnswer: "10",
        },
        {
            question: "What did God tell Noah to build?",
            options: ["A temple", "An altar", "An ark", "A tower"],
            correctAnswer: "An ark",
        },
        {
            question: "Which book comes after the Gospels in the New Testament?",
            options: ["Romans", "Acts", "Revelation", "Hebrews"],
            correctAnswer: "Acts",
        },
        {
            question: "Who led the Israelites into the Promised Land?",
            options: ["Moses", "Aaron", "Joshua", "Caleb"],
            correctAnswer: "Joshua",
        },
        {
            question: "What happened to the Tower of Babel?",
            options: ["It burned", "It was finished", "God confused their language", "It turned to gold"],
            correctAnswer: "God confused their language",
        },
        {
            question: "Who was the strong man known for his long hair?",
            options: ["Saul", "Samson", "Solomon", "Seth"],
            correctAnswer: "Samson",
        },
        {
            question: "What kind of insect did John the Baptist eat?",
            options: ["Bees", "Locusts", "Ants", "Crickets"],
            correctAnswer: "Locusts",
        },
        {
            question: "How many days and nights did it rain during the flood?",
            options: ["20", "30", "40", "50"],
            correctAnswer: "40",
        },
        {
            question: "Who interpreted Pharaoh’s dream in Egypt?",
            options: ["Moses", "Joseph", "Daniel", "Jacob"],
            correctAnswer: "Joseph",
        },
        {
            question: "What is the golden rule Jesus taught?",
            options: ["Love your enemies", "Pray always", "Do to others as you would have them do to you", "Be still"],
            correctAnswer: "Do to others as you would have them do to you",
        },
        {
            question: "Who was the oldest man in the Bible?",
            options: ["Abraham", "Methuselah", "Noah", "Adam"],
            correctAnswer: "Methuselah",
        },
        {
            question: "Which disciple was a fisherman?",
            options: ["Matthew", "Judas", "Peter", "Thomas"],
            correctAnswer: "Peter",
        },
        {
            question: "Who received the Ten Commandments?",
            options: ["David", "Abraham", "Moses", "Isaiah"],
            correctAnswer: "Moses",
        },
        {
            question: "What book is known as the book of wisdom?",
            options: ["Psalms", "Proverbs", "Job", "Ecclesiastes"],
            correctAnswer: "Proverbs",
        },
        {
            question: "Where did Jesus pray before His arrest?",
            options: ["The garden of Eden", "Gethsemane", "Nazareth", "Mount Sinai"],
            correctAnswer: "Gethsemane",
        },
        {
            question: "What animal spoke to Balaam?",
            options: ["A lion", "A sheep", "A donkey", "A bird"],
            correctAnswer: "A donkey",
        },
        {
            question: "What is the longest book in the Bible?",
            options: ["Genesis", "Isaiah", "Psalms", "Matthew"],
            correctAnswer: "Psalms",
        },
        {
            question: "Who anointed David as king?",
            options: ["Nathan", "Eli", "Samuel", "Saul"],
            correctAnswer: "Samuel",
        },
        {
            question: "How many times did Peter deny Jesus?",
            options: ["One", "Two", "Three", "Four"],
            correctAnswer: "Three",
        },
        {
            question: "Who climbed a sycamore tree to see Jesus?",
            options: ["Matthew", "Zacchaeus", "Paul", "Simon"],
            correctAnswer: "Zacchaeus",
        },
        {
            question: "Which prophet was taken up to heaven in a whirlwind?",
            options: ["Elisha", "Ezekiel", "Isaiah", "Elijah"],
            correctAnswer: "Elijah",
        },
        {
            question: "Which disciple was a tax collector?",
            options: ["Luke", "Matthew", "John", "James"],
            correctAnswer: "Matthew",
        },
        {
            question: "What does 'Emmanuel' mean?",
            options: ["God with us", "Peace be with you", "Healer", "Messiah"],
            correctAnswer: "God with us",
        },
        {
            question: "Who was Abraham’s wife?",
            options: ["Rebekah", "Rachel", "Leah", "Sarah"],
            correctAnswer: "Sarah",
        },
        {
            question: "Who was the first martyr in the New Testament?",
            options: ["Paul", "Stephen", "Peter", "James"],
            correctAnswer: "Stephen",
        },
        {
            question: "How many days was Jesus in the tomb?",
            options: ["One", "Two", "Three", "Four"],
            correctAnswer: "Three",
        },
        {
            question: "Who was the Roman governor who sentenced Jesus to death?",
            options: ["Caesar", "Herod", "Pilate", "Nero"],
            correctAnswer: "Pilate",
        },
        {
            question: "How many wise men visited Jesus?",
            options: ["Three", "Five", "We don't know", "Two"],
            correctAnswer: "We don't know",
        },
        {
            question: "What was the name of the mountain where Moses died?",
            options: ["Sinai", "Nebo", "Carmel", "Zion"],
            correctAnswer: "Nebo",
        },
        {
            question: "Which book describes the fruit of the Spirit?",
            options: ["Philippians", "Galatians", "Romans", "Ephesians"],
            correctAnswer: "Galatians",
        }
        
    ];
    
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(originalQuestions.map(q => ({ ...q, options: shuffleArray(q.options) })));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(""); 

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (answer === correctAnswer) {
            setScore(score + 1);
            setFeedback("✅ Awesome! You got it!");
        } else {
            setFeedback(`❌ You'll get it next time! The correct answer is: "${correctAnswer}"`);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(""); 
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const restartGame = () => {
        setQuestions(originalQuestions.map(q => ({ ...q, options: shuffleArray(q.options) })));
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);
        setFeedback(""); 
    };

    if (isGameOver) {
        return (
            <div className={styles.triviaContainer}>
                <h1>Game Over!</h1>
                <p>Your score is {score}/{questions.length}</p>
                <button className={styles.nextButton} onClick={restartGame}>Play Again</button>
            </div>
        );
    }

    return (
        <div className={styles.triviaContainer}>
            <nav className={styles.navbar}>
                <button className={styles.navButton} onClick={() => navigate('/')}> 🏠 Home</button>
                <button className={styles.navButton} onClick={() => navigate('/games')}>🎮  Games Menu</button>
            </nav>
            <h1>Bible Trivia</h1>
            <div className={styles.questionSection}>
                <h2>{questions[currentQuestionIndex].question}</h2>
                <div className={styles.options}>
                    {questions[currentQuestionIndex].options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            className={`${styles.optionButton} ${
                                selectedAnswer
                                    ? option === questions[currentQuestionIndex].correctAnswer
                                        ? styles.correct
                                        : option === selectedAnswer
                                        ? styles.incorrect
                                        : ""
                                    : ""
                            }`}
                            disabled={!!selectedAnswer} 
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {selectedAnswer && <p className={styles.feedbackMessage}>{feedback}</p>}
            </div>
            {selectedAnswer && <button className={styles.nextButton} onClick={handleNextQuestion}>Next Question</button>}
            <p>Score: {score}</p>
        </div>
    );
};

export default Trivia;
