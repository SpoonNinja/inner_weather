// js/data/atlas.js
// Emotions and experiences, grouped the way Atlas of the Heart (Brené Brown, 2021) groups them.
// All wording below is an original paraphrase of the book's ideas, written for this app. Do not replace it with quotes from the book.
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
    meaning: "Stress is our body and mind reacting to demands that feel bigger than our ability to cope, especially when things feel unpredictable or out of our control. Brown compares it to a slammed restaurant shift: you're busy and behind, but still keeping up.",
    compare: "Stress is being behind but still in the game. Overwhelm is when it is so much that you cannot think straight or function.",
    ask: "What exactly feels like more than I can handle right now?",
    try: "Name the one thing that matters most in the next hour. Put everything else on a list for later."
  },
  overwhelm: {
    name: "Overwhelm", feel: "Overwhelmed", group: 1, family: "bad", kind: "emotion",
    meaning: "Overwhelm is stress past its limit: so much emotion and activity that we can't think clearly or function. In the restaurant picture, it's falling so far behind that you freeze. It usually calls for real rest and a pause, not a better plan.",
    compare: "In overwhelm, feelings run high while clarity runs low, which makes decisions harder. It usually calls for a pause before a plan.",
    ask: "Can I give myself a few minutes of doing nothing before I try to solve anything?",
    try: "Take five to ten minutes of real non-doing: step outside, drink some water, look at something far away. Then choose one small next step."
  },
  anxiety: {
    name: "Anxiety", feel: "Anxious", group: 1, family: "fearful", kind: "emotion",
    meaning: "Anxiety is worry, tension, and physical unease about what might happen, fed by uncertainty and a sense that we can't control it. It can be a passing state or a lasting trait. Brown notes that struggling to tolerate uncertainty is a big part of what keeps it going.",
    compare: "Anxiety and excitement feel almost the same in the body. The name you give the feeling can change how the next hour goes.",
    ask: "Is this anxiety, or could some of it be excitement?",
    try: "Take one slow breath and ask whether this energy could be pointed at something you care about. If anxiety is constant or getting in the way of life, a counselor or doctor can help."
  },
  worry: {
    name: "Worry", feel: "Worried", group: 1, family: "fearful", kind: "experience",
    meaning: "Worry is the thinking side of anxiety: a chain of negative what-if thoughts about bad things that could happen. It feels productive but rarely helps, and trying to push it away tends to make it louder.",
    compare: "Worry feels useful but rarely solves anything, and trying to shove worried thoughts away tends to make them louder.",
    ask: "What feeling is underneath this worry, and what does it need from me?",
    try: "Write the worry in one sentence. Then write one thing about it that is within your control."
  },
  avoidance: {
    name: "Avoidance", feel: null, group: 1, family: "fearful", kind: "experience",
    meaning: "Avoidance is one of the most common ways we cope with anxiety: we steer clear of what scares us. It brings quick relief but keeps the fear in place, and it costs us the chance to learn we could have handled it.",
    ask: "What am I avoiding right now, and what is the smallest way to face it?",
    try: "Do two minutes of the thing you have been avoiding. Just two."
  },
  excitement: {
    name: "Excitement", feel: "Excited", group: 1, family: "surprised", kind: "emotion",
    meaning: "Excitement is an energized state of enthusiasm and eagerness, usually about something we're looking forward to. In the body it can feel almost identical to anxiety, and calling it excitement can change how we show up.",
    compare: "Same body sensations as anxiety, read as something good.",
    ask: "What am I looking forward to, and how can I let myself enjoy it?"
  },
  dread: {
    name: "Dread", feel: "Dread", group: 1, family: "fearful", kind: "emotion",
    meaning: "Dread is anticipating something unpleasant that we expect to happen, and it tends to grow as the moment gets closer. It's a close relative of anxiety and worry.",
    compare: "Dread and anxiety live in the future. Fear is about a threat that is here now.",
    ask: "Is the waiting worse than the thing itself would be?",
    try: "If you can, do the dreaded thing sooner, or put it on the calendar so it stops following you around."
  },
  fear: {
    name: "Fear", feel: "Afraid", group: 1, family: "fearful", kind: "emotion",
    meaning: "Fear is a short-lived response to a threat we perceive right now or just ahead, whether physical or social. It often sets off fight, flight, or freeze before we have words for what's happening.",
    compare: "Fear is about now. Anxiety and dread are about later.",
    ask: "What feels threatened right now, and am I actually in danger?",
    try: "Feel your feet on the floor and make your exhale longer than your inhale. Let your thinking catch up with your body."
  },
  vulnerability: {
    name: "Vulnerability", feel: "Vulnerable", group: 1, family: "sad", kind: "emotion",
    meaning: "Brown describes vulnerability as the emotion of uncertainty, risk, and emotional exposure. It isn't weakness; it's where courage, love, belonging, and creativity begin. And it isn't oversharing: it's sharing with people who have earned the right to hear it.",
    compare: "Vulnerability is not weakness; courage is not possible without it. It is also not oversharing. It is sharing with people who have earned it.",
    ask: "What am I risking by showing up today, and is it worth it to me?",
    try: "Finish this sentence on paper: This feels vulnerable because..."
  },
  comparison: {
    name: "Comparison", feel: null, group: 2, family: "fearful", kind: "experience",
    meaning: "Comparison isn't an emotion but a pattern of ranking ourselves against others, often without noticing. Brown points out that it pulls two ways at once: be like everyone else, and be better than everyone else.",
    ask: "Whose lane am I watching instead of my own?",
    try: "Silently wish the person you are comparing yourself to well, then bring your attention back to your own next step."
  },
  admiration: {
    name: "Admiration", feel: "Admiring", group: 2, family: "happy", kind: "emotion",
    meaning: "Admiration is feeling inspired and warmed by someone's abilities, accomplishments, or character, or by art and nature. It moves us toward growing ourselves rather than wanting what they have.",
    compare: "Admiration pulls you toward a better version of yourself. Reverence pulls you toward connection with something greater.",
    ask: "What in this person or thing do I want to grow in myself?"
  },
  reverence: {
    name: "Reverence", feel: "Reverent", group: 2, family: "surprised", kind: "emotion",
    meaning: "Reverence is deep respect mixed with love and humility for something we experience as sacred or bigger than ourselves. Where admiration inspires growth, reverence draws us toward connection with something greater.",
    ask: "What feels sacred to me right now, and how can I move closer to it?"
  },
  envy: {
    name: "Envy", feel: "Envious", group: 2, family: "angry", kind: "emotion",
    meaning: "Envy is wanting something another person has. It can come with a hostile wish for them to lose it, or it can be benign. It usually involves two people and grows out of comparison.",
    compare: "Envy is wanting what another person has. Jealousy is fearing you will lose something you already have to someone else.",
    ask: "What do I actually want here, and do I need them to lose it for me to have it?"
  },
  jealousy: {
    name: "Jealousy", feel: "Jealous", group: 2, family: "angry", kind: "emotion",
    meaning: "Jealousy is the fear of losing a relationship, or a valued part of one, to someone else. It usually involves three people and often shows up as a mix of anger, fear, and sadness.",
    compare: "Jealousy is about keeping what you have. Envy is about wanting what someone else has.",
    ask: "What am I afraid of losing, and what conversation might I need to have?"
  },
  resentment: {
    name: "Resentment", feel: "Resentful", group: 2, family: "angry", kind: "emotion",
    meaning: "Resentment mixes frustration, judgment, anger, and a sense of unfairness. Brown was surprised to find it belongs in the envy family rather than anger: we often resent people for doing what we wish we felt free to do.",
    compare: "Resentment is often closer to envy than to anger. Being annoyed that someone is resting can really mean you want rest too.",
    ask: "What do I need that I have been afraid to ask for?",
    try: "Notice any critical speech you are rehearsing in your head. Swap it for one honest request."
  },
  schadenfreude: {
    name: "Schadenfreude", feel: "Pleased at someone's misfortune", group: 2, family: "disgusted", kind: "emotion",
    meaning: "Schadenfreude is pleasure at someone else's misfortune. Research links it to envy, feeling inferior, and wanting to feel better about ourselves, and it shows up most toward people we see as rivals or on the other side.",
    compare: "Feeling relieved when someone is held accountable for real harm is different. That usually comes from caring about the people who were hurt.",
    ask: "Does this pleasure fit the person I want to be?"
  },
  freudenfreude: {
    name: "Freudenfreude", feel: "Glad for someone", group: 2, family: "happy", kind: "emotion",
    meaning: "Freudenfreude is enjoying someone else's success. It's the opposite of schadenfreude, and it grows when we make a habit of celebrating others and letting them celebrate us.",
    ask: "Whose good news could I celebrate today?",
    try: "When someone shares good news, ask a follow-up question. When someone celebrates yours, thank them for it."
  },
  boredom: {
    name: "Boredom", feel: "Bored", group: 3, family: "bad", kind: "emotion",
    meaning: "Boredom is the uncomfortable state of wanting to engage in something satisfying and not being able to. Brown notes it can be useful: a bored, wandering mind is often where creativity and daydreams begin.",
    compare: "Boredom with little control tends toward frustration; boredom with lots of control tends toward sluggishness. A quiet, bored mind is also where daydreams and new ideas show up.",
    ask: "Does this moment need more challenge, more meaning, or just room for my mind to wander?",
    try: "Either raise the challenge (set a timer, add a constraint) or put the phone down and let your mind drift for five minutes."
  },
  disappointment: {
    name: "Disappointment", feel: "Disappointed", group: 3, family: "sad", kind: "emotion",
    meaning: "Disappointment is unmet expectations. The more significant the expectation, the bigger the disappointment, and the ones we never said out loud are often the hardest.",
    compare: "Disappointed: it did not go how I wanted, and it felt out of my control. Regretful: it did not go how I wanted, and my choices played a part.",
    ask: "What was I expecting, and did I ever say it out loud?"
  },
  expectations: {
    name: "Expectations", feel: null, group: 3, family: "sad", kind: "experience",
    meaning: "Expectations are the pictures we paint in our heads of how things will go, including how other people will act. Brown calls the unspoken ones stealth expectations, and they set us up for the most disappointment.",
    ask: "What picture of today am I holding, and how much of it depends on things I cannot control?",
    try: "Say or write your expectation for the next hour. Is it realistic? Is it yours to control? Does anyone else need to hear it?"
  },
  regret: {
    name: "Regret", feel: "Regretful", group: 3, family: "sad", kind: "emotion",
    meaning: "Regret combines disappointment with responsibility: things didn't go how we wanted, and we believe our choices played a part. Brown sees it as a fair but tough teacher that can point us toward empathy, courage, and growth.",
    compare: "Regret can be a fair but tough teacher, pointing toward growth, amends, or more courage next time.",
    ask: "What is this regret trying to teach me?"
  },
  discouragement: {
    name: "Discouragement", feel: "Discouraged", group: 3, family: "sad", kind: "emotion",
    meaning: "Discouragement is losing confidence and enthusiasm for continuing to try. We may still believe in the goal, but our motivation is dipping.",
    compare: "Discouraged means the motivation to keep going is slipping. Resigned means it feels gone.",
    ask: "What would make the next attempt feel possible, even if it is small?"
  },
  resignation: {
    name: "Resignation", feel: "Resigned", group: 3, family: "sad", kind: "emotion",
    meaning: "Resignation is feeling there's no point in trying anymore. It goes further than discouragement: the effort itself has stopped.",
    compare: "Resigned is further along than discouraged: the effort has stopped, not just slowed.",
    ask: "Is there one small piece of this I still care about?"
  },
  frustration: {
    name: "Frustration", feel: "Frustrated", group: 3, family: "angry", kind: "emotion",
    meaning: "Frustration is feeling blocked from what we want by something we believe we can't change or control. It's close to anger, but anger comes with a sense that something can be done.",
    compare: "Frustration and anger both come from being blocked. With frustration we feel we cannot fix it; with anger we feel something can be done.",
    ask: "What part of this is actually within my control?"
  },
  awe: {
    name: "Awe", feel: "In awe", group: 4, family: "surprised", kind: "emotion",
    meaning: "Awe is the feeling of being in the presence of something vast that goes beyond our understanding of the world. It tends to make us feel small but connected, and it often makes us kinder and more generous.",
    compare: "Wonder makes you want to understand. Awe makes you want to step back and let the thing shine.",
    ask: "What is something larger than me that I can notice today?"
  },
  wonder: {
    name: "Wonder", feel: "Full of wonder", group: 4, family: "surprised", kind: "emotion",
    meaning: "Wonder is being struck by something that sparks our curiosity and makes us want to understand it. Awe asks us to step back and take it in; wonder invites us to lean in and explore.",
    compare: "Wonder leans in with questions. Awe stands back in appreciation.",
    ask: "What do I want to understand more deeply?"
  },
  confusion: {
    name: "Confusion", feel: "Confused", group: 4, family: "surprised", kind: "emotion",
    meaning: "Confusion is uncertainty about what's happening or what to do next. In learning, a manageable amount is a good sign: it slows us down and pushes us to think harder. Too much tips into frustration.",
    compare: "A little confusion fuels deep learning. Too much tips into frustration or giving up.",
    ask: "Is this the good kind of confusion that means I am learning, or do I need help or a smaller step?",
    try: "Write down exactly what you do not understand yet. Then ask for help or break it into one smaller question."
  },
  curiosity: {
    name: "Curiosity", feel: "Curious", group: 4, family: "happy", kind: "emotion",
    meaning: "Curiosity is noticing a gap in our knowledge about something that interests us and becoming invested, heart and mind, in closing it. Brown notes it takes courage, because it can lead us somewhere uncomfortable.",
    compare: "Interest is an open mind. Curiosity adds an emotional pull to find out.",
    ask: "What question do I want answered today?"
  },
  interest: {
    name: "Interest", feel: "Interested", group: 4, family: "happy", kind: "emotion",
    meaning: "Interest is an openness toward something that has caught our attention. It can grow into curiosity once we notice a gap we want to fill.",
    compare: "Interest can grow into curiosity once you notice something you want to know.",
    ask: "What here has caught my attention?"
  },
  surprise: {
    name: "Surprise", feel: "Surprised", group: 4, family: "surprised", kind: "emotion",
    meaning: "Surprise happens when something doesn't match what we expected. It's the shortest of the emotions, lasting only a moment, and it tends to intensify whatever we feel next.",
    ask: "What just changed my expectations, and what am I feeling now that the jolt has passed?"
  },
  amusement: {
    name: "Amusement", feel: "Amused", group: 5, family: "happy", kind: "emotion",
    meaning: "Amusement is a light, pleasurable feeling that comes from something funny or unexpected. It relaxes us and can help us recover from stress.",
    ask: "What made me smile recently?",
    try: "A short funny break can help refill your focus before a hard task."
  },
  bittersweetness: {
    name: "Bittersweetness", feel: "Bittersweet", group: 5, family: "sad", kind: "emotion",
    meaning: "Bittersweetness is feeling happiness and sadness at the same time, often during a transition like a graduation, a move, or the end of a season. It isn't being unsure; it's being both, fully.",
    compare: "It is not being unsure whether you are happy or sad. It is being both.",
    ask: "What am I grateful for in what is ending or changing?"
  },
  nostalgia: {
    name: "Nostalgia", feel: "Nostalgic", group: 5, family: "sad", kind: "emotion",
    meaning: "Nostalgia is a yearning for the way things used to be, usually an idealized version of the past. It can comfort and connect us, or trap us when it insists things were better than they were.",
    compare: "It can comfort and connect, but mixed with rumination it can keep us stuck. Fond memories still deserve a gentle fact-check.",
    ask: "What am I missing, and what in my life now could honor it?"
  },
  cognitive_dissonance: {
    name: "Cognitive dissonance", feel: "Conflicted", group: 5, family: "surprised", kind: "experience",
    meaning: "Cognitive dissonance is the discomfort of holding beliefs, values, or actions that conflict with each other. We tend to resolve it fast, often by dismissing the new information instead of changing our minds.",
    ask: "What new information am I tempted to dismiss because it is uncomfortable?"
  },
  paradox: {
    name: "Paradox", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "A paradox is two things that seem contradictory but are both true. Brown treats holding paradox as a way of making room for complexity instead of forcing either/or thinking.",
    ask: "Where could I use 'and' instead of 'or' today?"
  },
  irony: {
    name: "Irony", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "Irony is saying something whose literal meaning is the opposite of what we mean, often with humor. It depends on shared understanding to land.",
    ask: "Is my meaning clear to the person hearing it?"
  },
  sarcasm: {
    name: "Sarcasm", feel: null, group: 5, family: "disgusted", kind: "experience",
    meaning: "Sarcasm is irony used to mock or show contempt. The word traces back to a Greek root meaning to tear flesh, and it often hides real anger or hurt behind a joke.",
    ask: "Am I using humor to dodge something that needs to be said clearly?"
  },
  anguish: {
    name: "Anguish", feel: "Anguished", group: 6, family: "sad", kind: "emotion",
    meaning: "Anguish combines shock, disbelief, grief, and powerlessness into something that feels nearly unbearable. It can hit the body so hard it brings us to our knees, and it needs support and time rather than quick fixes.",
    compare: "The powerlessness is what makes anguish traumatic. It usually needs time, support, and often professional help.",
    ask: "Who can be with me in this?",
    care: "strong"
  },
  hope: {
    name: "Hope", feel: "Hopeful", group: 6, family: "happy", kind: "experience",
    meaning: "Drawing on C. R. Snyder's research, Brown describes hope not as an emotion but as a way of thinking: having realistic goals, seeing pathways to reach them, and believing we can. Hope is learned, which means it can be taught.",
    ask: "What is one realistic goal, one path toward it, and one reason I can do it?"
  },
  hopelessness: {
    name: "Hopelessness", feel: "Hopeless", group: 6, family: "sad", kind: "emotion",
    meaning: "Hopelessness comes from painful experiences combined with the belief that we can't change things. It's what happens when the pieces of hope go missing: we can't see a goal, a path, or our own ability to get there.",
    ask: "Is this about one situation or everything? Who could help me see a path?",
    care: "strong"
  },
  despair: {
    name: "Despair", feel: "In despair", group: 6, family: "sad", kind: "emotion",
    meaning: "Despair is hopelessness about everything: the sense that tomorrow and the days after will be just like today. Research points to three thoughts that feed it: it's all my fault, it will last forever, and it touches every part of my life.",
    compare: "Three thoughts often feed it: it is all my fault, it will last forever, it ruins everything. Each one is worth gently questioning.",
    ask: "Is this really permanent, and is it really touching every part of my life?",
    care: "strong"
  },
  sadness: {
    name: "Sadness", feel: "Sad", group: 6, family: "sad", kind: "emotion",
    meaning: "Sadness is a response to loss or defeat. Brown stresses that it's essential, not something to avoid: it's tied to empathy and connection, and our capacity for sadness is part of our capacity for joy.",
    compare: "Sadness is not depression (a lasting cluster of symptoms) and not grief (which holds many emotions at once).",
    ask: "What have I lost, or what am I afraid of losing?"
  },
  grief: {
    name: "Grief", feel: "Grieving", group: 6, family: "sad", kind: "emotion",
    meaning: "Grief is a process built on loss, longing, and feeling lost. We don't only grieve deaths; we grieve relationships, changes, and futures we imagined. It doesn't move in tidy stages.",
    ask: "What or whom am I missing, and who could simply be with me in it?"
  },
  compassion: {
    name: "Compassion", feel: "Compassionate", group: 7, family: "happy", kind: "emotion",
    meaning: "Compassion means seeing the humanity we share and letting that move us to meet suffering, ours or anyone's, with kindness and action. Brown calls pity its near enemy: it looks similar, but it creates distance.",
    compare: "Its look-alike is pity, which feels similar but keeps a distance.",
    ask: "What would kindness toward myself or someone else look like right now?"
  },
  pity: {
    name: "Pity", feel: "Pitying", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Pity is feeling sorry for someone while keeping them at a distance, often with a quiet sense that we're better off. It's the near enemy of compassion: it looks similar but separates us.",
    ask: "Am I standing beside this person or looking down at them?"
  },
  empathy: {
    name: "Empathy", feel: "Empathetic", group: 7, family: "happy", kind: "emotion",
    meaning: "Empathy is a set of skills for understanding what someone is experiencing and reflecting that understanding back. It isn't feeling for someone, and we don't need to have lived their experience; we connect to the feeling underneath it.",
    compare: "Sympathy says, I feel sorry for you. Empathy says, I get it, and you are not alone.",
    ask: "Who in my life needs to be understood rather than fixed?"
  },
  sympathy: {
    name: "Sympathy", feel: "Sympathetic", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Sympathy is feeling sorry for someone from a safe distance. It's usually well meant, but it can communicate that we're not in it with them. It's the near enemy of empathy.",
    compare: "Sympathy watches from the outside. Empathy sits down next to someone.",
    ask: "How could I move from feeling sorry for someone to being with them?"
  },
  boundaries: {
    name: "Boundaries", feel: null, group: 7, family: "angry", kind: "experience",
    meaning: "Boundaries are simply what's okay and what's not okay. Brown's research found that the most compassionate people are also the most boundaried, because it's hard to stay kind to people who take advantage of us.",
    ask: "Is there something I need to say is okay, or not okay, today?"
  },
  comparative_suffering: {
    name: "Comparative suffering", feel: null, group: 7, family: "sad", kind: "experience",
    meaning: "Comparative suffering is ranking our pain against other people's and deciding ours doesn't count. Brown points out that empathy isn't a limited resource: honoring our own hurt takes nothing away from anyone else.",
    ask: "Am I dismissing my own feelings because someone else has it harder?"
  },
  shame: {
    name: "Shame", feel: "Ashamed", group: 8, family: "sad", kind: "emotion",
    meaning: "Shame is the deeply painful sense that something is wrong with us, so wrong that we don't deserve love or belonging. It says \"I am bad\" rather than \"I did something bad.\" It grows in secrecy, silence, and judgment, and it can't survive empathy.",
    compare: "Shame grows in secrecy, silence, and judgment. It shrinks when you share it with someone who responds with empathy.",
    ask: "Would I speak to someone I love the way I am speaking to myself? Who could I tell?"
  },
  self_compassion: {
    name: "Self-compassion", feel: null, group: 8, family: "happy", kind: "experience",
    meaning: "Drawing on Kristin Neff's work, Brown describes self-compassion as three things: kindness toward ourselves instead of judgment, remembering our common humanity instead of feeling alone, and noticing our feelings with mindfulness instead of drowning in them.",
    ask: "What would I say to a friend in my place?",
    try: "Put a hand on your chest and say quietly: This is hard. I am not the only one. May I be kind to myself."
  },
  perfectionism: {
    name: "Perfectionism", feel: null, group: 8, family: "fearful", kind: "experience",
    meaning: "Perfectionism isn't striving for excellence. It's a defensive belief that if we look and do everything perfectly, we can avoid or minimize shame, judgment, and blame. Healthy striving asks how I can improve; perfectionism asks what people will think.",
    compare: "Healthy striving asks: how can I improve? Perfectionism asks: what will people think?",
    ask: "What would good enough look like here?"
  },
  guilt: {
    name: "Guilt", feel: "Guilty", group: 8, family: "sad", kind: "emotion",
    meaning: "Guilt is the discomfort of holding something we did, or didn't do, up against our values. It says \"I did something bad,\" and it tends to move us toward apology, repair, and change.",
    compare: "Guilt focuses on behavior and tends to help. Shame focuses on the self and tends to hurt.",
    ask: "Is there something I can make right?"
  },
  remorse: {
    name: "Remorse", feel: "Remorseful", group: 8, family: "sad", kind: "emotion",
    meaning: "Remorse is guilt moving toward repair: recognizing we've caused harm, feeling real sorrow about it, and wanting to make amends.",
    ask: "What would a sincere repair look like?"
  },
  humiliation: {
    name: "Humiliation", feel: "Humiliated", group: 8, family: "angry", kind: "emotion",
    meaning: "Humiliation is the painful feeling of being unjustly put down, ridiculed, or degraded. Unlike shame, we don't believe we deserved it.",
    compare: "Shame feels deserved. Humiliation feels unjust.",
    ask: "What happened, and who can help me feel my dignity again?"
  },
  embarrassment: {
    name: "Embarrassment", feel: "Embarrassed", group: 8, family: "sad", kind: "emotion",
    meaning: "Embarrassment is a brief, self-conscious discomfort when something we did is seen by others. Unlike shame, we know we're not alone: everyone does this, and it's often funny later.",
    compare: "Embarrassment says: everyone does this. Shame says: something is wrong with me.",
    ask: "Will this matter in a week? Can I laugh at it a little?"
  },
  belonging: {
    name: "Belonging", feel: "Like I belong", group: 9, family: "happy", kind: "emotion",
    meaning: "Belonging is being part of something bigger than ourselves without having to change who we are. Brown's research found it starts with belonging to ourselves, and that fitting in is actually one of its biggest barriers.",
    compare: "Fitting in means changing yourself to be accepted. Belonging means being accepted as you are.",
    ask: "Where can I be fully myself today?"
  },
  fitting_in: {
    name: "Fitting in", feel: null, group: 9, family: "fearful", kind: "experience",
    meaning: "Fitting in is sizing up a group and changing ourselves to be accepted. It can feel like belonging, but it's closer to the opposite: true belonging never asks us to change who we are.",
    ask: "What am I hiding in order to be accepted?"
  },
  connection: {
    name: "Connection", feel: "Connected", group: 9, family: "happy", kind: "emotion",
    meaning: "Connection is the energy between people when each feels seen, heard, and valued, and when both can give and receive without judgment. We come away from real connection stronger.",
    ask: "Who helps me feel seen, and when can I reach out?"
  },
  disconnection: {
    name: "Disconnection", feel: "Disconnected", group: 9, family: "sad", kind: "emotion",
    meaning: "Disconnection is feeling dismissed, misunderstood, or excluded by someone. Research shows social pain registers in the brain much like physical pain. Small ruptures are normal, and they can be repaired.",
    ask: "Is there a disconnection I could name and try to repair?"
  },
  insecurity: {
    name: "Insecurity", feel: "Insecure", group: 9, family: "fearful", kind: "emotion",
    meaning: "Insecurity can be about resources, relationships, or ourselves. Personal insecurity often means being overly critical of our weaknesses, and its opposite isn't perfection but self-acceptance.",
    compare: "The opposite of personal insecurity is not perfection. It is accepting your weaknesses without harsh judgment.",
    ask: "Which kind of insecurity is this, and what would self-acceptance sound like?"
  },
  invisibility: {
    name: "Invisibility", feel: "Invisible", group: 9, family: "sad", kind: "emotion",
    meaning: "Invisibility is having our humanity or our contributions ignored, overlooked, or erased, by people or by systems. It's a painful form of disconnection that can feel dehumanizing.",
    ask: "Where do I need to be seen, and who might I be overlooking?"
  },
  loneliness: {
    name: "Loneliness", feel: "Lonely", group: 9, family: "sad", kind: "emotion",
    meaning: "Loneliness is perceived social isolation. Drawing on John Cacioppo's research, Brown describes it as a biological signal like hunger or thirst, a warning that we need connection. Being alone and being lonely aren't the same thing.",
    compare: "Being alone and being lonely are different. Solitude can restore you; loneliness asks you to reach out.",
    ask: "Who is one person I could connect with today, even briefly?"
  },
  love: {
    name: "Love", feel: "Loving", group: 10, family: "happy", kind: "emotion",
    meaning: "Love grows when we allow ourselves to be deeply seen and known, and when that connection is tended with trust, respect, kindness, and affection. For Brown, love is less something we have than something we practice.",
    ask: "How can I show love in one small, specific way today?"
  },
  lovelessness: {
    name: "Lovelessness", feel: null, group: 10, family: "sad", kind: "experience",
    meaning: "Drawing on bell hooks, Brown describes lovelessness as the absence of love as a guiding force. When love stops shaping our choices, domination and cruelty start to feel normal.",
    ask: "Where could love guide a decision I am making?"
  },
  heartbreak: {
    name: "Heartbreak", feel: "Heartbroken", group: 10, family: "sad", kind: "emotion",
    meaning: "Heartbreak is what happens when love is lost, or we believe it is. It's grief tied specifically to love, and it can come from a breakup, a death, a betrayal, or someone we love changing.",
    ask: "What love am I grieving?"
  },
  trust: {
    name: "Trust", feel: "Trusting", group: 10, family: "happy", kind: "experience",
    meaning: "Brown describes trust as choosing to risk something we value on another person's actions. She breaks it into seven parts she calls BRAVING: boundaries, reliability, accountability, the vault (keeping confidences), integrity, nonjudgment, and generosity.",
    ask: "Where is trust growing in my relationships, and where does it need care?"
  },
  self_trust: {
    name: "Self-trust", feel: null, group: 10, family: "happy", kind: "experience",
    meaning: "Self-trust is BRAVING turned inward: keeping our own boundaries, being reliable to ourselves, owning our mistakes, acting with integrity, not judging ourselves for needing help, and offering ourselves generosity. It's often the first thing to go after a failure.",
    ask: "What is one small promise to myself I can keep today?"
  },
  betrayal: {
    name: "Betrayal", feel: "Betrayed", group: 10, family: "angry", kind: "emotion",
    meaning: "Betrayal is a violation of trust where trust was expected. Brown notes the most common kind isn't dramatic but quiet: someone slowly disengaging and no longer caring, investing, or showing up.",
    ask: "What trust was broken, and what do I need now?"
  },
  defensiveness: {
    name: "Defensiveness", feel: "Defensive", group: 10, family: "angry", kind: "emotion",
    meaning: "Defensiveness is a way of protecting our ego and a fragile sense of self-worth when we hear feedback. It keeps us from hearing what might be true, and grounded confidence makes it easier to stay open.",
    ask: "What might be true in what I am resisting?",
    try: "Relax your hands and let your palms open. Ask the person to say it again so you can really understand."
  },
  flooding: {
    name: "Flooding", feel: "Flooded", group: 10, family: "bad", kind: "emotion",
    meaning: "Flooding, a term from John Gottman's research, is feeling so physically and emotionally overwhelmed during conflict that we can't take in information or respond well. The remedy is a real break, usually at least twenty minutes.",
    ask: "Do I need a break before I keep talking?",
    try: "Call a time-out and say when you will come back to the conversation."
  },
  hurt: {
    name: "Hurt", feel: "Hurt", group: 10, family: "sad", kind: "emotion",
    meaning: "Hurt combines sadness at being emotionally wounded with fear of being vulnerable to harm again. Brown notes we often show anger instead, because it feels safer than admitting we're hurt.",
    compare: "Saying my feelings are hurt invites repair. Reacting with anger usually invites more anger.",
    ask: "Could I tell the person involved that my feelings are hurt?"
  },
  joy: {
    name: "Joy", feel: "Joyful", group: 11, family: "happy", kind: "emotion",
    meaning: "Joy is an intense, sudden feeling of connection, pleasure, and appreciation. Brown found that gratitude is the practice that invites it in, and that it's usually found in ordinary moments.",
    compare: "Happiness is steadier and more tied to circumstances. Joy is brief, deep, and connected.",
    ask: "Can I pause and take a mental picture of this moment?"
  },
  happiness: {
    name: "Happiness", feel: "Happy", group: 11, family: "happy", kind: "emotion",
    meaning: "Happiness is steadier and longer-lasting than joy, and more tied to our circumstances and our efforts. It's the pleasure of things going well.",
    ask: "What in my circumstances is going well right now?"
  },
  calm: {
    name: "Calm", feel: "Calm", group: 11, family: "happy", kind: "emotion",
    meaning: "Brown describes calm as bringing perspective and mindfulness to a situation while managing our emotional reactivity. It's a practice more than a personality trait, and it's contagious, just like anxiety.",
    ask: "Do I know enough yet to panic? Would panicking help?"
  },
  contentment: {
    name: "Contentment", feel: "Content", group: 11, family: "happy", kind: "emotion",
    meaning: "Contentment is the feeling of completeness, appreciation, and enough that comes when our needs are met. It often follows finishing something.",
    compare: "Contentment often follows finishing something. Tranquility is enjoying doing nothing.",
    ask: "What do I already have that is enough?"
  },
  gratitude: {
    name: "Gratitude", feel: "Grateful", group: 11, family: "happy", kind: "emotion",
    meaning: "Gratitude is deep appreciation for what we value, what gives life meaning, and what makes us feel connected. Brown's research found that it's the practice of gratitude, not just the feeling, that makes the difference.",
    ask: "What is one thing I am grateful for right now?"
  },
  foreboding_joy: {
    name: "Foreboding joy", feel: "Waiting for the other shoe to drop", group: 11, family: "fearful", kind: "emotion",
    meaning: "Foreboding joy is when a moment of joy triggers a shudder of fear, and we start rehearsing tragedy so we won't be caught off guard. Brown found that people who lean into joy use that shudder as a reminder to be grateful.",
    compare: "People who lean into joy use that shiver as a cue for gratitude instead of rehearsing disaster.",
    ask: "Can I let this good thing be good, and say thank you for it?"
  },
  relief: {
    name: "Relief", feel: "Relieved", group: 11, family: "happy", kind: "emotion",
    meaning: "Relief is tension leaving the body and a sense that we can breathe easier, often because something we feared is over or didn't happen.",
    ask: "What just lifted, and can I let my body register it?",
    try: "Take one slow, deliberate sigh. It helps the body reset."
  },
  tranquility: {
    name: "Tranquility", feel: "Tranquil", group: 11, family: "happy", kind: "emotion",
    meaning: "Tranquility is calm marked by the absence of demands and no pressure to do anything. Brown contrasts it with contentment: tranquility is enjoying doing nothing, not having finished something.",
    ask: "Where can I find five minutes without demands today?"
  },
  anger: {
    name: "Anger", feel: "Angry", group: 12, family: "angry", kind: "emotion",
    meaning: "Anger shows up when something gets in the way of what we want or when things aren't how we believe they should be. Brown calls it a catalyst: a useful signal and a spark for change, but an exhausting life companion. It often covers other feelings like hurt, fear, or shame.",
    compare: "Anger is often an indicator light that other feelings, like hurt, fear, grief, or shame, need checking. It can also be a fitting response to injustice: a strong spark for change, but an exhausting companion.",
    ask: "What else might be under this anger? What is it asking me to change?"
  },
  contempt: {
    name: "Contempt", feel: "Contemptuous", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Contempt is a mix of anger and disgust aimed at someone we see as beneath us. John Gottman's research found it to be the strongest predictor that a relationship will break down.",
    ask: "Is there someone I have written off, and what would it take to see them as a person again?"
  },
  disgust: {
    name: "Disgust", feel: "Disgusted", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Disgust is aversion toward something that feels offensive or toxic. It evolved to protect us from contamination, but aimed at people, it can quickly become dehumanizing.",
    compare: "Disgust protects us from real toxins, but aimed at people it can quickly turn dehumanizing.",
    ask: "Is this disgust protecting me, or pushing someone outside my circle of care?"
  },
  dehumanization: {
    name: "Dehumanization", feel: null, group: 12, family: "disgusted", kind: "experience",
    meaning: "Dehumanization is the process of seeing others as less than human, and it usually starts with language. Brown warns it's what makes cruelty and violence possible, which is why dehumanizing words are worth calling out wherever we hear them.",
    ask: "Am I using, or nodding along to, language that makes people seem less human?"
  },
  hate: {
    name: "Hate", feel: "Hateful", group: 12, family: "angry", kind: "emotion",
    meaning: "Hate combines emotions like disgust, anger, fear, and contempt, aimed at people we see as malicious and unable to change. It tends to grow at a distance, and it can create a false sense of belonging with others who hate the same people.",
    ask: "Who am I only seeing from far away?"
  },
  self_righteousness: {
    name: "Self-righteousness", feel: "Self-righteous", group: 12, family: "angry", kind: "emotion",
    meaning: "Self-righteousness is the conviction that our own beliefs and actions are the most correct, with little room for anyone else. Brown distinguishes it from righteous anger, which responds to real injustice.",
    compare: "Righteous anger responds to real injustice. Self-righteous anger mostly makes us feel superior.",
    ask: "Is my outrage about the harm, or about feeling better than someone?"
  },
  pride: {
    name: "Pride", feel: "Proud", group: 13, family: "happy", kind: "emotion",
    meaning: "Pride is pleasure or celebration about our accomplishments or efforts, or someone else's. Healthy pride is about effort and growth, and it's different from hubris.",
    compare: "Pride is earned and grounded. Hubris is inflated and needs to dominate.",
    ask: "What effort am I proud of, even if the result is not finished?"
  },
  hubris: {
    name: "Hubris", feel: "Superior", group: 13, family: "angry", kind: "emotion",
    meaning: "Hubris is an inflated sense of our own abilities, driven more by a need to dominate than by real accomplishment. Brown sees it as a defense, often with shame underneath.",
    ask: "Do I want to be right, or do I want to learn?"
  },
  humility: {
    name: "Humility", feel: "Humble", group: 13, family: "happy", kind: "emotion",
    meaning: "Humility is openness to learning combined with an accurate, balanced view of ourselves: our contributions, strengths, imperfections, and room to grow. It isn't putting ourselves down.",
    ask: "What could I learn today from someone else?"
  }
};
