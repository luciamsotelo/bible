import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/create_story.css';

const CreateStory = () => {
    const [story, setStory] = useState("Welcome to your adventure! Choose a path to begin.");
    const [choices, setChoices] = useState([]);

    // Function to initialize the story when the component mounts
    const startJourney = () => {
        updateStory(
            "You find yourself at a crossroad in a vibrant land filled with lush greenery and a sparkling river. To your left is the Bright Path, where laughter and joy echo. To your right is the Shady Grove, where the trees whisper secrets of adventure. Which path will you choose?",
            [
                { text: "Take the Bright Path", action: goToBrightPath },
                { text: "Venture into the Shady Grove", action: goToShadyGrove }
            ]
        );
    };

    // Update the story and available choices
    const updateStory = (text, options) => {
        setStory(text);
        setChoices(options);
    };

    // Using useEffect to start the journey when the component mounts
    useEffect(() => {
        startJourney();
    }, []); // Empty dependency array means this runs once on mount

    // Define functions for each choice path
    const goToBrightPath = () => {
        updateStory(
            "As you step onto the Bright Path, the sun shines brightly overhead, bathing everything in a warm golden glow. Colorful flowers dance in the gentle breeze, filling the air with their sweet fragrances. You hear cheerful laughter in the distance, drawing you closer. Suddenly, you spot a little girl sitting on a weathered bench, her small hands clutching her knees tightly, tears streaming down her cheeks. She looks lost and alone, her beloved stuffed rabbit nowhere to be seen.",
            [
                { text: "Help her find her toy", action: helpGirl },
                { text: "Leave her and continue playing", action: ignoreGirl }
            ]
        );
    };

    const goToShadyGrove = () => {
        updateStory(
            "You venture into the Shady Grove, where towering trees provide a cool respite from the bright sun. The ground is soft with fallen leaves, and the air is filled with the melodic chirping of birds. As you stroll deeper, you notice a small bird with ruffled feathers, hopping nervously on the ground. Its tiny beak is open, and it appears to be searching for food, desperately looking around as if lost.",
            [
                { text: "Share your snack with the bird", action: shareWithBird },
                { text: "Ignore the bird and keep walking", action: ignoreBird }
            ]
        );
    };

    const helpGirl = () => {
        updateStory(
            "You kneel beside the girl, your heart aching for her sadness. You gently ask her about her missing toy, and her eyes widen with hope. She describes her beloved rabbit, its soft fur and floppy ears, and how it always brings her comfort. Together, you begin searching the nearby bushes, under the swings, and around the playground equipment. After what feels like an eternity of searching, you finally spot the toy hidden behind a swing! The girl squeals with delight, her tears replaced by a radiant smile.",
            [
                { text: "Celebrate with her by playing together", action: celebrateTogether },
                { text: "Continue your journey, feeling good about your help", action: continueJourneyAfterHelp }
            ]
        );
    };

    const ignoreGirl = () => {
        updateStory(
            "You decide to keep walking, thinking it's not your problem. As you move further down the path, the sound of her sobbing lingers in your mind. The laughter of other children fades away, replaced by a heavy silence. You feel a growing sense of regret gnawing at your conscience, realizing you could have made a difference.",
            [
                { text: "Go back to help her", action: goBackToHelp },
                { text: "Keep walking and reflect on your choice", action: reflectOnChoice }
            ]
        );
    };

    const shareWithBird = () => {
        updateStory(
            "You reach into your bag and pull out a piece of your snack, gently placing it on the ground near the bird. It hesitates for a moment before cautiously approaching. As it pecks at the food, it looks up at you with bright, curious eyes and chirps happily, flapping its wings in excitement. This small act of kindness fills you with joy, and you realize how even the smallest gestures can make a big difference.",
            [
                { text: "Follow the bird as it flies away", action: followBird },
                { text: "Stay and enjoy the beauty of nature around you", action: observeNature }
            ]
        );
    };

    const ignoreBird = () => {
        updateStory(
            "You shrug off the bird's plight, deciding it’s not your concern. As you walk further, the forest feels less welcoming. The vibrant colors begin to dull, and the sounds of laughter fade into an eerie silence. You sense a growing emptiness around you, and the realization hits that ignoring those in need has consequences.",
            [
                { text: "Go back and help the bird", action: goBackToBird },
                { text: "Continue your journey, feeling indifferent", action: continueJourneyWithoutHelp }
            ]
        );
    };

    const celebrateTogether = () => {
        updateStory(
            "With the stuffed rabbit back in her hands, the girl’s eyes sparkle with gratitude. You both leap up and down, celebrating the reunion. She invites you to join her in a game of tag, and soon you're both running around, laughter echoing through the playground. In that moment, you realize the joy that comes from helping others and how friendships can blossom through acts of kindness.",
            [
                { text: "Continue your journey together", action: continueTogether },
                { text: "Teach her something new you learned", action: teachHerSomethingNew }
            ]
        );
    };

    const continueJourneyAfterHelp = () => {
        updateStory(
            "Feeling fulfilled from your good deed, you continue on your journey, but the memories of the girl's joy linger in your mind. Along the way, you meet other children who share their stories about kindness and friendship, reminding you of the importance of being there for one another. Each story fills your heart with warmth and inspires you to spread joy.",
            [
                { text: "Learn from their stories", action: endAdventureWithMoral },
                { text: "Keep exploring new paths", action: endAdventureWithMoral }
            ]
        );
    };

    const goBackToHelp = () => {
        updateStory(
            "Realizing your mistake, you rush back to the girl. Her eyes light up when she sees you returning. Together, you celebrate the reunion with her toy and share stories about your favorite games and adventures, forming a bond that fills your hearts with joy.",
            [
                { text: "Play together until sunset", action: continueJourneyAfterHelp },
                { text: "Teach her how to play your favorite game", action: teachHerSomethingNew }
            ]
        );
    };

    const reflectOnChoice = () => {
        updateStory(
            "You take a moment to breathe deeply, reflecting on your decision to walk away. The weight of the girl’s sadness sits heavy in your heart, and you understand that kindness is a choice that can change someone's day. You resolve to be more mindful in the future.",
            [
                { text: "Go back to help her", action: goBackToHelp },
                { text: "Continue your journey, but with a lesson in mind", action: endAdventureWithMoral }
            ]
        );
    };

    const followBird = () => {
        updateStory(
            "The bird flutters ahead, leading you to a hidden clearing filled with dazzling flowers and a sparkling waterfall. You sit by the water's edge, mesmerized by the beauty around you. The bird splashes in the water, and you feel a sense of peace and connection to nature. Here, you learn to appreciate life's small wonders and the importance of nurturing all living things.",
            [
                { text: "Take a moment to reflect on your adventure", action: endAdventureWithMoral },
                { text: "Share this special place with a friend", action: endAdventureWithMoral }
            ]
        );
    };

    const observeNature = () => {
        updateStory(
            "You take a seat under a sprawling tree, surrounded by the gentle rustle of leaves and the joyful songs of birds. The intricate patterns of nature captivate you, and you find yourself lost in thought. In this moment of tranquility, you learn about the beauty of the world around you and the importance of taking time to appreciate it.",
            [
                { text: "Reflect on what you learned", action: endAdventureWithMoral },
                { text: "Sketch the beautiful scenery in your mind", action: endAdventureWithMoral }
            ]
        );
    };

    const goBackToBird = () => {
        updateStory(
            "Realizing you missed an opportunity to help, you turn back towards the bird. As you reach it, you find it has brought its friends, and together they flutter around you, chirping happily. You feel a rush of joy as you share your snack with them, understanding that kindness can create a ripple effect, spreading happiness to those around you.",
            [
                { text: "Continue sharing your snacks with the birds", action: endAdventureWithMoral },
                { text: "Reflect on the joy of giving", action: endAdventureWithMoral }
            ]
        );
    };

    const continueJourneyWithoutHelp = () => {
        updateStory(
            "You push forward on your journey, but the path feels heavier without kindness to lighten it. You come across other adventurers who share their tales of bravery and generosity, reminding you of the joy that comes from helping others. You start to realize that your actions impact the world around you.",
            [
                { text: "Learn from their stories", action: endAdventureWithMoral },
                { text: "Keep moving forward, hoping to change your ways", action: endAdventureWithMoral }
            ]
        );
    };

    const teachHerSomethingNew = () => {
        updateStory(
            "You take a moment to share some of your favorite games with her. She listens intently, her eyes shining with excitement. You teach her the rules and demonstrate how to play. Soon, laughter fills the air as you both enjoy the newfound friendship. In this exchange, you realize the beauty of sharing knowledge and experiences.",
            [
                { text: "Continue playing together until dusk", action: endAdventureWithMoral },
                { text: "Invite her to join you on your adventures", action: endAdventureWithMoral }
            ]
        );
    };

    const endAdventureWithMoral = () => {
        updateStory(
            "As your adventure comes to a close, you reflect on the lessons learned: the importance of kindness, the power of friendship, and the joy that comes from helping others. You understand that every small act of compassion can create ripples of happiness in the world, and you leave with a heart full of gratitude and a desire to spread kindness wherever you go.",
            [
                { text: "Start a new adventure", action: startJourney },
                { text: "Reflect on this journey with a friend", action: goToShadyGrove }
            ]
        );
    };

    const continueTogether = () => {
        updateStory(
            "With the girl by your side, you both embark on new adventures, exploring enchanted forests and hidden meadows filled with colorful flowers. Together, you encounter friendly animals and share countless laughter-filled moments. Your bond grows stronger with each experience, reminding you both that friendships can lead to the most magical journeys. As you walk hand in hand, you promise to always be there for each other, facing challenges together and cherishing the joyful moments.",
            [
                { text: "Create a secret club together", action: endAdventureWithMoral },
                { text: "Plan a picnic in the park", action: endAdventureWithMoral }
            ]
        );
    };

    return (
        <Container className="create-story">
            <Row>
                <Col>
                    <h2>Your Adventure</h2>
                    <p>{story}</p>
                    <div className="choices">
                        {choices.map((choice, index) => (
                            <Button 
                                key={index} 
                                onClick={choice.action} 
                                variant="primary" 
                                className="choice-button"
                            >
                                {choice.text}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateStory;
