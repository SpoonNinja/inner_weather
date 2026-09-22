// js/data/wheel.js
// The feelings wheel: 7 core families, middle ring, outer ring.
// Order is clockwise starting at 12 o'clock. Outer leaves are drawn at equal angles.

export const CORES = [
  { id: "fearful",   label: "Fearful",   core: "#FFDE8D", mid: "#FFEFBE", valence: "unpleasant", energy: "high" },
  { id: "angry",     label: "Angry",     core: "#FF8F8E", mid: "#FFBFBF", valence: "unpleasant", energy: "high" },
  { id: "disgusted", label: "Disgusted", core: "#8F8F8F", mid: "#BFBFBF", valence: "unpleasant", energy: "mid"  },
  { id: "sad",       label: "Sad",       core: "#8FBDE1", mid: "#BFDBF0", valence: "unpleasant", energy: "low"  },
  { id: "happy",     label: "Happy",     core: "#FFF48F", mid: "#FEFBC8", valence: "pleasant",   energy: "mid"  },
  { id: "surprised", label: "Surprised", core: "#BCA2D1", mid: "#DBCBE6", valence: "mixed",      energy: "high" },
  { id: "bad",       label: "Bad",       core: "#8ED9AE", mid: "#BFEBD4", valence: "unpleasant", energy: "low"  }
];

// Each middle item lists its two outer words. Keys refer to WORDS below.
export const WHEEL = {
  fearful: [
    { key: "scared",     outer: ["helpless", "frightened"] },
    { key: "anxious",    outer: ["overwhelmed", "worried"] },
    { key: "insecure",   outer: ["inadequate", "inferior"] },
    { key: "weak",       outer: ["worthless", "insignificant"] },
    { key: "rejected",   outer: ["excluded", "persecuted"] },
    { key: "threatened", outer: ["nervous", "exposed"] }
  ],
  angry: [
    { key: "let_down",   outer: ["betrayed", "resentful"] },
    { key: "humiliated", outer: ["disrespected", "ridiculed"] },
    { key: "bitter",     outer: ["indignant", "violated"] },
    { key: "mad",        outer: ["furious", "jealous"] },
    { key: "aggressive", outer: ["provoked", "hostile"] },
    { key: "frustrated", outer: ["infuriated", "annoyed"] },
    { key: "distant",    outer: ["withdrawn", "numb"] },
    { key: "critical",   outer: ["skeptical", "dismissive"] }
  ],
  disgusted: [
    { key: "disapproving", outer: ["judgmental", "embarrassed"] },
    { key: "disappointed", outer: ["appalled", "revolted"] },
    { key: "awful",        outer: ["nauseated", "detestable"] },
    { key: "repelled",     outer: ["horrified", "hesitant"] }
  ],
  sad: [
    { key: "hurt",       outer: ["embarrassed", "disappointed"] },
    { key: "depressed",  outer: ["inferior", "empty"] },
    { key: "guilty",     outer: ["remorseful", "ashamed"] },
    { key: "despair",    outer: ["powerless", "grief"] },
    { key: "vulnerable", outer: ["fragile", "victimized"] },
    { key: "lonely",     outer: ["abandoned", "isolated"] }
  ],
  happy: [
    { key: "optimistic", outer: ["inspired", "hopeful"] },
    { key: "trusting",   outer: ["intimate", "sensitive"] },
    { key: "peaceful",   outer: ["thankful", "loving"] },
    { key: "powerful",   outer: ["creative", "courageous"] },
    { key: "accepted",   outer: ["valued", "respected"] },
    { key: "proud",      outer: ["confident", "successful"] },
    { key: "interested", outer: ["inquisitive", "curious"] },
    { key: "content",    outer: ["joyful", "free"] },
    { key: "playful",    outer: ["cheeky", "aroused"] }
  ],
  surprised: [
    { key: "excited",  outer: ["energetic", "eager"] },
    { key: "amazed",   outer: ["awe", "astonished"] },
    { key: "confused", outer: ["perplexed", "disillusioned"] },
    { key: "startled", outer: ["dismayed", "shocked"] }
  ],
  bad: [
    { key: "bored",    outer: ["indifferent", "apathetic"] },
    { key: "busy",     outer: ["pressured", "rushed"] },
    { key: "stressed", outer: ["overwhelmed", "out_of_control"] },
    { key: "tired",    outer: ["sleepy", "unfocused"] }
  ]
};

// Every label on the wheel. Some words appear in two places on the wheel
// (overwhelmed, embarrassed, disappointed, inferior); they share one entry here.
// means: plain one-line meaning (original wording, not from the book)
// atlas: keys into ATLAS for deeper cards (first one is the main card)
// tip: optional practical note shown on the card
// care: optional "soft" or "strong" (see SAFETY section of the plan)
export const WORDS = {
  // Core words
  fearful:   { label: "Fearful",   means: "Sensing some kind of threat or risk. See if a more specific word fits.", atlas: ["fear", "anxiety"] },
  angry:     { label: "Angry",     means: "Something feels blocked, wrong, or unfair. See if a more specific word fits.", atlas: ["anger"] },
  disgusted: { label: "Disgusted", means: "Wanting to pull away from something that feels offensive. See if a more specific word fits.", atlas: ["disgust"] },
  sad:       { label: "Sad",       means: "Feeling a loss or a letdown. See if a more specific word fits.", atlas: ["sadness"] },
  happy:     { label: "Happy",     means: "Feeling good in some way. See if a more specific word fits.", atlas: ["happiness", "joy"] },
  surprised: { label: "Surprised", means: "Caught off guard, for better or worse. See if a more specific word fits.", atlas: ["surprise"] },
  bad:       { label: "Bad",       means: "Off, drained, or under pressure without a clear name for it yet. Look a little closer.", atlas: ["stress", "boredom"] },

  // Fearful family
  scared:        { label: "Scared",        means: "Feeling a threat, big or small, right now.", atlas: ["fear"] },
  helpless:      { label: "Helpless",      means: "Feeling unable to change or protect against what is happening.", atlas: ["fear", "hopelessness"], care: "soft" },
  frightened:    { label: "Frightened",    means: "Suddenly and strongly afraid.", atlas: ["fear"] },
  anxious:       { label: "Anxious",       means: "Tense and uneasy about what might happen.", atlas: ["anxiety", "worry", "excitement"] },
  overwhelmed:   { label: "Overwhelmed",   means: "So much at once that it is hard to think or act.", atlas: ["overwhelm", "flooding"] },
  worried:       { label: "Worried",       means: "Caught in a loop of what-if thoughts about the future.", atlas: ["worry", "anxiety"] },
  insecure:      { label: "Insecure",      means: "Unsure of yourself, your place, or a relationship.", atlas: ["insecurity"] },
  inadequate:    { label: "Inadequate",    means: "Feeling like you are not enough for what is needed.", atlas: ["shame", "perfectionism", "insecurity"] },
  inferior:      { label: "Inferior",      means: "Feeling less than other people.", atlas: ["comparison", "shame"] },
  weak:          { label: "Weak",          means: "Feeling low on strength or power.", atlas: ["vulnerability"] },
  worthless:     { label: "Worthless",     means: "Feeling like you have no value.", atlas: ["shame", "self_compassion"], care: "strong" },
  insignificant: { label: "Insignificant", means: "Feeling small, or like you do not matter.", atlas: ["invisibility", "shame"] },
  rejected:      { label: "Rejected",      means: "Pushed away or not chosen.", atlas: ["disconnection", "belonging"] },
  excluded:      { label: "Excluded",      means: "Left out of a group or a moment.", atlas: ["belonging", "fitting_in", "disconnection"] },
  persecuted:    { label: "Persecuted",    means: "Feeling targeted or treated unfairly on purpose.", atlas: ["humiliation", "invisibility"] },
  threatened:    { label: "Threatened",    means: "Sensing danger to your safety, status, or something you value.", atlas: ["fear", "jealousy"] },
  nervous:       { label: "Nervous",       means: "Jittery about something coming up.", atlas: ["anxiety", "excitement", "dread"] },
  exposed:       { label: "Exposed",       means: "Seen in a way that feels unprotected.", atlas: ["vulnerability", "shame"] },

  // Angry family
  let_down:     { label: "Let down",     means: "Someone or something did not come through for you.", atlas: ["disappointment", "expectations"] },
  betrayed:     { label: "Betrayed",     means: "Trust you relied on was broken.", atlas: ["betrayal"] },
  resentful:    { label: "Resentful",    means: "Stewing over something unfair, often with an unspoken need underneath.", atlas: ["resentment", "boundaries"] },
  humiliated:   { label: "Humiliated",   means: "Put down or made small, often in front of others.", atlas: ["humiliation"] },
  disrespected: { label: "Disrespected", means: "Treated as if you do not matter.", atlas: ["humiliation", "invisibility"] },
  ridiculed:    { label: "Ridiculed",    means: "Mocked or laughed at.", atlas: ["humiliation", "sarcasm"] },
  bitter:       { label: "Bitter",       means: "Lingering anger and hurt about something unfair.", atlas: ["resentment", "hurt"] },
  indignant:    { label: "Indignant",    means: "Angry at something that seems unjust.", atlas: ["anger", "self_righteousness"] },
  violated:     { label: "Violated",     means: "A boundary or a right of yours was crossed.", atlas: ["boundaries", "betrayal"] },
  mad:          { label: "Mad",          means: "Plainly angry.", atlas: ["anger"] },
  furious:      { label: "Furious",      means: "Intensely angry.", atlas: ["anger", "flooding"] },
  jealous:      { label: "Jealous",      means: "Afraid of losing someone or something to another person.", atlas: ["jealousy", "envy"] },
  aggressive:   { label: "Aggressive",   means: "Wanting to push back or go on the attack.", atlas: ["anger", "defensiveness"] },
  provoked:     { label: "Provoked",     means: "Feeling baited or pushed toward anger.", atlas: ["anger", "defensiveness"] },
  hostile:      { label: "Hostile",      means: "Unfriendly and ready for conflict.", atlas: ["anger", "contempt", "hate"] },
  frustrated:   { label: "Frustrated",   means: "Blocked from what you want by something outside your control.", atlas: ["frustration"] },
  infuriated:   { label: "Infuriated",   means: "Enraged by whatever is in the way.", atlas: ["anger", "frustration"] },
  annoyed:      { label: "Annoyed",      means: "Mildly irritated.", atlas: ["frustration"] },
  distant:      { label: "Distant",      means: "Pulling back from people or from your own feelings.", atlas: ["disconnection"] },
  withdrawn:    { label: "Withdrawn",    means: "Closed off and keeping to yourself.", atlas: ["disconnection", "loneliness"] },
  numb:         { label: "Numb",         means: "Feeling very little, or shut down.", atlas: ["disconnection", "overwhelm"], tip: "Numbness can be a way of protecting yourself from too much at once. Gentle attention to your breath and body can help feelings come back at their own pace.", care: "soft" },
  critical:     { label: "Critical",     means: "Focused on what is wrong, in others or in yourself.", atlas: ["perfectionism", "contempt"] },
  skeptical:    { label: "Skeptical",    means: "Doubtful and not yet convinced.", atlas: ["trust", "cognitive_dissonance"] },
  dismissive:   { label: "Dismissive",   means: "Brushing something or someone off.", atlas: ["contempt", "defensiveness"] },

  // Disgusted family
  disapproving: { label: "Disapproving", means: "Judging something as wrong or not okay.", atlas: ["self_righteousness", "contempt"] },
  judgmental:   { label: "Judgmental",   means: "Quick to rate or condemn.", atlas: ["self_righteousness", "comparison"] },
  embarrassed:  { label: "Embarrassed",  means: "Self-conscious after a small slip that others noticed.", atlas: ["embarrassment", "shame"] },
  disappointed: { label: "Disappointed", means: "Things did not meet what you expected.", atlas: ["disappointment", "expectations"] },
  appalled:     { label: "Appalled",     means: "Shocked by something that seems deeply wrong.", atlas: ["disgust"] },
  revolted:     { label: "Revolted",     means: "A strong urge to recoil from something.", atlas: ["disgust"] },
  awful:        { label: "Awful",        means: "Feeling terrible, inside or about something.", atlas: ["disgust", "shame"] },
  nauseated:    { label: "Nauseated",    means: "Sick to your stomach, physically or emotionally.", atlas: ["disgust"] },
  detestable:   { label: "Detestable",   means: "Something, or someone, feels hateful or repugnant, sometimes even yourself.", atlas: ["disgust", "shame", "hate"] },
  repelled:     { label: "Repelled",     means: "Pushed away by something you find offensive.", atlas: ["disgust"] },
  horrified:    { label: "Horrified",    means: "Shocked and frightened by something terrible.", atlas: ["disgust", "fear", "anguish"] },
  hesitant:     { label: "Hesitant",     means: "Holding back, unsure whether to move toward something.", atlas: ["vulnerability", "avoidance"] },

  // Sad family
  hurt:       { label: "Hurt",       means: "Emotionally wounded, usually by someone close.", atlas: ["hurt"] },
  depressed:  { label: "Depressed",  means: "Low, heavy, and flat.", atlas: ["sadness", "hopelessness"], tip: "Feeling down is part of being human. If it lasts most days for a couple of weeks or more, a doctor or counselor can help.", care: "soft" },
  empty:      { label: "Empty",      means: "Hollow, as if something is missing inside.", atlas: ["sadness", "loneliness", "despair"], care: "soft" },
  guilty:     { label: "Guilty",     means: "Uncomfortable about something you did or did not do.", atlas: ["guilt"] },
  remorseful: { label: "Remorseful", means: "Sorry for harm you caused and wanting to make it right.", atlas: ["remorse", "guilt", "regret"] },
  ashamed:    { label: "Ashamed",    means: "Feeling like something is wrong with you, not just with what you did.", atlas: ["shame", "self_compassion"] },
  despair:    { label: "Despair",    means: "Feeling like nothing will get better.", atlas: ["despair", "hopelessness"], care: "strong" },
  powerless:  { label: "Powerless",  means: "Unable to affect what is happening.", atlas: ["hopelessness", "anguish"], care: "soft" },
  grief:      { label: "Grief",      means: "Aching from a loss.", atlas: ["grief", "heartbreak"] },
  vulnerable: { label: "Vulnerable", means: "Open to hurt: uncertain, at risk, or emotionally exposed.", atlas: ["vulnerability"] },
  fragile:    { label: "Fragile",    means: "Easily broken right now and needing gentleness.", atlas: ["vulnerability", "self_compassion"] },
  victimized: { label: "Victimized", means: "Harmed by someone else's actions.", atlas: ["humiliation", "betrayal"] },
  lonely:     { label: "Lonely",     means: "Missing meaningful connection.", atlas: ["loneliness"] },
  abandoned:  { label: "Abandoned",  means: "Left behind by someone you relied on.", atlas: ["heartbreak", "disconnection"], care: "soft" },
  isolated:   { label: "Isolated",   means: "Cut off from other people.", atlas: ["loneliness", "disconnection"], care: "soft" },

  // Happy family
  optimistic:  { label: "Optimistic",  means: "Expecting things to go well.", atlas: ["hope"] },
  inspired:    { label: "Inspired",    means: "Moved to create, grow, or act.", atlas: ["admiration", "awe"] },
  hopeful:     { label: "Hopeful",     means: "Seeing a way forward.", atlas: ["hope"] },
  trusting:    { label: "Trusting",    means: "Able to rely on others.", atlas: ["trust"] },
  intimate:    { label: "Intimate",    means: "Close to someone and deeply known.", atlas: ["love", "connection"] },
  sensitive:   { label: "Sensitive",   means: "Tender and finely tuned to feelings, yours or others'.", atlas: ["vulnerability", "empathy"] },
  peaceful:    { label: "Peaceful",    means: "Settled and at ease.", atlas: ["calm", "tranquility"] },
  thankful:    { label: "Thankful",    means: "Appreciating what you have.", atlas: ["gratitude"] },
  loving:      { label: "Loving",      means: "Full of warmth and care.", atlas: ["love"] },
  powerful:    { label: "Powerful",    means: "Capable and strong.", atlas: ["pride", "hope"] },
  creative:    { label: "Creative",    means: "Full of ideas and wanting to make things.", atlas: ["curiosity", "wonder"] },
  courageous:  { label: "Courageous",  means: "Ready to do something hard.", atlas: ["vulnerability"] },
  accepted:    { label: "Accepted",    means: "Welcomed as you are.", atlas: ["belonging", "connection"] },
  valued:      { label: "Valued",      means: "Appreciated and important to others.", atlas: ["connection", "belonging"] },
  respected:   { label: "Respected",   means: "Taken seriously and treated with dignity.", atlas: ["connection", "trust"] },
  proud:       { label: "Proud",       means: "Pleased with an effort or an accomplishment.", atlas: ["pride"] },
  confident:   { label: "Confident",   means: "Trusting your own abilities.", atlas: ["self_trust", "humility"] },
  successful:  { label: "Successful",  means: "Feeling you did what you set out to do.", atlas: ["pride", "contentment"] },
  interested:  { label: "Interested",  means: "Open and engaged.", atlas: ["interest"] },
  inquisitive: { label: "Inquisitive", means: "Eager to ask questions and explore.", atlas: ["curiosity"] },
  curious:     { label: "Curious",     means: "Wanting to know more.", atlas: ["curiosity"] },
  content:     { label: "Content",     means: "Satisfied, with a sense that things are enough.", atlas: ["contentment"] },
  joyful:      { label: "Joyful",      means: "Lit up with deep, connected happiness.", atlas: ["joy"] },
  free:        { label: "Free",        means: "Unburdened and unrestricted.", atlas: ["joy", "relief"] },
  playful:     { label: "Playful",     means: "Light and ready for fun.", atlas: ["amusement"] },
  cheeky:      { label: "Cheeky",      means: "Playfully mischievous.", atlas: ["amusement"] },
  aroused:     { label: "Aroused",     means: "Physically stirred, energized, or attracted.", atlas: ["excitement"] },

  // Surprised family
  excited:       { label: "Excited",       means: "Energized about something ahead.", atlas: ["excitement", "anxiety"] },
  energetic:     { label: "Energetic",     means: "Full of physical or mental energy.", atlas: ["excitement"] },
  eager:         { label: "Eager",         means: "Keen to get started.", atlas: ["excitement", "curiosity"] },
  amazed:        { label: "Amazed",        means: "Struck by something remarkable.", atlas: ["wonder", "awe"] },
  awe:           { label: "Awe",           means: "Moved by something vast or beautiful.", atlas: ["awe", "wonder"] },
  astonished:    { label: "Astonished",    means: "Greatly surprised.", atlas: ["surprise", "wonder"] },
  confused:      { label: "Confused",      means: "Not understanding yet.", atlas: ["confusion"] },
  perplexed:     { label: "Perplexed",     means: "Puzzled by something that does not add up.", atlas: ["confusion", "cognitive_dissonance"] },
  disillusioned: { label: "Disillusioned", means: "Let down after seeing something more clearly.", atlas: ["disappointment", "cognitive_dissonance"] },
  startled:      { label: "Startled",      means: "Jolted by something sudden.", atlas: ["surprise", "fear"] },
  dismayed:      { label: "Dismayed",      means: "Upset and discouraged by something unexpected.", atlas: ["surprise", "discouragement"] },
  shocked:       { label: "Shocked",       means: "Stunned by something unexpected.", atlas: ["surprise", "anguish"] },

  // Bad family
  bored:          { label: "Bored",          means: "Understimulated and wanting something satisfying to do.", atlas: ["boredom"] },
  indifferent:    { label: "Indifferent",    means: "Not caring much either way.", atlas: ["boredom", "resignation"] },
  apathetic:      { label: "Apathetic",      means: "Low on the energy or motivation to care or act.", atlas: ["resignation", "discouragement"] },
  busy:           { label: "Busy",           means: "A lot on your plate, moving from thing to thing.", atlas: ["stress"] },
  pressured:      { label: "Pressured",      means: "Pushed by demands or deadlines.", atlas: ["stress", "expectations"] },
  rushed:         { label: "Rushed",         means: "Short on time and hurrying.", atlas: ["stress"] },
  stressed:       { label: "Stressed",       means: "Demands feel bigger than your capacity to cope.", atlas: ["stress", "overwhelm"] },
  out_of_control: { label: "Out of control", means: "Things feel unpredictable and beyond your grip.", atlas: ["stress", "anxiety"] },
  tired:          { label: "Tired",          means: "Low on energy, physically or mentally.", atlas: ["stress"], tip: "Tired is often a body need before it is a motivation problem. Water, food, daylight, a short walk, or rest may help more than willpower." },
  sleepy:         { label: "Sleepy",         means: "Drowsy, with a body that wants rest.", atlas: ["tranquility"], tip: "If you can, a short rest or a few minutes of daylight and movement may do more than pushing through." },
  unfocused:      { label: "Unfocused",      means: "Attention scattered and hard to settle.", atlas: ["overwhelm", "boredom"], tip: "Pick one small task and set a short timer. Starting is often easier than deciding." }
};
