import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/create_story.css';

const CreateStory = () => {
    const [story, setStory] = useState("Welcome to your adventure! Let's pick a path to start.");
    const [choices, setChoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false); // State to track if audio is playing
    const [hasStarted, setHasStarted] = useState(false); // State for the Start button

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

    // New missing function definitions
    const celebrateTogether = () => {
        updateStory(
            "You and the girl play together in the sun, laughing and running around. You feel happy that you helped her find her rabbit, and together you make new, joyful memories.",
            [
                { text: "Continue your adventure", action: startJourney }
            ]
        );
    };

    const continueJourneyAfterHelp = () => {
        updateStory(
            "With a sense of pride for helping, you continue on your way. The path seems brighter, and your heart feels lighter. The adventure awaits!",
            [
                { text: "Explore further", action: startJourney }
            ]
        );
    };

    const goBackToHelp = () => {
        updateStory(
            "You change your mind and turn around to help the little girl. She smiles at you gratefully as you offer to help her find her rabbit.",
            [
                { text: "Help her find the rabbit", action: helpGirl }
            ]
        );
    };

    const reflectOnChoice = () => {
        updateStory(
            "As you walk further, you can't shake the feeling that you should have helped the girl. You start to wonder if choosing kindness could have made your adventure better.",
            [
                { text: "Go back to help her", action: goBackToHelp },
                { text: "Keep walking", action: continueJourneyWithoutHelp }
            ]
        );
    };

    const followBird = () => {
        updateStory(
            "The bird flies away, leading you deeper into the forest. You follow it, curious to see where it goes, and soon find yourself in a beautiful clearing with flowers and a sparkling stream.",
            [
                { text: "Explore the clearing", action: observeNature }
            ]
        );
    };

    const observeNature = () => {
        updateStory(
            "You decide to stay in the clearing, taking in the beauty of nature. The soft breeze, the smell of flowers, and the gentle sound of the stream make you feel at peace.",
            [
                { text: "Continue your adventure", action: startJourney }
            ]
        );
    };

    const goBackToBird = () => {
        updateStory(
            "You turn around and go back to the bird, offering it some food. The bird chirps happily and flies off, leaving you feeling content.",
            [
                { text: "Follow the bird", action: followBird }
            ]
        );
    };

    const continueJourneyWithoutHelp = () => {
        updateStory(
            "You decide not to go back and continue walking. However, a small part of you wonders if you missed an opportunity for a better adventure.",
            [
                { text: "Explore further", action: startJourney }
            ]
        );
    };

    return (
        <Container className="create-story">
            <Row>
                <Col className="story-text">
                    <h1>Story Adventure Game</h1>
                    {!hasStarted ? (
                        <Button
                            variant="success"
                            onClick={() => {
                                setHasStarted(true);
                                startJourney();
                            }}
                        >
                            Start Reading Story
                        </Button>
                    ) : (
                        <>
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
                            <Button variant="danger" onClick={stopSpeaking}>Stop Speaking</Button> {/* Stop button */}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateStory;
