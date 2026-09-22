// js/data/atlas.js
// Emotions and experiences, grouped the way Atlas of the Heart (Brené Brown, 2021) groups them.
// All wording below is an original paraphrase written for this app. Do not replace it with quotes from the book.
//
// Fields:
//   name     display name of the concept
//   feel     how a person would say they feel it ("Resigned"); null if it is not something you "feel"
//            (entries with a feel value are selectable as feelings via search, even if not on the wheel)
//   group    GROUPS id
//   family   CORES id used only for color
//   kind     "emotion" or "experience" (experiences are thoughts, patterns, or practices that shape emotion)
//   meaning  1 to 2 sentences
//   compare  optional: how it differs from a look-alike
//   ask      a reflection question
//   try      optional: a tiny practice
//   care     optional: "soft" or "strong"

export const GROUPS = [
  { id: 1,  title: "When it's uncertain or too much", short: "Uncertain or too much" },
  { id: 2,  title: "When we compare",                 short: "Comparing" },
  { id: 3,  title: "When things don't go as planned", short: "Not as planned" },
  { id: 4,  title: "When it's bigger than us",        short: "Bigger than us" },
  { id: 5,  title: "When it's not what it seems",     short: "Not what it seems" },
  { id: 6,  title: "When we're hurting",              short: "Hurting" },
  { id: 7,  title: "When we're with others",          short: "With others" },
  { id: 8,  title: "When we fall short",              short: "Falling short" },
  { id: 9,  title: "When we look for connection",     short: "Seeking connection" },
  { id: 10, title: "When the heart is open",          short: "Heart open" },
  { id: 11, title: "When life is good",               short: "Life is good" },
  { id: 12, title: "When we feel wronged",            short: "Feeling wronged" },
  { id: 13, title: "When we size ourselves up",       short: "Self-assessing" }
];

export const ATLAS = {
  stress: {
    name: "Stress", feel: "Stressed", group: 1, family: "bad", kind: "emotion",
    meaning: "Stress shows up when what life is asking of you feels bigger than what you believe you can handle, especially when things feel unpredictable or out of your control.",
    compare: "Stress is being behind but still in the game. Overwhelm is when it is so much that you cannot think straight or function.",
    ask: "What exactly feels like more than I can handle right now?",
    try: "Name the one thing that matters most in the next hour. Put everything else on a list for later."
  },
  overwhelm: {
    name: "Overwhelm", feel: "Overwhelmed", group: 1, family: "bad", kind: "emotion",
    meaning: "Overwhelm is stress turned all the way up: so much thought or feeling at once that you cannot sort it out or decide what comes next.",
    compare: "In overwhelm, feelings run high while clarity runs low, which makes decisions harder. It usually calls for a pause before a plan.",
    ask: "Can I give myself a few minutes of doing nothing before I try to solve anything?",
    try: "Take five to ten minutes of real non-doing: step outside, drink some water, look at something far away. Then choose one small next step."
  },
  anxiety: {
    name: "Anxiety", feel: "Anxious", group: 1, family: "fearful", kind: "emotion",
    meaning: "Anxiety is tension and worried thinking about what might happen, often with a busy, keyed-up body. It can be a passing state or a long-running tendency, and it grows when uncertainty is hard to sit with.",
    compare: "Anxiety and excitement feel almost the same in the body. The name you give the feeling can change how the next hour goes.",
    ask: "Is this anxiety, or could some of it be excitement?",
    try: "Take one slow breath and ask whether this energy could be pointed at something you care about. If anxiety is constant or getting in the way of life, a counselor or doctor can help."
  },
  worry: {
    name: "Worry", feel: "Worried", group: 1, family: "fearful", kind: "experience",
    meaning: "Worry is the thinking side of anxiety: a chain of what-if thoughts about bad things that could happen later.",
    compare: "Worry feels useful but rarely solves anything, and trying to shove worried thoughts away tends to make them louder.",
    ask: "What feeling is underneath this worry, and what does it need from me?",
    try: "Write the worry in one sentence. Then write one thing about it that is within your control."
  },
  avoidance: {
    name: "Avoidance", feel: null, group: 1, family: "fearful", kind: "experience",
    meaning: "Avoidance is steering around the thing that scares you. It brings short-term relief, but the fear stays and often grows.",
    ask: "What am I avoiding right now, and what is the smallest way to face it?",
    try: "Do two minutes of the thing you have been avoiding. Just two."
  },
  excitement: {
    name: "Excitement", feel: "Excited", group: 1, family: "surprised", kind: "emotion",
    meaning: "Excitement is an energized, eager feeling before or during something you are looking forward to. It can feel jittery, a lot like anxiety.",
    compare: "Same body sensations as anxiety, read as something good.",
    ask: "What am I looking forward to, and how can I let myself enjoy it?"
  },
  dread: {
    name: "Dread", feel: "Dread", group: 1, family: "fearful", kind: "emotion",
    meaning: "Dread is a heavy sense of something unpleasant you expect to happen, and it tends to grow as the moment gets closer.",
    compare: "Dread and anxiety live in the future. Fear is about a threat that is here now.",
    ask: "Is the waiting worse than the thing itself would be?",
    try: "If you can, do the dreaded thing sooner, or put it on the calendar so it stops following you around."
  },
  fear: {
    name: "Fear", feel: "Afraid", group: 1, family: "fearful", kind: "emotion",
    meaning: "Fear is a fast, short, high-alert response to a threat that feels present right now, physical or social. The body often reacts before you have a name for it: fight, flight, or freeze.",
    compare: "Fear is about now. Anxiety and dread are about later.",
    ask: "What feels threatened right now, and am I actually in danger?",
    try: "Feel your feet on the floor and make your exhale longer than your inhale. Let your thinking catch up with your body."
  },
  vulnerability: {
    name: "Vulnerability", feel: "Vulnerable", group: 1, family: "sad", kind: "emotion",
    meaning: "Vulnerability is what we feel in uncertainty, risk, and emotional exposure: asking for something, sharing something real, or trying when you might fail.",
    compare: "Vulnerability is not weakness; courage is not possible without it. It is also not oversharing. It is sharing with people who have earned it.",
    ask: "What am I risking by showing up today, and is it worth it to me?",
    try: "Finish this sentence on paper: This feels vulnerable because..."
  },
  comparison: {
    name: "Comparison", feel: null, group: 2, family: "fearful", kind: "experience",
    meaning: "Comparison is not an emotion but a habit of measuring yourself against others, often without noticing. It pulls two ways at once: fit in, and also be better.",
    ask: "Whose lane am I watching instead of my own?",
    try: "Silently wish the person you are comparing yourself to well, then bring your attention back to your own next step."
  },
  admiration: {
    name: "Admiration", feel: "Admiring", group: 2, family: "happy", kind: "emotion",
    meaning: "Admiration is feeling inspired by someone's skill, achievement, or character, or by art or nature. It usually makes you want to grow, not to become them.",
    compare: "Admiration pulls you toward a better version of yourself. Reverence pulls you toward connection with something greater.",
    ask: "What in this person or thing do I want to grow in myself?"
  },
  reverence: {
    name: "Reverence", feel: "Reverent", group: 2, family: "surprised", kind: "emotion",
    meaning: "Reverence is deep respect, often mixed with love and humility, for something sacred or bigger than yourself.",
    ask: "What feels sacred to me right now, and how can I move closer to it?"
  },
  envy: {
    name: "Envy", feel: "Envious", group: 2, family: "angry", kind: "emotion",
    meaning: "Envy is wanting something someone else has, like their looks, popularity, skill, knowledge, or lifestyle. Sometimes it comes with wanting them to lose it, and sometimes it does not.",
    compare: "Envy is wanting what another person has. Jealousy is fearing you will lose something you already have to someone else.",
    ask: "What do I actually want here, and do I need them to lose it for me to have it?"
  },
  jealousy: {
    name: "Jealousy", feel: "Jealous", group: 2, family: "angry", kind: "emotion",
    meaning: "Jealousy is fear of losing a relationship, or an important part of one, to someone or something else. It often shows up as anger, sadness, or fear.",
    compare: "Jealousy is about keeping what you have. Envy is about wanting what someone else has.",
    ask: "What am I afraid of losing, and what conversation might I need to have?"
  },
  resentment: {
    name: "Resentment", feel: "Resentful", group: 2, family: "angry", kind: "emotion",
    meaning: "Resentment mixes frustration, judgment, and a sense of unfairness, often with hidden envy underneath. It tends to grow when we do not set boundaries or ask for what we need.",
    compare: "Resentment is often closer to envy than to anger. Being annoyed that someone is resting can really mean you want rest too.",
    ask: "What do I need that I have been afraid to ask for?",
    try: "Notice any critical speech you are rehearsing in your head. Swap it for one honest request."
  },
  schadenfreude: {
    name: "Schadenfreude", feel: "Pleased at someone's misfortune", group: 2, family: "disgusted", kind: "emotion",
    meaning: "Schadenfreude (German for harm-joy) is pleasure at someone else's suffering or failure. It often grows out of feeling inferior, powerless, or afraid.",
    compare: "Feeling relieved when someone is held accountable for real harm is different. That usually comes from caring about the people who were hurt.",
    ask: "Does this pleasure fit the person I want to be?"
  },
  freudenfreude: {
    name: "Freudenfreude", feel: "Glad for someone", group: 2, family: "happy", kind: "emotion",
    meaning: "Freudenfreude is joy in someone else's success. It is the opposite of schadenfreude and a form of empathy.",
    ask: "Whose good news could I celebrate today?",
    try: "When someone shares good news, ask a follow-up question. When someone celebrates yours, thank them for it."
  },
  boredom: {
    name: "Boredom", feel: "Bored", group: 3, family: "bad", kind: "emotion",
    meaning: "Boredom is wanting to do something satisfying and not being able to. Time drags and tasks feel pointless or too easy. It can leave you restless or sluggish.",
    compare: "Boredom with little control tends toward frustration; boredom with lots of control tends toward sluggishness. A quiet, bored mind is also where daydreams and new ideas show up.",
    ask: "Does this moment need more challenge, more meaning, or just room for my mind to wander?",
    try: "Either raise the challenge (set a timer, add a constraint) or put the phone down and let your mind drift for five minutes."
  },
  disappointment: {
    name: "Disappointment", feel: "Disappointed", group: 3, family: "sad", kind: "emotion",
    meaning: "Disappointment is what we feel when expectations are not met. The bigger the expectation, the bigger the disappointment.",
    compare: "Disappointed: it did not go how I wanted, and it felt out of my control. Regretful: it did not go how I wanted, and my choices played a part.",
    ask: "What was I expecting, and did I ever say it out loud?"
  },
  expectations: {
    name: "Expectations", feel: null, group: 3, family: "sad", kind: "experience",
    meaning: "Expectations are the picture we paint of how things will go, including how other people will act. The unspoken, unexamined ones cause the most disappointment.",
    ask: "What picture of today am I holding, and how much of it depends on things I cannot control?",
    try: "Say or write your expectation for the next hour. Is it realistic? Is it yours to control? Does anyone else need to hear it?"
  },
  regret: {
    name: "Regret", feel: "Regretful", group: 3, family: "sad", kind: "emotion",
    meaning: "Regret is pain over an outcome we believe our own actions, or our inaction, helped cause. Over time we tend to regret what we did not do more than what we did.",
    compare: "Regret can be a fair but tough teacher, pointing toward growth, amends, or more courage next time.",
    ask: "What is this regret trying to teach me?"
  },
  discouragement: {
    name: "Discouragement", feel: "Discouraged", group: 3, family: "sad", kind: "emotion",
    meaning: "Discouragement is losing confidence and enthusiasm for continuing to try. It is about effort, not the outcome.",
    compare: "Discouraged means the motivation to keep going is slipping. Resigned means it feels gone.",
    ask: "What would make the next attempt feel possible, even if it is small?"
  },
  resignation: {
    name: "Resignation", feel: "Resigned", group: 3, family: "sad", kind: "emotion",
    meaning: "Resignation is having lost the motivation or belief that trying again is worth it.",
    compare: "Resigned is further along than discouraged: the effort has stopped, not just slowed.",
    ask: "Is there one small piece of this I still care about?"
  },
  frustration: {
    name: "Frustration", feel: "Frustrated", group: 3, family: "angry", kind: "emotion",
    meaning: "Frustration is feeling blocked from what you want by something that seems outside your control.",
    compare: "Frustration and anger both come from being blocked. With frustration we feel we cannot fix it; with anger we feel something can be done.",
    ask: "What part of this is actually within my control?"
  },
  awe: {
    name: "Awe", feel: "In awe", group: 4, family: "surprised", kind: "emotion",
    meaning: "Awe is being moved by something vast, like nature, art, music, faith, or a big idea, in a way that makes you feel small but connected.",
    compare: "Wonder makes you want to understand. Awe makes you want to step back and let the thing shine.",
    ask: "What is something larger than me that I can notice today?"
  },
  wonder: {
    name: "Wonder", feel: "Full of wonder", group: 4, family: "surprised", kind: "emotion",
    meaning: "Wonder is amazement that sparks a desire to explore and understand.",
    compare: "Wonder leans in with questions. Awe stands back in appreciation.",
    ask: "What do I want to understand more deeply?"
  },
  confusion: {
    name: "Confusion", feel: "Confused", group: 4, family: "surprised", kind: "emotion",
    meaning: "Confusion is the discomfort of not understanding yet. In the right amount it is a sign you are learning; it asks you to slow down, think, and try a new approach.",
    compare: "A little confusion fuels deep learning. Too much tips into frustration or giving up.",
    ask: "Is this the good kind of confusion that means I am learning, or do I need help or a smaller step?",
    try: "Write down exactly what you do not understand yet. Then ask for help or break it into one smaller question."
  },
  curiosity: {
    name: "Curiosity", feel: "Curious", group: 4, family: "happy", kind: "emotion",
    meaning: "Curiosity is noticing a gap in what you know about something that interests you, and wanting, with both heart and head, to close it.",
    compare: "Interest is an open mind. Curiosity adds an emotional pull to find out.",
    ask: "What question do I want answered today?"
  },
  interest: {
    name: "Interest", feel: "Interested", group: 4, family: "happy", kind: "emotion",
    meaning: "Interest is openness to engaging with a topic or experience: a mind willing to see what is there.",
    compare: "Interest can grow into curiosity once you notice something you want to know.",
    ask: "What here has caught my attention?"
  },
  surprise: {
    name: "Surprise", feel: "Surprised", group: 4, family: "surprised", kind: "emotion",
    meaning: "Surprise is a brief jolt when something does not fit what you expected. It usually lasts only seconds and makes whatever you feel next stronger.",
    ask: "What just changed my expectations, and what am I feeling now that the jolt has passed?"
  },
  amusement: {
    name: "Amusement", feel: "Amused", group: 5, family: "happy", kind: "emotion",
    meaning: "Amusement is a quick, playful lift when something unexpected strikes you as funny.",
    ask: "What made me smile recently?",
    try: "A short funny break can help refill your focus before a hard task."
  },
  bittersweetness: {
    name: "Bittersweetness", feel: "Bittersweet", group: 5, family: "sad", kind: "emotion",
    meaning: "Bittersweet is feeling happy and sad at the same time, often while letting go of something good: a season, a place, a stage of life.",
    compare: "It is not being unsure whether you are happy or sad. It is being both.",
    ask: "What am I grateful for in what is ending or changing?"
  },
  nostalgia: {
    name: "Nostalgia", feel: "Nostalgic", group: 5, family: "sad", kind: "emotion",
    meaning: "Nostalgia is a yearning for how things used to be, often in a softened, idealized memory of the past.",
    compare: "It can comfort and connect, but mixed with rumination it can keep us stuck. Fond memories still deserve a gentle fact-check.",
    ask: "What am I missing, and what in my life now could honor it?"
  },
  cognitive_dissonance: {
    name: "Cognitive dissonance", feel: "Conflicted", group: 5, family: "surprised", kind: "experience",
    meaning: "Cognitive dissonance is the tension of holding two beliefs, or a belief and an action, that do not fit together. The urge is to end the discomfort fast, often by dismissing new information.",
    ask: "What new information am I tempted to dismiss because it is uncomfortable?"
  },
  paradox: {
    name: "Paradox", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "A paradox is two things that seem contradictory but are both true, the way light and dark depend on each other. It asks you to hold the tension instead of forcing a choice.",
    ask: "Where could I use 'and' instead of 'or' today?"
  },
  irony: {
    name: "Irony", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "Irony is saying something whose literal meaning is different from, often the opposite of, what you mean.",
    ask: "Is my meaning clear to the person hearing it?"
  },
  sarcasm: {
    name: "Sarcasm", feel: null, group: 5, family: "disgusted", kind: "experience",
    meaning: "Sarcasm is irony aimed at mocking or criticizing. It is easy to misread, especially over text, and it can cut deeper than intended.",
    ask: "Am I using humor to dodge something that needs to be said clearly?"
  },
  anguish: {
    name: "Anguish", feel: "Anguished", group: 6, family: "sad", kind: "emotion",
    meaning: "Anguish is a near-unbearable swirl of shock, disbelief, grief, and powerlessness that can hit the body hard, sometimes literally bringing you to your knees.",
    compare: "The powerlessness is what makes anguish traumatic. It usually needs time, support, and often professional help.",
    ask: "Who can be with me in this?",
    care: "strong"
  },
  hope: {
    name: "Hope", feel: "Hopeful", group: 6, family: "happy", kind: "experience",
    meaning: "Hope is less a feeling than a way of thinking: knowing where you want to go, seeing paths to get there (and backup paths), and believing you can.",
    ask: "What is one realistic goal, one path toward it, and one reason I can do it?"
  },
  hopelessness: {
    name: "Hopelessness", feel: "Hopeless", group: 6, family: "sad", kind: "emotion",
    meaning: "Hopelessness comes from painful events plus the belief that we cannot change things, often with self-blame. The pieces of hope are missing: no clear goal, no visible path, or no belief in yourself.",
    ask: "Is this about one situation or everything? Who could help me see a path?",
    care: "strong"
  },
  despair: {
    name: "Despair", feel: "In despair", group: 6, family: "sad", kind: "emotion",
    meaning: "Despair is hopelessness that has spread to your whole life and future, joined by deep sadness. It can feel like tomorrow will be exactly like today.",
    compare: "Three thoughts often feed it: it is all my fault, it will last forever, it ruins everything. Each one is worth gently questioning.",
    ask: "Is this really permanent, and is it really touching every part of my life?",
    care: "strong"
  },
  sadness: {
    name: "Sadness", feel: "Sad", group: 6, family: "sad", kind: "emotion",
    meaning: "Sadness is a natural response to loss or defeat, real or perceived. It matters: it can make us more thoughtful and generous, and it helps us connect with others who know the same ache.",
    compare: "Sadness is not depression (a lasting cluster of symptoms) and not grief (which holds many emotions at once).",
    ask: "What have I lost, or what am I afraid of losing?"
  },
  grief: {
    name: "Grief", feel: "Grieving", group: 6, family: "sad", kind: "emotion",
    meaning: "Grief is a process, not a single feeling, built from loss, longing, and feeling lost. It does not move in neat stages, and it does not end so much as find a place in your life.",
    ask: "What or whom am I missing, and who could simply be with me in it?"
  },
  compassion: {
    name: "Compassion", feel: "Compassionate", group: 7, family: "happy", kind: "emotion",
    meaning: "Compassion is the practice of recognizing our shared humanity and responding to suffering, yours or someone else's, with kindness and action.",
    compare: "Its look-alike is pity, which feels similar but keeps a distance.",
    ask: "What would kindness toward myself or someone else look like right now?"
  },
  pity: {
    name: "Pity", feel: "Pitying", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Pity is feeling sorry for someone from a distance, as if their suffering has nothing to do with you. It resembles compassion but creates separation.",
    ask: "Am I standing beside this person or looking down at them?"
  },
  empathy: {
    name: "Empathy", feel: "Empathetic", group: 7, family: "happy", kind: "emotion",
    meaning: "Empathy is understanding what someone is feeling and reflecting that back, without having to feel it for them or to have lived the same thing.",
    compare: "Sympathy says, I feel sorry for you. Empathy says, I get it, and you are not alone.",
    ask: "Who in my life needs to be understood rather than fixed?"
  },
  sympathy: {
    name: "Sympathy", feel: "Sympathetic", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Sympathy is feeling sorry for someone from a safe distance. It is usually well meant, but it can land as: this does not happen to people like me.",
    compare: "Sympathy watches from the outside. Empathy sits down next to someone.",
    ask: "How could I move from feeling sorry for someone to being with them?"
  },
  boundaries: {
    name: "Boundaries", feel: null, group: 7, family: "angry", kind: "experience",
    meaning: "Boundaries are being clear about what is okay and what is not okay. They make real compassion possible, because it is hard to be kind to people who are walking all over you.",
    ask: "Is there something I need to say is okay, or not okay, today?"
  },
  comparative_suffering: {
    name: "Comparative suffering", feel: null, group: 7, family: "sad", kind: "experience",
    meaning: "Comparative suffering is ranking pain: telling yourself your struggle does not count because others have it worse. Empathy is not a limited supply; honoring your hurt takes nothing from anyone else.",
    ask: "Am I dismissing my own feelings because someone else has it harder?"
  },
  shame: {
    name: "Shame", feel: "Ashamed", group: 8, family: "sad", kind: "emotion",
    meaning: "Shame is the intensely painful belief that you are flawed and therefore unworthy of love and belonging. It says I am bad, not I did something bad.",
    compare: "Shame grows in secrecy, silence, and judgment. It shrinks when you share it with someone who responds with empathy.",
    ask: "Would I speak to someone I love the way I am speaking to myself? Who could I tell?"
  },
  self_compassion: {
    name: "Self-compassion", feel: null, group: 8, family: "happy", kind: "experience",
    meaning: "Self-compassion has three parts: being kind to yourself when you struggle, remembering that everyone struggles, and noticing your feelings without drowning in them.",
    ask: "What would I say to a friend in my place?",
    try: "Put a hand on your chest and say quietly: This is hard. I am not the only one. May I be kind to myself."
  },
  perfectionism: {
    name: "Perfectionism", feel: null, group: 8, family: "fearful", kind: "experience",
    meaning: "Perfectionism is not striving for excellence. It is the belief that if you look and do everything perfectly, you can avoid shame, judgment, and blame.",
    compare: "Healthy striving asks: how can I improve? Perfectionism asks: what will people think?",
    ask: "What would good enough look like here?"
  },
  guilt: {
    name: "Guilt", feel: "Guilty", group: 8, family: "sad", kind: "emotion",
    meaning: "Guilt is discomfort when something you did, or did not do, clashes with your values. It says I did something bad, and it can move you to apologize or change.",
    compare: "Guilt focuses on behavior and tends to help. Shame focuses on the self and tends to hurt.",
    ask: "Is there something I can make right?"
  },
  remorse: {
    name: "Remorse", feel: "Remorseful", group: 8, family: "sad", kind: "emotion",
    meaning: "Remorse is a kind of guilt: recognizing you have hurt someone, feeling bad about it, and wanting to make amends.",
    ask: "What would a sincere repair look like?"
  },
  humiliation: {
    name: "Humiliation", feel: "Humiliated", group: 8, family: "angry", kind: "emotion",
    meaning: "Humiliation is the painful sense of being unfairly put down, mocked, or demeaned by someone else.",
    compare: "Shame feels deserved. Humiliation feels unjust.",
    ask: "What happened, and who can help me feel my dignity again?"
  },
  embarrassment: {
    name: "Embarrassment", feel: "Embarrassed", group: 8, family: "sad", kind: "emotion",
    meaning: "Embarrassment is brief, self-conscious discomfort after a small slip that others saw. It passes, and later it is often funny.",
    compare: "Embarrassment says: everyone does this. Shame says: something is wrong with me.",
    ask: "Will this matter in a week? Can I laugh at it a little?"
  },
  belonging: {
    name: "Belonging", feel: "Like I belong", group: 9, family: "happy", kind: "emotion",
    meaning: "Belonging is being part of something without having to change who you are. It starts with belonging to yourself.",
    compare: "Fitting in means changing yourself to be accepted. Belonging means being accepted as you are.",
    ask: "Where can I be fully myself today?"
  },
  fitting_in: {
    name: "Fitting in", feel: null, group: 9, family: "fearful", kind: "experience",
    meaning: "Fitting in is changing or hiding parts of yourself to be accepted. It can feel like belonging, but it gets in the way of the real thing.",
    ask: "What am I hiding in order to be accepted?"
  },
  connection: {
    name: "Connection", feel: "Connected", group: 9, family: "happy", kind: "emotion",
    meaning: "Connection is the energy between people when they feel seen, heard, and valued, and can give and receive without judgment.",
    ask: "Who helps me feel seen, and when can I reach out?"
  },
  disconnection: {
    name: "Disconnection", feel: "Disconnected", group: 9, family: "sad", kind: "emotion",
    meaning: "Disconnection is feeling misunderstood, dismissed, excluded, or hurt by someone. It can hurt like physical pain. Small ruptures are normal and can be repaired.",
    ask: "Is there a disconnection I could name and try to repair?"
  },
  insecurity: {
    name: "Insecurity", feel: "Insecure", group: 9, family: "fearful", kind: "emotion",
    meaning: "Insecurity can be about resources (like money or food), about a relationship, or about yourself, when you are overly critical of your weaknesses.",
    compare: "The opposite of personal insecurity is not perfection. It is accepting your weaknesses without harsh judgment.",
    ask: "Which kind of insecurity is this, and what would self-acceptance sound like?"
  },
  invisibility: {
    name: "Invisibility", feel: "Invisible", group: 9, family: "sad", kind: "emotion",
    meaning: "Invisibility is having your humanity or your contribution overlooked, ignored, or treated as unimportant, by a person or by a whole culture.",
    ask: "Where do I need to be seen, and who might I be overlooking?"
  },
  loneliness: {
    name: "Loneliness", feel: "Lonely", group: 9, family: "sad", kind: "emotion",
    meaning: "Loneliness is feeling socially isolated and missing meaningful connection. Like hunger, it is a signal that you need something essential.",
    compare: "Being alone and being lonely are different. Solitude can restore you; loneliness asks you to reach out.",
    ask: "Who is one person I could connect with today, even briefly?"
  },
  love: {
    name: "Love", feel: "Loving", group: 10, family: "happy", kind: "emotion",
    meaning: "Love grows when we let ourselves be deeply seen and known, and when that connection is tended with trust, respect, kindness, and affection.",
    ask: "How can I show love in one small, specific way today?"
  },
  lovelessness: {
    name: "Lovelessness", feel: null, group: 10, family: "sad", kind: "experience",
    meaning: "Lovelessness is the absence of love as a guide, in a person or a culture. When love does not shape our choices, cruelty and injustice get easier.",
    ask: "Where could love guide a decision I am making?"
  },
  heartbreak: {
    name: "Heartbreak", feel: "Heartbroken", group: 10, family: "sad", kind: "emotion",
    meaning: "Heartbreak is the pain of losing love, or believing you have: a relationship ending, a death, a move, even someone you love changing.",
    ask: "What love am I grieving?"
  },
  trust: {
    name: "Trust", feel: "Trusting", group: 10, family: "happy", kind: "experience",
    meaning: "Trust is choosing to risk something you value on another person's actions. It is built in small moments: keeping confidences, doing what you say, owning mistakes, respecting limits, and assuming the best.",
    ask: "Where is trust growing in my relationships, and where does it need care?"
  },
  self_trust: {
    name: "Self-trust", feel: null, group: 10, family: "happy", kind: "experience",
    meaning: "Self-trust is being able to rely on yourself to protect what you value. It is often the first thing to go after a mistake, and it is rebuilt by keeping small promises to yourself.",
    ask: "What is one small promise to myself I can keep today?"
  },
  betrayal: {
    name: "Betrayal", feel: "Betrayed", group: 10, family: "angry", kind: "emotion",
    meaning: "Betrayal is a violation of trust where trust was expected. It can feel like the ground has given way.",
    ask: "What trust was broken, and what do I need now?"
  },
  defensiveness: {
    name: "Defensiveness", feel: "Defensive", group: 10, family: "angry", kind: "emotion",
    meaning: "Defensiveness is protecting a fragile sense of worth when you hear something that challenges how you see yourself. It shows up as excuses, blame, or tuning out.",
    ask: "What might be true in what I am resisting?",
    try: "Relax your hands and let your palms open. Ask the person to say it again so you can really understand."
  },
  flooding: {
    name: "Flooding", feel: "Flooded", group: 10, family: "bad", kind: "emotion",
    meaning: "Flooding is feeling so physically and emotionally overwhelmed during conflict that a productive conversation becomes nearly impossible.",
    ask: "Do I need a break before I keep talking?",
    try: "Call a time-out and say when you will come back to the conversation."
  },
  hurt: {
    name: "Hurt", feel: "Hurt", group: 10, family: "sad", kind: "emotion",
    meaning: "Hurt is sadness at being emotionally wounded plus fear of being hurt again, usually by someone close. It often blends with anger, sadness, or loneliness.",
    compare: "Saying my feelings are hurt invites repair. Reacting with anger usually invites more anger.",
    ask: "Could I tell the person involved that my feelings are hurt?"
  },
  joy: {
    name: "Joy", feel: "Joyful", group: 11, family: "happy", kind: "emotion",
    meaning: "Joy is a sudden, intense feeling of connection, pleasure, and appreciation. It opens you up and makes you feel more like yourself.",
    compare: "Happiness is steadier and more tied to circumstances. Joy is brief, deep, and connected.",
    ask: "Can I pause and take a mental picture of this moment?"
  },
  happiness: {
    name: "Happiness", feel: "Happy", group: 11, family: "happy", kind: "emotion",
    meaning: "Happiness is pleasure tied to your current situation. It is steadier and less intense than joy, and often the result of effort.",
    ask: "What in my circumstances is going well right now?"
  },
  calm: {
    name: "Calm", feel: "Calm", group: 11, family: "happy", kind: "emotion",
    meaning: "Calm is bringing perspective and mindfulness to a situation while keeping your reactions in check. For many people it is a practice more than a personality.",
    ask: "Do I know enough yet to panic? Would panicking help?"
  },
  contentment: {
    name: "Contentment", feel: "Content", group: 11, family: "happy", kind: "emotion",
    meaning: "Contentment is the quiet sense of enough: completeness and appreciation when your needs are met.",
    compare: "Contentment often follows finishing something. Tranquility is enjoying doing nothing.",
    ask: "What do I already have that is enough?"
  },
  gratitude: {
    name: "Gratitude", feel: "Grateful", group: 11, family: "happy", kind: "emotion",
    meaning: "Gratitude is deep appreciation for what you value, what gives life meaning, and what connects you to yourself and others. It grows most as a practice.",
    ask: "What is one thing I am grateful for right now?"
  },
  foreboding_joy: {
    name: "Foreboding joy", feel: "Waiting for the other shoe to drop", group: 11, family: "fearful", kind: "emotion",
    meaning: "Foreboding joy is when a good moment brings a shiver of fear, and you start imagining what could go wrong to protect yourself. Almost everyone does it.",
    compare: "People who lean into joy use that shiver as a cue for gratitude instead of rehearsing disaster.",
    ask: "Can I let this good thing be good, and say thank you for it?"
  },
  relief: {
    name: "Relief", feel: "Relieved", group: 11, family: "happy", kind: "emotion",
    meaning: "Relief is tension leaving the body and breathing easier, with a sense that the worst is over for now.",
    ask: "What just lifted, and can I let my body register it?",
    try: "Take one slow, deliberate sigh. It helps the body reset."
  },
  tranquility: {
    name: "Tranquility", feel: "Tranquil", group: 11, family: "happy", kind: "emotion",
    meaning: "Tranquility is the peaceful feeling of no demands and no pressure to do anything. Nature and quiet help it along.",
    ask: "Where can I find five minutes without demands today?"
  },
  anger: {
    name: "Anger", feel: "Angry", group: 12, family: "angry", kind: "emotion",
    meaning: "Anger comes when something blocks what we want or breaks how things should be, and we believe something can be done. It is an action emotion.",
    compare: "Anger is often an indicator light that other feelings, like hurt, fear, grief, or shame, need checking. It can also be a fitting response to injustice: a strong spark for change, but an exhausting companion.",
    ask: "What else might be under this anger? What is it asking me to change?"
  },
  contempt: {
    name: "Contempt", feel: "Contemptuous", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Contempt is looking down on someone as lesser, a mix of anger and disgust. It shows up as mockery, eye-rolling, and sneering, and it wears relationships down fast.",
    ask: "Is there someone I have written off, and what would it take to see them as a person again?"
  },
  disgust: {
    name: "Disgust", feel: "Disgusted", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Disgust is aversion toward something that feels offensive or toxic: a smell, a behavior, or an idea.",
    compare: "Disgust protects us from real toxins, but aimed at people it can quickly turn dehumanizing.",
    ask: "Is this disgust protecting me, or pushing someone outside my circle of care?"
  },
  dehumanization: {
    name: "Dehumanization", feel: null, group: 12, family: "disgusted", kind: "experience",
    meaning: "Dehumanization is the process of seeing people as less than human, often starting with language that compares them to things we find disgusting. It makes cruelty easier.",
    ask: "Am I using, or nodding along to, language that makes people seem less human?"
  },
  hate: {
    name: "Hate", feel: "Hateful", group: 12, family: "angry", kind: "emotion",
    meaning: "Hate combines feelings like disgust, anger, fear, and contempt toward people seen as malicious and unable to change. It grows with distance and can create a false bond with others who hate the same people.",
    ask: "Who am I only seeing from far away?"
  },
  self_righteousness: {
    name: "Self-righteousness", feel: "Self-righteous", group: 12, family: "angry", kind: "emotion",
    meaning: "Self-righteousness is the conviction that your beliefs and behavior are the most correct, with little room for other views.",
    compare: "Righteous anger responds to real injustice. Self-righteous anger mostly makes us feel superior.",
    ask: "Is my outrage about the harm, or about feeling better than someone?"
  },
  pride: {
    name: "Pride", feel: "Proud", group: 13, family: "happy", kind: "emotion",
    meaning: "Pride is pleasure or celebration about your accomplishments or efforts, or someone else's. Healthy pride is good for you.",
    compare: "Pride is earned and grounded. Hubris is inflated and needs to dominate.",
    ask: "What effort am I proud of, even if the result is not finished?"
  },
  hubris: {
    name: "Hubris", feel: "Superior", group: 13, family: "angry", kind: "emotion",
    meaning: "Hubris is an inflated sense of your own abilities, driven more by a need to dominate than by real accomplishment. Shame often sits underneath it.",
    ask: "Do I want to be right, or do I want to learn?"
  },
  humility: {
    name: "Humility", feel: "Humble", group: 13, family: "happy", kind: "emotion",
    meaning: "Humility is openness to learning plus an honest, balanced view of your strengths, flaws, and room to grow. It is not putting yourself down.",
    ask: "What could I learn today from someone else?"
  }
};
