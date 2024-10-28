import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/create_story.css';

const CreateStory = () => {
    const [story, setStory] = useState("Welcome to your adventure! Let's pick a path to start.");
    const [choices, setChoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Start the adventure when the component first loads
    const startJourney = () => {
        updateStory(
            "In a mystical forest, you stand before two ancient archways: one glows with a warm golden light, leading to the Valley of Whispers, where secrets are told by the wind. The other, covered in ivy and moss, leads to the Garden of Shadows, a quiet haven known to reveal hidden truths. Which path will you take?",
            [
                { text: "Enter the Valley of Whispers", action: goToValleyOfWhispers },
                { text: "Walk into the Garden of Shadows", action: goToGardenOfShadows }
            ]
        );
    };

    // Update the story and the choices available
    const updateStory = (text, options) => {
        setStory(text);
        setChoices(options);
        speak(text);
    };

    // Function to speak the text
    const speak = (text) => {
        if (isSpeaking) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        setIsSpeaking(true);
        speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false);
        };
    };

    // Function to stop speaking
    const stopSpeaking = () => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    // Functions for the choices
    const goToValleyOfWhispers = () => {
        updateStory(
            "As you step into the Valley of Whispers, the breeze carries soft voices telling tales of heroes. Suddenly, a shimmering fox appears, its eyes wise and knowing. The fox beckons you with its tail and gestures toward a hidden path covered in blue wildflowers.",
            [
                { text: "Follow the fox", action: followFox },
                { text: "Continue along the main path", action: continueMainPath }
            ]
        );
    };

    const goToGardenOfShadows = () => {
        updateStory(
            "You enter the Garden of Shadows, where ancient trees arch overhead, and the air is filled with the scent of night-blooming flowers. Among the shadows, you notice a faint glow beneath an old tree and hear the sound of soft music.",
            [
                { text: "Investigate the glowing light", action: investigateLight },
                { text: "Follow the sound of the music", action: followMusic }
            ]
        );
    };

    const followFox = () => {
        updateStory(
            "The fox leads you to a secluded clearing where a pool of crystal-clear water reflects the sky. As you gaze into the pool, visions of far-off lands and mythical creatures appear. The fox nudges you gently, as if urging you to drink from the pool.",
            [
                { text: "Drink from the pool", action: drinkFromPool },
                { text: "Thank the fox and leave", action: leaveClearing }
            ]
        );
    };

    const continueMainPath = () => {
        updateStory(
            "You continue down the main path, the whispers growing louder. They guide you to an ancient stone covered in mysterious runes. Touching the stone, you feel a surge of energy, and suddenly, you understand the whispers.",
            [
                { text: "Listen closely to the whispers", action: listenToWhispers },
                { text: "Move away and continue exploring", action: exploreFurther }
            ]
        );
    };

    const investigateLight = () => {
        updateStory(
            "You approach the glowing light and discover a tiny fairy sitting on a golden leaf. She looks up at you with a mischievous smile and offers you a sparkling vial. 'Drink this, and see the hidden wonders of the forest,' she says.",
            [
                { text: "Accept the fairy's gift", action: acceptGift },
                { text: "Politely decline and move on", action: declineGift }
            ]
        );
    };

    const followMusic = () => {
        updateStory(
            "Following the music, you find a group of woodland creatures dancing around a fire. They invite you to join their celebration under the moonlight.",
            [
                { text: "Join the dance", action: joinDance },
                { text: "Watch from a distance", action: watchDance }
            ]
        );
    };

    const drinkFromPool = () => {
        updateStory(
            "You drink from the pool, and instantly, your senses sharpen. You can hear the thoughts of nearby creatures and feel the pulse of the forest itself. The fox sits beside you, a silent companion on your journey.",
            [
                { text: "Continue exploring with newfound senses", action: exploreWithSenses },
                { text: "Thank the fox and return home", action: returnHome }
            ]
        );
    };

    const leaveClearing = () => {
        updateStory(
            "You leave the clearing, grateful for the fox's guidance. The forest feels more alive, as if acknowledging your presence and respect.",
            [
                { text: "Continue your journey", action: startJourney }
            ]
        );
    };

    const listenToWhispers = () => {
        updateStory(
            "The whispers reveal a prophecy of a great adventure that awaits you, a journey filled with wonder and magic. You feel a sense of purpose as you continue along the path.",
            [
                { text: "Embrace the adventure", action: startJourney }
            ]
        );
    };

    const exploreFurther = () => {
        updateStory(
            "You decide to explore the valley further, discovering hidden nooks filled with ancient relics. Each step feels like a new chapter in an unfolding story.",
            [
                { text: "Continue exploring", action: startJourney }
            ]
        );
    };

    const acceptGift = () => {
        updateStory(
            "You drink from the vial, and suddenly, the entire forest is bathed in colors you've never seen before. The fairy giggles and flits away, leaving you with a sense of wonder and magic.",
            [
                { text: "Explore the enchanted forest", action: exploreFurther }
            ]
        );
    };

    const declineGift = () => {
        updateStory(
            "You thank the fairy and decide to move on. She nods with a smile, and you feel a sense of peace as you continue your journey.",
            [
                { text: "Explore the garden further", action: startJourney }
            ]
        );
    };

    const joinDance = () => {
        updateStory(
            "You join the dance, and the creatures cheer, celebrating your bravery. Under the moonlight, you feel at one with the forest, as if you've found a new family among the trees.",
            [
                { text: "Celebrate and continue the journey", action: startJourney }
            ]
        );
    };

    const watchDance = () => {
        updateStory(
            "You watch from a distance, smiling at their joy. You feel content just being a part of their world, even as an observer.",
            [
                { text: "Continue your journey with newfound peace", action: startJourney }
            ]
        );
    };

    const exploreWithSenses = () => {
        updateStory(
            "With heightened senses, every leaf and creature in the forest becomes a source of discovery. You feel deeply connected to the world around you.",
            [
                { text: "Embrace your new senses and explore", action: startJourney }
            ]
        );
    };

    const returnHome = () => {
        updateStory(
            "You return home with memories of the forest and the wise fox. You feel grateful for the experience and the connection with nature.",
            [
                { text: "End the adventure", action: startJourney }
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
                                <Button className="choice-button"
                                    key={index}
                                    onClick={() => {
                                        stopSpeaking();
                                        choice.action();
                                    }}
                                    variant="primary"
                                >
                                    {choice.text}
                                </Button>
                            ))}
                            <Button variant="danger" onClick={stopSpeaking}>Stop Speaking</Button>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateStory;
