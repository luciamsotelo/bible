import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/create_story.css';

const CreateStory = () => {
    const [story, setStory] = useState("Welcome to your adventure! Let's pick a path to start.");
    const [choices, setChoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false); // State to track if audio is playing

    // Start the adventure when the component first loads
    const startJourney = () => {
        updateStory(
            "You are standing at a fork in the road in a magical land full of bright flowers and a shiny river. To your left is the Bright Path, where you can hear happy laughter. To your right is the Shady Grove, where tall trees sway and share secret tales. Which path will you take?",
            [
                { text: "Go down the Bright Path", action: goToBrightPath },
                { text: "Explore the Shady Grove", action: goToShadyGrove }
            ]
        );
    };

    // Update the story and the choices available
    const updateStory = (text, options) => {
        setStory(text);
        setChoices(options);
        speak(text); // Call the speak function to read the text aloud
    };

    // Function to speak the text
    const speak = (text) => {
        if (isSpeaking) return; // Stop if already speaking
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1; // Default is 1, range is between 0 and 2
        utterance.rate = 1;  // Default is 1, range is between 0.1 and 10
        setIsSpeaking(true); // Set speaking state to true
        speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false); // Reset speaking state when done
        };
    };

    // Function to stop speaking
    const stopSpeaking = () => {
        speechSynthesis.cancel(); // Stop any ongoing speech
        setIsSpeaking(false); // Reset speaking state
    };

    // Starting the adventure when the component mounts
    useEffect(() => {
        startJourney();
    }, []); // Runs only once when the component is first shown

    // Functions for the choices
    const goToBrightPath = () => {
        updateStory(
            "As you step onto the Bright Path, the sun shines down, making everything glow with warmth. Colorful flowers sway gently in the breeze, and you can hear children laughing in the distance. Suddenly, you see a little girl sitting on a bench, crying. She seems sad because her favorite stuffed rabbit is missing.",
            [
                { text: "Help her find her rabbit", action: helpGirl },
                { text: "Keep going and play", action: ignoreGirl }
            ]
        );
    };

    const goToShadyGrove = () => {
        updateStory(
            "You walk into the Shady Grove, where the tall trees give you shade from the sun. The ground is soft with leaves, and you hear birds singing sweet songs. As you explore, you see a small bird looking for food. It looks a bit lost and is hopping around, searching for something.",
            [
                { text: "Share your snack with the bird", action: shareWithBird },
                { text: "Ignore the bird and walk away", action: ignoreBird }
            ]
        );
    };

    const helpGirl = () => {
        updateStory(
            "You go to the little girl and ask her what’s wrong. She tells you about her stuffed rabbit, and her eyes light up with hope. Together, you look under benches and behind bushes until you finally find her rabbit hiding near a swing! The girl jumps up and down with joy, her tears replaced by a big smile.",
            [
                { text: "Play with her and celebrate", action: celebrateTogether },
                { text: "Continue your adventure feeling happy", action: continueJourneyAfterHelp }
            ]
        );
    };

    const ignoreGirl = () => {
        updateStory(
            "You decide to walk past her, thinking it’s not your problem. But as you walk away, her crying echoes in your ears, making you feel sad. You realize you could have helped her.",
            [
                { text: "Go back to help her", action: goBackToHelp },
                { text: "Keep walking and think about your choice", action: reflectOnChoice }
            ]
        );
    };

    const shareWithBird = () => {
        updateStory(
            "You take out a piece of your snack and place it on the ground for the bird. At first, it hesitates, but then it hops over and starts pecking at the food. The bird looks up at you and chirps happily. You feel warm inside because your small act of kindness made it happy.",
            [
                { text: "Follow the bird as it flies away", action: followBird },
                { text: "Stay here and enjoy nature", action: observeNature }
            ]
        );
    };

    const ignoreBird = () => {
        updateStory(
            "You decide not to help the bird and keep walking. As you go further, the forest feels less friendly, and everything seems a little darker. You start to feel sad for not helping.",
            [
                { text: "Go back and help the bird", action: goBackToBird },
                { text: "Keep walking and feel indifferent", action: continueJourneyWithoutHelp }
            ]
        );
    };

    const celebrateTogether = () => {
        updateStory(
            "With the rabbit safe in her arms, the girl smiles brightly. She invites you to play tag with her, and soon you're both running and laughing together. You realize that helping others brings joy and can make new friends.",
            [
                { text: "Keep playing together", action: continueJourneyAfterHelp },
                { text: "Teach her a fun game", action: teachHerSomethingNew }
            ]
        );
    };

    const continueJourneyAfterHelp = () => {
        updateStory(
            "After helping the girl, you feel happy as you continue your adventure. You meet other children who share stories about kindness. You learn that being kind to others makes everyone feel good.",
            [
                { text: "Listen to their stories", action: endAdventureWithMoral },
                { text: "Keep exploring new paths", action: endAdventureWithMoral }
            ]
        );
    };

    const goBackToHelp = () => {
        updateStory(
            "You realize you should help, so you hurry back to the girl. She smiles big when she sees you. Together, you celebrate the rabbit's return and share stories about your favorite games.",
            [
                { text: "Play together until sunset", action: continueJourneyAfterHelp },
                { text: "Teach her how to play your favorite game", action: teachHerSomethingNew }
            ]
        );
    };

    const reflectOnChoice = () => {
        updateStory(
            "You take a moment to think about your decision. The girl's sad face makes you realize how important it is to be kind. You promise to be more caring in the future.",
            [
                { text: "Go back and help her", action: goBackToHelp },
                { text: "Continue your adventure, but remember this lesson", action: endAdventureWithMoral }
            ]
        );
    };

    const followBird = () => {
        updateStory(
            "The bird leads you to a magical spot filled with colorful flowers and a sparkling waterfall. You sit by the water, feeling peaceful. The bird splashes in the water, and you learn to enjoy the beauty of nature.",
            [
                { text: "Think about your adventure", action: endAdventureWithMoral },
                { text: "Invite a friend to see this special place", action: endAdventureWithMoral }
            ]
        );
    };

    const observeNature = () => {
        updateStory(
            "You sit under a big tree, listening to the leaves rustle and the birds sing. You feel calm and happy as you watch the beauty of nature. In this peaceful moment, you learn to appreciate the world around you.",
            [
                { text: "Reflect on what you've learned", action: endAdventureWithMoral },
                { text: "Draw a picture in your mind", action: endAdventureWithMoral }
            ]
        );
    };

    const goBackToBird = () => {
        updateStory(
            "You realize you missed a chance to help, so you turn back. The bird has brought its friends, and they chirp around you. You feel happy sharing your snack with them, knowing kindness spreads joy.",
            [
                { text: "Keep sharing with the birds", action: endAdventureWithMoral },
                { text: "Think about how good it feels to give", action: endAdventureWithMoral }
            ]
        );
    };

    const continueJourneyWithoutHelp = () => {
        updateStory(
            "As you walk away, you feel a weight in your heart. You missed a chance to make a difference, but you can always try to be better next time.",
            [
                { text: "Reflect on your feelings", action: endAdventureWithMoral },
                { text: "Plan to be kinder in the future", action: endAdventureWithMoral }
            ]
        );
    };

    const teachHerSomethingNew = () => {
        updateStory(
            "You share a fun game with the girl, and she loves it! You both laugh and play until the sun sets. Making new friends and sharing joy fills your heart.",
            [
                { text: "Cherish this moment", action: endAdventureWithMoral },
                { text: "Plan to play together again", action: endAdventureWithMoral }
            ]
        );
    };

    const endAdventureWithMoral = () => {
        updateStory(
            "As your adventure comes to an end, you realize that every choice matters. Kindness and friendship make the world a better place. You feel proud of your journey.",
            [
                { text: "Replay the story", action: startJourney },
                { text: "Exit", action: () => console.log('Exiting...') }
            ]
        );
    };

    return (
        <Container className="create-story">
            <Row>
                <Col className="story-text">
                    <h1>Story Adventure Game</h1>
                    <p>{story}</p>
                    {choices.map((choice, index) => (
                        <Button className='choice-button'
                            key={index}
                            onClick={() => {
                                stopSpeaking(); // Stop audio before making a choice
                                choice.action(); // Call the action associated with the choice
                            }}
                            variant="primary"
                        >
                            {choice.text}
                        </Button>
                    ))}
                    <Button variant="danger" onClick={stopSpeaking}>Stop Speaking</Button> {/* Stop Speaking button */}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateStory;
