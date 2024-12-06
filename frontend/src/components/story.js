import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import '../styles/story.css'; // Optional: CSS for additional styling
import AdamEve from '../images/adamandeve.jpg';
import Garden from '../images/gardenofeden.jpg';
import Ark from '../images/ark.jpg';
import Noah from '../images/noah.jpg';
import David from '../images/david.jpg';
import Goliath from '../images/goliath.jpg';
import Daniel from '../images/daniel.jpg';
import Lion from '../images/lionden.jpg';
import Jonah from '../images/jonah.jpg';
import BigFish from '../images/jonah-fish.jpg';
import Moses from '../images/moses.jpg';
import RedSea from '../images/redsea.jpg';

// Story data for the cards
const stories = [
  {
    title: "Adam and Eve",
    frontImage: AdamEve,
    expandedImage: Garden,
    story: "In the beginning, God created the first man, Adam, from the dust of the ground and breathed life into him. Adam lived in a beautiful garden called Eden, where he named all the animals and took care of the plants. But Adam was lonely, so God decided to create a companion for him. God put Adam into a deep sleep, took one of his ribs, and made the first woman, Eve. Adam and Eve lived happily in the Garden of Eden, where they had everything they needed. God told them they could eat from any tree in the garden except one—the Tree of Knowledge of Good and Evil. God warned them that if they ate from this tree, they would die. One day, a sneaky serpent, who was actually the Devil in disguise, tricked Eve into eating the fruit from the forbidden tree. The serpent told her that eating the fruit would make her as wise as God. Eve took a bite and gave some to Adam, who also ate it. Immediately, they realized they had disobeyed God and felt ashamed. Because they disobeyed, God had to punish them. He told them they had to leave the beautiful garden and live in the world outside, where life would be harder. Adam and Eve had to work hard to grow their food, and they experienced pain and suffering for the first time. But even though they made a big mistake, God still loved them and promised to send a Savior to help their descendants.",
    lesson: "The lesson of the story is Obedience to God: God gave Adam and Eve a rule to follow, but they disobeyed. This teaches us the importance of listening to and obeying God’s instructions.",
    audioFile: '/songs/AdamAndEve.mp3',
  },
  {
    title: "Noah's Ark",
    frontImage: Ark,
    expandedImage: Noah,
    story: "A long time ago, the world had become filled with wickedness. People had forgotten about God, and they were doing evil things all the time. But there was one man who remained faithful to God. His name was Noah. God saw how righteous Noah was, and He decided to save Noah and his family from the destruction that was coming. God told Noah that He was going to send a great flood to wash away the evil in the world, but He had a plan to keep Noah and the animals safe. God instructed Noah to build a huge boat called an ark. Noah followed God’s instructions exactly, even though it took many years to complete the ark. While he worked, Noah warned the people about the coming flood, but they didn’t believe him. Once the ark was ready, God told Noah to bring his family—his wife, his three sons, and their wives—into the ark. God also told Noah to gather two of every kind of animal, one male and one female, and bring them onto the ark. After everyone and everything was inside, God closed the door. Then, the rain began to fall. It rained for forty days and forty nights, and the floodwaters rose, covering the earth. The ark floated on the water, keeping Noah, his family, and the animals safe inside. After the rain stopped, the water remained on the earth for many months. Noah and his family waited patiently inside the ark until, one day, the ark came to rest on a mountain. Noah sent out a dove to see if the water had receded, and when the dove returned with an olive branch, Noah knew it was finally safe to leave the ark. Once they were outside, Noah built an altar to thank God for saving them. God made a covenant with Noah, promising that He would never again destroy the earth with a flood. As a sign of this promise, God placed a beautiful rainbow in the sky.",
    lesson: "The lesson of the story is Faith in God’s plan: Noah trusted in God’s instructions, even when others didn’t believe him. This teaches us the importance of faith and obedience, knowing that God will guide and protect those who trust in Him.",
    audioFile: '/songs/NohasArk.mp3',
  },
  {
    title: "David and Goliath",
    frontImage: David,
    expandedImage: Goliath,
    story: "In ancient Israel, there was a great war between the Israelites and the Philistines. The Philistines had a giant warrior named Goliath, who was over nine feet tall. Every day, Goliath challenged the Israelites to send out a champion to fight him, but the Israelites were terrified of him. One day, a young shepherd named David came to the battlefield to bring food to his brothers. When he heard Goliath's taunts, he was outraged that no one would stand up to the giant. David believed that God would protect him, so he volunteered to fight Goliath. King Saul was hesitant but eventually agreed, giving David his armor, which was too heavy for him. Instead, David chose to face Goliath with only his sling and five smooth stones. When Goliath saw David, he laughed and mocked him, but David declared that he came in the name of the Lord. David slung a stone with great skill, hitting Goliath in the forehead. The giant fell to the ground, defeated. David then took Goliath's sword and held it high, showing everyone that the Israelites had won a great victory. David's faith in God and courage to face the giant became legendary.",
    lesson: "The lesson of the story is With God, even the smallest can overcome great challenges. David’s story teaches us that faith and courage can help us confront our fears and achieve great things.",
    audioFile: '/songs/davidAndGoliath.mp3',
  },
  {
    title: "Daniel and the Lion's Den",
    frontImage: Daniel,
    expandedImage: Lion,
    story: "A long time ago, there was a kind man named Daniel who loved God very much. Daniel was a good worker, and he helped the king make decisions. Everyone liked Daniel, but some people were jealous of him. They wanted to get rid of him, so they tricked the king into making a new law. This law said that no one could pray to anyone except the king for thirty days. Daniel knew this law was wrong, but he loved God and wanted to keep praying to Him. So, Daniel continued to pray three times a day, just as he always did. The jealous men saw him and rushed to tell the king. The king was sad because he liked Daniel, but he had to follow his own law. They threw Daniel into a den full of hungry lions as a punishment. But Daniel wasn’t scared because he trusted God. That night, while Daniel was in the den, God sent an angel to close the lions' mouths so they wouldn’t hurt him. The next morning, the king came to see if Daniel was okay. When he called out, Daniel answered happily, saying that God had protected him. The king was overjoyed! He ordered Daniel to be lifted out of the den, and he declared that everyone should respect Daniel’s God. Daniel’s bravery and faith showed everyone that God is always there to help us.",
    lesson: "The lesson of the story is When we trust God, He will take care of us. Daniel teaches us to be brave and always pray, no matter what.",
    audioFile: '/songs/danielAndTheLionDen.mp3',
  },
  {
    title: "Jonah and the Big Fish",
    frontImage: Jonah,
    expandedImage: BigFish,
    story: "Once upon a time, God asked a man named Jonah to go to a city and tell the people to stop being bad. But Jonah didn’t want to go. He was scared, so he decided to run away. Jonah got on a big ship sailing in the opposite direction. While they were at sea, a huge storm started! The wind blew hard, and the waves were so high that the sailors were afraid. They found Jonah sleeping below deck and woke him up, asking him to pray to God to save them. Jonah knew the storm was because he was running away from God, so he told the sailors to throw him into the sea. They didn’t want to, but the storm got worse, so they did what Jonah said. As soon as Jonah hit the water, the storm stopped! But Jonah wasn’t alone for long. God sent a big fish to swallow him whole. Jonah stayed in the belly of the fish for three days and three nights, praying and asking God for help. Finally, God made the fish spit Jonah out onto dry land. This time, Jonah listened to God and went to the city to tell the people to change their ways. They listened and turned from their bad actions. Jonah learned that God is loving and forgiving, even when we make mistakes.",
    lesson: "The lesson of the story is God’s love and forgiveness: Even when we run away or make mistakes, God is always ready to forgive us and give us a second chance.",
    audioFile: '/songs/jonahAndTheBigFish.mp3',
  },
  {
    title: "Moses and the Red Sea",
    frontImage: Moses,
    expandedImage: RedSea,
    story: "A long time ago, the Israelites were slaves in Egypt. God sent Moses to lead them out of slavery. After many miracles and God's help, the Pharaoh finally let the Israelites go. But Pharaoh soon changed his mind and sent his army to chase after them. The Israelites were trapped by the Red Sea, and there was nowhere to go. But God told Moses to stretch out his staff over the water. When Moses did, God parted the Red Sea, and the Israelites walked through on dry ground. When the Egyptian army followed, the waters returned, and the army was swept away. The Israelites were free, and they praised God for His incredible power.",
    lesson: "The lesson of the story is Trusting God for deliverance: God has the power to make a way when there seems to be no way.",
    audioFile: '/songs/mosesRedSea.mp3',
  }
];

export const BibleStories = () => {
  const [expandedStory, setExpandedStory] = useState(null);
  const [audio, setAudio] = useState(null);

  const toggleStory = (index) => {
    if (expandedStory === index) {
      setExpandedStory(null);
      stopAudio();
    } else {
      setExpandedStory(index);
      stopAudio(); // Stop current audio before expanding a new story
    }
  };

  const playAudio = (audioFile) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(audioFile);
    newAudio.play();
    setAudio(newAudio);
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
  };

  return (
    <div className="container">
      {expandedStory === null ? (
        <Row>
          {stories.map((story, index) => (
            <Col key={index} md={4}>
              <Card className="story-card mb-4">
                <Card.Img variant="top" src={story.frontImage} alt={story.title} />
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                  <Button onClick={() => toggleStory(index)}>Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="expanded-story text-center">
          <Button variant="secondary" onClick={() => toggleStory(null)}>Back to Stories</Button>
          <h2>{stories[expandedStory].title}</h2>
          <img
            src={stories[expandedStory].expandedImage}
            alt={stories[expandedStory].title}
            className="img-fluid my-3"
          />
          <div className="audio-controls" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => playAudio(stories[expandedStory].audioFile)} className="me-2">Play Audio</Button>
            <Button variant="warning" onClick={pauseAudio}>Pause Audio</Button>
          </div>
          <p>{stories[expandedStory].story}</p>
          <p><strong>Lesson:</strong> {stories[expandedStory].lesson}</p>
          
        </div>
      )}
    </div>
  );
};

export default BibleStories;
