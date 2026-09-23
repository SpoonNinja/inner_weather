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
//   meaning  what it is (a paragraph)
//   notice   how it tends to show up ("You might notice this if...")
//   next     where to go from here
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
    meaning: "Stress is how our body and mind respond when demands feel bigger than our ability to cope, especially when things feel unpredictable or out of our control. In Brown's restaurant image, stress is being busy and behind but still in the game. Over time, it quietly erodes the rest and boundaries that would keep it in check.",
    notice: "You might notice this if you feel tense, stretched thin, and behind, even without one obvious cause.",
    next: "From here, look for the boundary or the rest you've been skipping, rather than just pushing through. Name the one thing that matters most in the next hour and set the rest aside for later.",
    compare: "Stress is being behind but still in the game. Overwhelm is when it is so much that you cannot think straight or function.",
    ask: "What exactly feels like more than I can handle right now?",
    try: "Name the one thing that matters most in the next hour. Put everything else on a list for later."
  },
  overwhelm: {
    name: "Overwhelm", feel: "Overwhelmed", group: 1, family: "bad", kind: "emotion",
    meaning: "Overwhelm is being flooded past your capacity to cope, with too many demands arriving too fast to handle one at a time. Brown uses a restaurant image from her waitressing days: stress is being slammed but still keeping up, while overwhelm is falling so far behind that you freeze. It usually calls for a pause before a plan.",
    notice: "You might notice this if you don't know where to start, and everything on your plate feels equally urgent.",
    next: "From here, stop for a few minutes of real non-doing first. Then pick one small, concrete next action and deliberately ignore the rest of the list until it's done. Overwhelm shrinks as your field of vision narrows.",
    compare: "In overwhelm, feelings run high while clarity runs low, which makes decisions harder. It usually calls for a pause before a plan.",
    ask: "Can I give myself a few minutes of doing nothing before I try to solve anything?",
    try: "Take five to ten minutes of real non-doing: step outside, drink some water, look at something far away. Then choose one small next step."
  },
  anxiety: {
    name: "Anxiety", feel: "Anxious", group: 1, family: "fearful", kind: "emotion",
    meaning: "Anxiety is a state of worry, tension, and physical unease about an uncertain outcome, often without one specific threat to point to. Brown notes that struggling to tolerate uncertainty is a big part of what keeps anxiety going, and that it can be a passing state or a longer-running tendency.",
    notice: "You might notice this if you feel keyed up and uneasy, but can't point to one clear danger causing it.",
    next: "From here, ground yourself in the present through your senses: what you can see, hear, and touch right now. Name what's in your control and what isn't. If anxiety is constant or getting in the way of life, a counselor or doctor can help.",
    compare: "Anxiety and excitement feel almost the same in the body. The name you give the feeling can change how the next hour goes.",
    ask: "Is this anxiety, or could some of it be excitement?",
    try: "Take one slow breath and ask whether this energy could be pointed at something you care about. If anxiety is constant or getting in the way of life, a counselor or doctor can help."
  },
  worry: {
    name: "Worry", feel: "Worried", group: 1, family: "fearful", kind: "experience",
    meaning: "Brown describes worry as the thinking part of anxiety: a chain of negative what-if thoughts about things that could go wrong. It feels productive, like we're preparing, but thinking about a problem over and over isn't the same as solving it. And trying to push worried thoughts away tends to make them louder.",
    notice: "You might notice this if your mind keeps circling the same \"what if\" without landing anywhere new.",
    next: "From here, write the worry down in one sentence, then pick one concrete action you can take, or set it aside until there's real new information. Ask what feeling sits underneath it.",
    compare: "Worry feels useful but rarely solves anything, and trying to shove worried thoughts away tends to make them louder.",
    ask: "What feeling is underneath this worry, and what does it need from me?",
    try: "Write the worry in one sentence. Then write one thing about it that is within your control."
  },
  avoidance: {
    name: "Avoidance", feel: null, group: 1, family: "fearful", kind: "experience",
    meaning: "Avoidance is steering away from something uncomfortable, like a feeling, a task, or a conversation, because facing it feels harder than putting it off. Brown describes it as one of the most common ways we cope with anxiety. It brings quick relief, but the fear stays in place and often grows.",
    notice: "You might notice this if you keep finding reasons to delay something you already know you need to face.",
    next: "From here, take the smallest possible first step, even two minutes. Momentum, more than motivation, is what usually breaks the pattern.",
    ask: "What am I avoiding right now, and what is the smallest way to face it?",
    try: "Do two minutes of the thing you have been avoiding. Just two."
  },
  excitement: {
    name: "Excitement", feel: "Excited", group: 1, family: "surprised", kind: "emotion",
    meaning: "Excitement is an energized, eager feeling about something we're looking forward to. Brown notes that excitement and anxiety are almost identical in the body, with the same racing heart and heightened energy. The difference is largely in how we name and interpret the sensation.",
    notice: "You might notice this if your body feels keyed up, and you're reading it as anticipation rather than threat.",
    next: "From here, try labeling the feeling as excitement on purpose. Research suggests that reframe can change how the experience actually plays out, not just how you describe it.",
    compare: "Same body sensations as anxiety, read as something good.",
    ask: "What am I looking forward to, and how can I let myself enjoy it?"
  },
  dread: {
    name: "Dread", feel: "Dread", group: 1, family: "fearful", kind: "emotion",
    meaning: "Dread is anticipating something unpleasant that we expect to happen, and it tends to grow as the moment gets closer. It's often worse than the event itself, and it drains energy long before anything has actually happened.",
    notice: "You might notice this if something is still ahead of you, and just thinking about it wears you out now.",
    next: "From here, bring your attention back to the present as often as you can. If possible, do the dreaded thing sooner, or put it on the calendar so it stops following you around.",
    compare: "Dread and anxiety live in the future. Fear is about a threat that is here now.",
    ask: "Is the waiting worse than the thing itself would be?",
    try: "If you can, do the dreaded thing sooner, or put it on the calendar so it stops following you around."
  },
  fear: {
    name: "Fear", feel: "Afraid", group: 1, family: "fearful", kind: "emotion",
    meaning: "Fear is a fast, short response to a threat we perceive right now, physical or social. Brown treats it as adaptive and worth listening to, while noting it's often amplified by uncertainty and by the worst-case stories we tell ourselves. Fear is about now; anxiety and dread are about later.",
    notice: "You might notice this if your body is on alert and your mind is running ahead to what might go wrong.",
    next: "From here, separate the real, present threat from the imagined future one. Feel your feet on the floor and lengthen your exhale so your thinking can catch up with your body.",
    compare: "Fear is about now. Anxiety and dread are about later.",
    ask: "What feels threatened right now, and am I actually in danger?",
    try: "Feel your feet on the floor and make your exhale longer than your inhale. Let your thinking catch up with your body."
  },
  vulnerability: {
    name: "Vulnerability", feel: "Vulnerable", group: 1, family: "sad", kind: "emotion",
    meaning: "Brown's central finding is that vulnerability isn't weakness. It's the emotion we feel in moments of uncertainty, risk, and emotional exposure, and it's where connection, creativity, and courage begin. A key part of her research: we can't selectively numb it. Shutting down vulnerable feelings also dulls our capacity for joy and love.",
    notice: "You might notice this if you're doing or saying something with no guarantee of how it will turn out, and it feels exposing.",
    next: "From here, lean toward it rather than away, with people who have earned your trust. Showing up without guarantees is the point, not a risk to minimize. Finishing the sentence \"This feels vulnerable because...\" can help.",
    compare: "Vulnerability is not weakness; courage is not possible without it. It is also not oversharing. It is sharing with people who have earned it.",
    ask: "What am I risking by showing up today, and is it worth it to me?",
    try: "Finish this sentence on paper: This feels vulnerable because..."
  },
  comparison: {
    name: "Comparison", feel: null, group: 2, family: "fearful", kind: "experience",
    meaning: "Comparison isn't an emotion so much as a habit of ranking ourselves against other people, often without noticing we're doing it. Brown describes it as being squeezed from two sides at once: pressure to conform and fit in, and pressure to compete and stand out. She notes how hard it is to feel truly connected to someone while you're busy measuring yourself against them.",
    notice: "You might notice this if you catch yourself sizing up your life, body, or success against someone else's, and it leaves you feeling either less than or quietly superior.",
    next: "From here, notice the comparison as it happens, then bring your attention back to your own values and goals instead of someone else's scoreboard.",
    ask: "Whose lane am I watching instead of my own?",
    try: "Silently wish the person you are comparing yourself to well, then bring your attention back to your own next step."
  },
  admiration: {
    name: "Admiration", feel: "Admiring", group: 2, family: "happy", kind: "emotion",
    meaning: "Admiration is warm respect for someone's abilities, accomplishments, or character, and it can also be stirred by art or nature. Brown separates it from envy because admiration carries no ache of lack. You can fully respect what someone has done without it saying anything is missing in you. It tends to inspire growth rather than wanting what they have.",
    notice: "You might notice this if you think \"I really respect how she handled that\" with no twinge of wanting to be her.",
    next: "From here, let admiration work as inspiration. Name the specific quality you admire and one small way you could grow it, so the feeling stays connecting instead of sliding into comparison.",
    compare: "Admiration pulls you toward a better version of yourself. Reverence pulls you toward connection with something greater.",
    ask: "What in this person or thing do I want to grow in myself?"
  },
  reverence: {
    name: "Reverence", feel: "Reverent", group: 2, family: "surprised", kind: "emotion",
    meaning: "Reverence is a deep, humbling respect, often mixed with love and awe, for something larger than ourselves: nature, art, a person's character, or what we hold sacred. Where admiration pulls us toward growing, reverence pulls us toward connection with something greater. Brown ties it to spirituality and to moments that put our smallness into a grounding, not threatening, perspective.",
    notice: "You might notice this if you feel quiet and small, in a good way, in front of something vast or profound.",
    next: "From here, resist the urge to explain, capture, or rush past the moment. Reverence asks to be felt and stayed in, not immediately processed or photographed.",
    ask: "What feels sacred to me right now, and how can I move closer to it?"
  },
  envy: {
    name: "Envy", feel: "Envious", group: 2, family: "angry", kind: "emotion",
    meaning: "Envy shows up when someone else has something you want, like a job, a relationship, a body, or a certain kind of life, and you feel the ache of not having it. Brown separates envy from jealousy by who's involved: envy is about two people and a thing, while jealousy involves a third person threatening a relationship. Envy can come with a hostile wish for the other person to lose what they have, or it can be benign, simply wanting it too.",
    notice: "You might notice this if you feel a sharp pang when someone shares good news, and you can name exactly what you wish were yours.",
    next: "From here, get curious about the specific want underneath instead of shaming yourself for feeling it. That want is often a real goal worth pursuing on its own terms, separate from the person who stirred it up.",
    compare: "Envy is wanting what another person has. Jealousy is fearing you will lose something you already have to someone else.",
    ask: "What do I actually want here, and do I need them to lose it for me to have it?"
  },
  jealousy: {
    name: "Jealousy", feel: "Jealous", group: 2, family: "angry", kind: "emotion",
    meaning: "Jealousy involves three people: you, someone you're connected to, and a rival who seems to threaten that connection. Brown roots it in fear of loss rather than a wish to possess, and notes that it rarely travels alone. It often shows up as a tangle of anger, sadness, and fear all at once. Because it touches the security of a bond you already have, it can feel more destabilizing than envy.",
    notice: "You might notice this if you feel a spike of threat watching your partner talk to someone, or fear a friend is quietly replacing you.",
    next: "From here, name the fear directly, usually a fear of losing the relationship or not being enough, instead of acting it out sideways through accusation, checking up, or control. Those tend to create the very distance you're afraid of.",
    compare: "Jealousy is about keeping what you have. Envy is about wanting what someone else has.",
    ask: "What am I afraid of losing, and what conversation might I need to have?"
  },
  resentment: {
    name: "Resentment", feel: "Resentful", group: 2, family: "angry", kind: "emotion",
    meaning: "Resentment is a mix of frustration, judgment, anger, and a sense that something is unfair. In Atlas of the Heart, Brown was surprised to find that it belongs in the envy family rather than with anger: we often resent people for doing what we wish we felt free to do. In her earlier work she also traces it to boundaries, the quiet disappointment in ourselves for not asking for what we need.",
    notice: "You might notice this if you're quietly furious at someone for resting, saying no, or taking something you've been denying yourself, or for \"making\" you do something you never actually said no to.",
    next: "From here, trace the resentment back to the need or boundary underneath it, then have the harder, direct conversation instead of continuing to stew. Resentment usually loosens once the real need gets said out loud.",
    compare: "Resentment is often closer to envy than to anger. Being annoyed that someone is resting can really mean you want rest too.",
    ask: "What do I need that I have been afraid to ask for?",
    try: "Notice any critical speech you are rehearsing in your head. Swap it for one honest request."
  },
  schadenfreude: {
    name: "Schadenfreude", feel: "Pleased at someone's misfortune", group: 2, family: "disgusted", kind: "emotion",
    meaning: "Schadenfreude, German for \"harm-joy,\" is pleasure at someone else's failure or misfortune. Brown treats it as a common, well-studied human response rather than proof of bad character. Research she draws on links it to envy and feeling inferior, and it shows up most toward people we see as rivals, as unfairly advantaged, or as finally facing consequences.",
    notice: "You might notice this if you catch a flicker of satisfaction, not sympathy, when someone you resent stumbles.",
    next: "From here, notice it without judgment first, then ask what's underneath: a need for fairness, feeling small next to them, or wanting to feel better about yourself. That question does more than trying to will the feeling away.",
    compare: "Feeling relieved when someone is held accountable for real harm is different. That usually comes from caring about the people who were hurt.",
    ask: "Does this pleasure fit the person I want to be?"
  },
  freudenfreude: {
    name: "Freudenfreude", feel: "Glad for someone", group: 2, family: "happy", kind: "emotion",
    meaning: "Freudenfreude is the mirror image of schadenfreude: real joy in someone else's success, even when it does nothing for you directly. Brown frames it as something we can practice and strengthen, and as a clear sign of connection and generosity in a relationship.",
    notice: "You might notice this if a friend's win makes you light up almost as much as your own would.",
    next: "From here, celebrate it out loud. Ask a follow-up question about their good news, and let them celebrate yours. Naming joy together deepens the relationship on both sides and builds the habit.",
    ask: "Whose good news could I celebrate today?",
    try: "When someone shares good news, ask a follow-up question. When someone celebrates yours, thank them for it."
  },
  boredom: {
    name: "Boredom", feel: "Bored", group: 3, family: "bad", kind: "emotion",
    meaning: "Boredom is the uncomfortable state of wanting to do something satisfying and not being able to. Brown notes that it isn't all bad: a bored, wandering mind is often where daydreaming and creativity begin. But because it's so uncomfortable, we tend to escape it immediately, usually into a screen.",
    notice: "You might notice this if you feel restless and reach for your phone without actually wanting anything on it.",
    next: "From here, sit with the boredom a little longer before reaching for distraction. Ask whether you need more challenge, more meaning, or just room for your mind to wander.",
    compare: "Boredom with little control tends toward frustration; boredom with lots of control tends toward sluggishness. A quiet, bored mind is also where daydreams and new ideas show up.",
    ask: "Does this moment need more challenge, more meaning, or just room for my mind to wander?",
    try: "Either raise the challenge (set a timer, add a constraint) or put the phone down and let your mind drift for five minutes."
  },
  disappointment: {
    name: "Disappointment", feel: "Disappointed", group: 3, family: "sad", kind: "emotion",
    meaning: "Brown defines disappointment as unmet expectations: the more significant the expectation, the bigger the disappointment. She points out that many of our expectations are unspoken, even to ourselves, which is part of why disappointment can land harder than we expect.",
    notice: "You might notice this if something didn't go the way you quietly hoped, and there's a real letdown, even if it looks small from the outside.",
    next: "From here, name the specific expectation that wasn't met, not just the general letdown. It makes the feeling easier to process, and shows you whether there's anything to say or adjust next time.",
    compare: "Disappointed: it did not go how I wanted, and it felt out of my control. Regretful: it did not go how I wanted, and my choices played a part.",
    ask: "What was I expecting, and did I ever say it out loud?"
  },
  expectations: {
    name: "Expectations", feel: null, group: 3, family: "sad", kind: "experience",
    meaning: "Brown treats expectations as a hidden source of a lot of pain. She calls the unspoken ones \"stealth expectations\": pictures we paint of how things will go, including how others will act, that we never say out loud. When reality doesn't match, we end up disappointed or resentful.",
    notice: "You might notice this if you're upset about how something turned out, and realize you never said what you actually wanted.",
    next: "From here, get explicit before the fact. Say or write your expectation, check whether it's realistic and within your control, and share it with anyone who needs to know.",
    ask: "What picture of today am I holding, and how much of it depends on things I cannot control?",
    try: "Say or write your expectation for the next hour. Is it realistic? Is it yours to control? Does anyone else need to hear it?"
  },
  regret: {
    name: "Regret", feel: "Regretful", group: 3, family: "sad", kind: "emotion",
    meaning: "Regret combines disappointment with responsibility: things didn't go how we wanted, and we believe our choices played a part. Brown sees it as a fair but tough teacher. Rather than something to avoid at all costs, it can point us toward empathy, courage, and better choices. Research she draws on shows we tend to regret what we didn't do more than what we did.",
    notice: "You might notice this if you keep returning to a decision, wishing you'd chosen differently, and the loop doesn't resolve on its own.",
    next: "From here, pull out the specific lesson by asking exactly what you'd do differently. Make amends if someone was affected. That's more useful than letting the regret loop indefinitely.",
    compare: "Regret can be a fair but tough teacher, pointing toward growth, amends, or more courage next time.",
    ask: "What is this regret trying to teach me?"
  },
  discouragement: {
    name: "Discouragement", feel: "Discouraged", group: 3, family: "sad", kind: "emotion",
    meaning: "Brown describes discouragement as losing confidence and enthusiasm for continuing to try. You may still believe in the goal, but the energy to keep going is draining away. That's what makes it easy to mistake for having actually given up.",
    notice: "You might notice this if you still know what you want, but the motivation to pursue it has clearly faded.",
    next: "From here, break the goal into a much smaller next step. Discouragement often lifts with a small, achievable win rather than a pep talk. Asking someone for encouragement helps too.",
    compare: "Discouraged means the motivation to keep going is slipping. Resigned means it feels gone.",
    ask: "What would make the next attempt feel possible, even if it is small?"
  },
  resignation: {
    name: "Resignation", feel: "Resigned", group: 3, family: "sad", kind: "emotion",
    meaning: "Resignation is feeling there's no point in trying anymore. It goes a step further than discouragement: the effort has stopped, not just slowed. It's worth telling apart from healthy acceptance, which comes from honestly assessing a situation rather than simply running out of energy.",
    notice: "You might notice this if you've stopped hoping something will improve, and it feels more like giving up than peace.",
    next: "From here, check whether this is real acceptance or exhaustion. If it's exhaustion, rest before deciding anything is truly unchangeable, and look for one small piece you still care about.",
    compare: "Resigned is further along than discouraged: the effort has stopped, not just slowed.",
    ask: "Is there one small piece of this I still care about?"
  },
  frustration: {
    name: "Frustration", feel: "Frustrated", group: 3, family: "angry", kind: "emotion",
    meaning: "Frustration is feeling blocked from what we want by something we believe we can't change or control. Brown distinguishes it from anger by that sense of control: with anger, we believe something can be done; with frustration, we feel stuck.",
    notice: "You might notice this if you keep hitting the same obstacle and feel your patience thinning.",
    next: "From here, name the specific obstacle out loud, then separate what's actually within your control from what isn't. That turns a diffuse irritation into something you can work with.",
    compare: "Frustration and anger both come from being blocked. With frustration we feel we cannot fix it; with anger we feel something can be done.",
    ask: "What part of this is actually within my control?"
  },
  awe: {
    name: "Awe", feel: "In awe", group: 4, family: "surprised", kind: "emotion",
    meaning: "Awe is the feeling of encountering something so vast, in scale, beauty, or complexity, that it doesn't fit our current understanding of the world. Brown contrasts it with wonder: wonder makes us want to understand, while awe makes us want to step back and take it in. It tends to quiet the usual self-focused chatter and connect us to something bigger.",
    notice: "You might notice this if you feel small in a good way, and ordinary words feel inadequate for what you're experiencing.",
    next: "From here, resist the urge to explain or capture the moment. Awe tends to deepen the longer you simply stay present in it.",
    compare: "Wonder makes you want to understand. Awe makes you want to step back and let the thing shine.",
    ask: "What is something larger than me that I can notice today?"
  },
  wonder: {
    name: "Wonder", feel: "Full of wonder", group: 4, family: "surprised", kind: "emotion",
    meaning: "Wonder is open, curious amazement, closer to a delighted \"how does that work?\" than to awe's hush. Brown ties it to curiosity: wonder invites us to lean in and explore, while awe asks us to step back. It doesn't require certainty to feel good.",
    notice: "You might notice this if you're fascinated by something and want to understand it more deeply.",
    next: "From here, follow the specific question it raises. Write it down, look it up, or ask someone. That's what turns wonder into learning.",
    compare: "Wonder leans in with questions. Awe stands back in appreciation.",
    ask: "What do I want to understand more deeply?"
  },
  confusion: {
    name: "Confusion", feel: "Confused", group: 4, family: "surprised", kind: "emotion",
    meaning: "Confusion is the discomfort of not understanding yet, holding incomplete or conflicting information without a clear answer. Brown notes that in learning, a manageable amount of confusion is a good sign: it slows us down and pushes us to think harder. Too much tips into frustration or giving up.",
    notice: "You might notice this if you honestly don't know what to think, and the not-knowing itself feels uncomfortable.",
    next: "From here, stay in \"I don't know yet\" a little longer instead of grabbing at false certainty. Write down exactly what you don't understand, then ask for help or break it into one smaller question.",
    compare: "A little confusion fuels deep learning. Too much tips into frustration or giving up.",
    ask: "Is this the good kind of confusion that means I am learning, or do I need help or a smaller step?",
    try: "Write down exactly what you do not understand yet. Then ask for help or break it into one smaller question."
  },
  curiosity: {
    name: "Curiosity", feel: "Curious", group: 4, family: "happy", kind: "emotion",
    meaning: "Brown describes curiosity as noticing a gap in what we know about something that interests us, and becoming invested, emotionally and mentally, in closing it. She notes that curiosity takes courage, because asking questions and staying open can lead us somewhere uncomfortable.",
    notice: "You might notice this if you want to ask more questions about something instead of jumping to a conclusion.",
    next: "From here, ask the question out loud instead of keeping it private. Curiosity acted on deepens both understanding and relationships.",
    compare: "Interest is an open mind. Curiosity adds an emotional pull to find out.",
    ask: "What question do I want answered today?"
  },
  interest: {
    name: "Interest", feel: "Interested", group: 4, family: "happy", kind: "emotion",
    meaning: "Interest is an open, engaged attention toward something that has caught hold of us. It's a milder, steadier cousin of curiosity, and it can grow into curiosity once we notice a gap we want to fill. Brown treats it as a meaningful signal of what's worth paying attention to.",
    notice: "You might notice this if you keep coming back to a topic or activity, wanting to know more.",
    next: "From here, give it a little more deliberate time than usual. Sustained interest is often a clue pointing toward a worthwhile direction.",
    compare: "Interest can grow into curiosity once you notice something you want to know.",
    ask: "What here has caught my attention?"
  },
  surprise: {
    name: "Surprise", feel: "Surprised", group: 4, family: "surprised", kind: "emotion",
    meaning: "Surprise is a brief jolt when something doesn't match what we expected. Brown notes it's the shortest of all emotions, lasting only a moment, and that it intensifies whatever we feel next, whether that's delight, fear, or amusement.",
    notice: "You might notice this if your body reacts before your mind has caught up with what just happened.",
    next: "From here, give yourself a beat before deciding how to feel. The jolt isn't the whole story of what the moment means.",
    ask: "What just changed my expectations, and what am I feeling now that the jolt has passed?"
  },
  amusement: {
    name: "Amusement", feel: "Amused", group: 5, family: "happy", kind: "emotion",
    meaning: "Amusement is a light, pleasurable delight, often set off by something unexpected or incongruous. It relaxes us, helps us recover from stress, and shared laughter is one of the quickest ways people feel close in the moment.",
    notice: "You might notice this if something strikes you as funny and your first impulse is to share it with someone right away.",
    next: "From here, follow that impulse. Text it, tell it, or point it out in the moment. That's what turns private amusement into a small act of connection.",
    ask: "What made me smile recently?",
    try: "A short funny break can help refill your focus before a hard task."
  },
  bittersweetness: {
    name: "Bittersweetness", feel: "Bittersweet", group: 5, family: "sad", kind: "emotion",
    meaning: "Bittersweetness is feeling happiness and sadness at the same time, often at a milestone that means both gain and loss. Brown treats it as one of the clearest everyday examples of paradox: two fully real feelings arriving together, not one after the other. It isn't being unsure; it's being both.",
    notice: "You might notice this if you're crying at a graduation, a wedding, or a goodbye and honestly can't tell whether it's happy or sad crying.",
    next: "From here, don't try to separate the two. Naming the moment as bittersweet, out loud, is often enough to honor both parts without forcing a resolution.",
    compare: "It is not being unsure whether you are happy or sad. It is being both.",
    ask: "What am I grateful for in what is ending or changing?"
  },
  nostalgia: {
    name: "Nostalgia", feel: "Nostalgic", group: 5, family: "sad", kind: "emotion",
    meaning: "Nostalgia is a sentimental longing for the past, usually for a softened, idealized version of it. Brown notes that research complicates the idea that it's pure comfort. It can restore a sense of meaning and connection to who we are, but it can also become a way to avoid a harder present, or a quiet comparison that insists things used to be better than they really were.",
    notice: "You might notice this if a song or a smell drops you straight into a memory that feels both warm and a little sad.",
    next: "From here, let it comfort you, and then check whether you're using it to avoid something in the present that needs your attention. Ask what you miss, and how you could honor it in your life now.",
    compare: "It can comfort and connect, but mixed with rumination it can keep us stuck. Fond memories still deserve a gentle fact-check.",
    ask: "What am I missing, and what in my life now could honor it?"
  },
  cognitive_dissonance: {
    name: "Cognitive dissonance", feel: "Conflicted", group: 5, family: "surprised", kind: "experience",
    meaning: "Cognitive dissonance is the discomfort of holding two conflicting beliefs, or a belief and an action that don't match, like valuing honesty while telling yourself a comfortable lie. Brown notes that we want to end that discomfort fast, and often do it by dismissing the new information or quietly changing the belief, instead of doing the harder work of changing the behavior.",
    notice: "You might notice this if a nagging unease tells you that something you're doing doesn't match what you say you believe.",
    next: "From here, sit with the discomfort a little longer than feels natural, long enough to honestly ask which side, the belief or the behavior, actually needs to change.",
    ask: "What new information am I tempted to dismiss because it is uncomfortable?"
  },
  paradox: {
    name: "Paradox", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "A paradox is two things that seem contradictory but are both true, like being deeply grateful for your life while grieving part of it. Brown sees the ability to hold paradox as a sign of emotional maturity. Many of our richest experiences are paradoxical by nature, not confused or wrong.",
    notice: "You might notice this if you feel two things fully, neither cancels the other out, and that unsettles you.",
    next: "From here, stop searching for the one \"real\" feeling and practice saying \"both are true\" out loud. That alone often relieves the pressure to pick a side.",
    ask: "Where could I use 'and' instead of 'or' today?"
  },
  irony: {
    name: "Irony", feel: null, group: 5, family: "surprised", kind: "experience",
    meaning: "Irony is the gap between what's said and what's meant, or between what we expect and what actually happens. It usually brings a wry, slightly unsettled kind of amusement, because it exposes a mismatch between our assumptions and reality. Like sarcasm, it depends on shared understanding to land, and it's easy to misread over text.",
    notice: "You might notice this if something happens that's almost funny because it's the exact opposite of what \"should\" have happened.",
    next: "From here, let irony be a moment of perspective, a reminder of how little we control or predict, rather than letting it harden into cynicism. And when it matters, say the direct version too.",
    ask: "Is my meaning clear to the person hearing it?"
  },
  sarcasm: {
    name: "Sarcasm", feel: null, group: 5, family: "disgusted", kind: "experience",
    meaning: "Sarcasm is irony used to mock or criticize, saying the opposite of what we mean, often to cover a more vulnerable feeling like frustration, hurt, or disappointment. Brown points out that the word traces back to a Greek root meaning \"to tear flesh.\" It works as armor: it protects the speaker from exposure, but it blocks the honest connection that naming the real feeling would allow.",
    notice: "You might notice this if you reach for a biting joke instead of saying directly that something upset you.",
    next: "From here, ask what the sarcasm is covering, and try saying that truer, less armored sentence instead, even once, with someone you trust.",
    ask: "Am I using humor to dodge something that needs to be said clearly?"
  },
  anguish: {
    name: "Anguish", feel: "Anguished", group: 6, family: "sad", kind: "emotion",
    meaning: "Anguish is a nearly unbearable swirl of shock, disbelief, grief, and powerlessness, usually after a sudden loss or crisis. Brown describes how it can hit the body so hard it brings us to our knees, and how the powerlessness is what makes it traumatic. It isn't something to think your way out of.",
    notice: "You might notice this if the pain feels like it has taken over your whole body, not just your emotions.",
    next: "From here, let people support you physically and practically while it runs its course. Take care of one basic need at a time, and reach out to a counselor or a helpline. This needs support and time, not quick fixes.",
    compare: "The powerlessness is what makes anguish traumatic. It usually needs time, support, and often professional help.",
    ask: "Who can be with me in this?",
    care: "strong"
  },
  hope: {
    name: "Hope", feel: "Hopeful", group: 6, family: "happy", kind: "experience",
    meaning: "Drawing on C. R. Snyder's research, Brown describes hope not as a feeling but as a way of thinking with three parts: having a clear goal, seeing at least one pathway to get there, and believing you can actually pursue it. Hope is learned, often through struggle that was met with support, which means it can be taught and practiced.",
    notice: "You might notice this if you can picture a goal, name a way to work toward it, and believe you're capable of trying.",
    next: "From here, build hope on purpose: name a concrete pathway, a backup path, and one next step. Hope grows through action more than through trying to feel optimistic.",
    ask: "What is one realistic goal, one path toward it, and one reason I can do it?"
  },
  hopelessness: {
    name: "Hopelessness", feel: "Hopeless", group: 6, family: "sad", kind: "emotion",
    meaning: "Following the same framework, hopelessness is what happens when one or more of hope's pieces falls away: you can't see a goal, can't see a path, or don't believe you could take it. It often comes from painful experiences combined with the belief that we can't change things.",
    notice: "You might notice this if you can't picture any way forward, or don't believe you could take one even if you saw it.",
    next: "From here, start smaller than feels adequate, with one tiny, concrete path. This is also a moment to lean on other people rather than willing your way through alone, especially if it has lasted a while.",
    ask: "Is this about one situation or everything? Who could help me see a path?",
    care: "strong"
  },
  despair: {
    name: "Despair", feel: "In despair", group: 6, family: "sad", kind: "emotion",
    meaning: "Despair is hopelessness that has spread to everything: a sense that tomorrow and the days after will be just like today. Brown points to research on three thoughts that feed it: it's all my fault, it will last forever, and it touches every part of my life. Despair needs real support, not just a new perspective.",
    notice: "You might notice this if the hopelessness feels total, reaching beyond one situation into how you see your whole life.",
    next: "From here, reach out for real support, from people you trust, a professional, or both. Despair isn't meant to be carried alone, and connection is protective. Gently question each of those three thoughts when you're able.",
    compare: "Three thoughts often feed it: it is all my fault, it will last forever, it ruins everything. Each one is worth gently questioning.",
    ask: "Is this really permanent, and is it really touching every part of my life?",
    care: "strong"
  },
  sadness: {
    name: "Sadness", feel: "Sad", group: 6, family: "sad", kind: "emotion",
    meaning: "Sadness is a natural response to loss or defeat, real or perceived. Brown stresses that it's essential, not something to fix quickly. It's linked to empathy and connection, and our capacity to feel sad is tied to our capacity to feel joy. She also distinguishes it from depression and from grief.",
    notice: "You might notice this if you feel heavy and quiet, and want comfort more than solutions.",
    next: "From here, let yourself be sad in front of someone safe instead of alone. Sadness that's shared tends to move through you; sadness kept private more often gets stuck.",
    compare: "Sadness is not depression (a lasting cluster of symptoms) and not grief (which holds many emotions at once).",
    ask: "What have I lost, or what am I afraid of losing?"
  },
  grief: {
    name: "Grief", feel: "Grieving", group: 6, family: "sad", kind: "emotion",
    meaning: "Brown describes grief as built from three things: loss, longing, and feeling lost. We grieve deaths, but also relationships, changes, and futures we imagined. She notes it's one of the most isolating emotions because our culture is so bad at supporting it, rushing people through, minimizing it, or avoiding it.",
    notice: "You might notice this if a loss keeps coming back in waves, and you feel pressure, from yourself or others, to be \"over it\" already.",
    next: "From here, resist the timeline and find people who can sit with grief rather than rush it. Showing up for grief, not fixing it, is what helps. Small rituals that honor the loss can help too.",
    ask: "What or whom am I missing, and who could simply be with me in it?"
  },
  compassion: {
    name: "Compassion", feel: "Compassionate", group: 7, family: "happy", kind: "emotion",
    meaning: "Brown frames compassion as a practice: choosing, again and again, to recognize the humanity we share with someone who's suffering, and to respond with kindness and action. Her research found that real compassion requires boundaries. Endless self-sacrifice isn't compassion, and boundaryless giving tends to turn into resentment. She calls pity its \"near enemy,\" because it looks similar but creates distance.",
    notice: "You might notice this if you feel moved toward someone's pain and want to help, while still being able to say no to what you truly can't give.",
    next: "From here, pair compassion with a clear boundary. Ask what you can sustainably offer, not just what feels generous in the moment. That's what keeps it from burning you out.",
    compare: "Its look-alike is pity, which feels similar but keeps a distance.",
    ask: "What would kindness toward myself or someone else look like right now?"
  },
  pity: {
    name: "Pity", feel: "Pitying", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Pity is feeling sorry for someone from a distance, without stepping into their experience. Brown calls it the near enemy of compassion: it can look similar, but it keeps the other person \"other,\" often with a quiet sense that we're better off. It lets us feel something about their situation without seeing them as fully human alongside us.",
    notice: "You might notice this if you feel bad for someone but also privately relieved it isn't you, with no real urge to understand what they're going through.",
    next: "From here, try moving from \"that's sad for them\" to imagining what it's actually like for them, or simply asking how they're really doing. That shift moves pity toward empathy.",
    ask: "Am I standing beside this person or looking down at them?"
  },
  empathy: {
    name: "Empathy", feel: "Empathetic", group: 7, family: "happy", kind: "emotion",
    meaning: "Drawing on Theresa Wiseman's research, Brown describes empathy as a set of skills: taking someone's perspective, staying out of judgment, recognizing the emotion they're feeling, and communicating that you understand. It's feeling with someone, not fixing their feeling, solving it, or relating it back to your own story. We don't need to have lived their experience; we connect to the feeling underneath it.",
    notice: "You might notice this if someone shares something hard and your instinct is to sit with them in it, rather than solve it or say \"at least.\"",
    next: "From here, resist the urge to silver-line it. Something like \"that sounds really hard, I'm glad you told me\" communicates that you're with them, instead of making the feeling smaller.",
    compare: "Sympathy says, I feel sorry for you. Empathy says, I get it, and you are not alone.",
    ask: "Who in my life needs to be understood rather than fixed?"
  },
  sympathy: {
    name: "Sympathy", feel: "Sympathetic", group: 7, family: "disgusted", kind: "emotion",
    meaning: "Sympathy is feeling for someone from the outside, acknowledging their pain without stepping into it. Brown calls it the near enemy of empathy. It's usually well meant, but it often shows up as \"at least\" statements that end up minimizing what the other person is going through, and it can communicate that we're not in it with them.",
    notice: "You might notice this if you feel bad about someone's situation, but your response stays at \"I'm sorry that happened\" rather than being with them in the feeling.",
    next: "From here, notice whether your response is keeping you at arm's length, and take one step closer. Ask what they need, or simply sit with them instead of offering answers.",
    compare: "Sympathy watches from the outside. Empathy sits down next to someone.",
    ask: "How could I move from feeling sorry for someone to being with them?"
  },
  boundaries: {
    name: "Boundaries", feel: null, group: 7, family: "angry", kind: "experience",
    meaning: "Brown defines boundaries simply as what's okay and what's not okay. One of her most surprising findings was that the most compassionate people she studied were also the most boundaried. Clear boundaries are what make generosity and empathy sustainable, rather than something that limits them.",
    notice: "You might notice this if you feel resentful or drained in a relationship where you've never actually said out loud what you need.",
    next: "From here, name the boundary directly and early, kindly and without over-explaining, instead of waiting until resentment forces the issue.",
    ask: "Is there something I need to say is okay, or not okay, today?"
  },
  comparative_suffering: {
    name: "Comparative suffering", feel: null, group: 7, family: "sad", kind: "experience",
    meaning: "Comparative suffering is the reflex to rank our pain against someone else's: \"Other people have it worse, so I shouldn't feel this.\" Brown argues that pain isn't a contest. Empathy isn't a limited resource, so minimizing your own suffering doesn't reduce anyone else's; it mostly keeps you from dealing with what you feel.",
    notice: "You might notice this if you feel guilty for being upset because \"other people have real problems.\"",
    next: "From here, let your pain count on its own terms, without ranking it. Comparing suffering doesn't help either person; it just piles shame on top of the original hurt. Offer yourself the care you'd offer anyone else.",
    ask: "Am I dismissing my own feelings because someone else has it harder?"
  },
  shame: {
    name: "Shame", feel: "Ashamed", group: 8, family: "sad", kind: "emotion",
    meaning: "Shame is the deeply painful sense that something is wrong with us, so wrong that we're not worthy of love and belonging. It says \"I am bad,\" not \"I did something bad.\" Brown's central finding, from years of research, is that shame grows in secrecy, silence, and judgment, and that empathy is its antidote: it can't survive being spoken out loud and met with understanding.",
    notice: "You might notice this if you want to disappear, hide, or over-explain yourself, and the feeling is about who you are rather than just what you did.",
    next: "From here, tell the story to someone who has earned the right to hear it. Connection, not willpower, is what loosens shame's grip. And talk to yourself the way you'd talk to someone you love.",
    compare: "Shame grows in secrecy, silence, and judgment. It shrinks when you share it with someone who responds with empathy.",
    ask: "Would I speak to someone I love the way I am speaking to myself? Who could I tell?"
  },
  self_compassion: {
    name: "Self-compassion", feel: null, group: 8, family: "happy", kind: "experience",
    meaning: "Drawing on Kristin Neff's research, Brown describes self-compassion as treating yourself the way you'd treat a good friend. It has three parts: kindness toward yourself instead of harsh judgment, remembering our common humanity instead of feeling alone in the struggle, and mindfulness that notices the pain without drowning in it.",
    notice: "You might notice this if you catch a harsh inner voice mid-sentence and choose a gentler one, like \"this is hard right now\" instead of \"I'm failing.\"",
    next: "From here, name the exact words you'd say to a friend in your situation, then say them to yourself. A hand on your chest for a few breaths can help the words land.",
    ask: "What would I say to a friend in my place?",
    try: "Put a hand on your chest and say quietly: This is hard. I am not the only one. May I be kind to myself."
  },
  perfectionism: {
    name: "Perfectionism", feel: null, group: 8, family: "fearful", kind: "experience",
    meaning: "Brown is clear that perfectionism isn't healthy striving for excellence. It's a defensive belief that if we look and do everything perfectly, we can avoid or minimize shame, judgment, and blame. She describes it as a heavy shield we carry around hoping it will protect us, when what it actually does is keep us from being seen. Healthy striving asks \"How can I improve?\" Perfectionism asks \"What will they think?\"",
    notice: "You might notice this if a small flaw feels unbearable, and you keep delaying finishing or sharing something until it's \"perfect.\"",
    next: "From here, practice showing unfinished or imperfect work to someone safe, and decide what \"good enough\" looks like before you start. It's one of the quickest ways to test whether the shield was ever needed.",
    compare: "Healthy striving asks: how can I improve? Perfectionism asks: what will people think?",
    ask: "What would good enough look like here?"
  },
  guilt: {
    name: "Guilt", feel: "Guilty", group: 8, family: "sad", kind: "emotion",
    meaning: "Guilt is the discomfort of holding something we did, or didn't do, up against our own values. It says \"I did something bad,\" not \"I am bad.\" Brown treats guilt as generally helpful: because it's about behavior rather than identity, it points to something we can actually change, which makes it far less corrosive than shame.",
    notice: "You might notice this if you keep replaying a specific thing you did and wish you'd done it differently.",
    next: "From here, use the guilt as fuel for repair: apologize, make amends, or change the behavior. Then consciously let it go once the repair has actually happened.",
    compare: "Guilt focuses on behavior and tends to help. Shame focuses on the self and tends to hurt.",
    ask: "Is there something I can make right?"
  },
  remorse: {
    name: "Remorse", feel: "Remorseful", group: 8, family: "sad", kind: "emotion",
    meaning: "Remorse is a kind of guilt that goes deeper: real sorrow for harm we've caused, paired with a desire to make it right. Brown connects genuine remorse to accountability, as opposed to an apology that's really about easing our own discomfort instead of the other person's experience of harm.",
    notice: "You might notice this if you feel the actual impact of what you did on the other person, not just the discomfort of having done it.",
    next: "From here, move from feeling remorseful to making repair. Remorse that stays inside, without action, tends to slide into self-punishment instead of accountability.",
    ask: "What would a sincere repair look like?"
  },
  humiliation: {
    name: "Humiliation", feel: "Humiliated", group: 8, family: "angry", kind: "emotion",
    meaning: "Humiliation is being put down or belittled in a way you feel you didn't deserve, often in front of others. Brown draws a clear line between this and shame: with humiliation, we don't believe we earned the treatment. That's why it tends to bring anger along with the pain, instead of the isolating self-judgment that shame brings.",
    notice: "You might notice this if you were mocked or exposed in a way that feels unjust, and part of you is protesting \"I didn't deserve that.\"",
    next: "From here, trust that instinct. Naming humiliation as unfair, rather than taking it in as deserved, is what keeps it from turning into shame over time. Talk to someone who sees your worth, and decide whether a boundary is needed.",
    compare: "Shame feels deserved. Humiliation feels unjust.",
    ask: "What happened, and who can help me feel my dignity again?"
  },
  embarrassment: {
    name: "Embarrassment", feel: "Embarrassed", group: 8, family: "sad", kind: "emotion",
    meaning: "Embarrassment is a brief, often funny-in-hindsight discomfort after a small public slip. Brown notes the key difference from shame: with embarrassment we know we're not alone, since everyone has moments like this. It's social and momentary, and most people forget it far faster than we expect.",
    notice: "You might notice this if you trip, misspeak, or get caught doing something minor, your face goes hot, and eventually everyone, including you, can laugh about it.",
    next: "From here, let it pass. Embarrassment is meant to be short-lived, so resist turning it into a bigger story about your worth.",
    compare: "Embarrassment says: everyone does this. Shame says: something is wrong with me.",
    ask: "Will this matter in a week? Can I laugh at it a little?"
  },
  belonging: {
    name: "Belonging", feel: "Like I belong", group: 9, family: "happy", kind: "emotion",
    meaning: "For Brown, true belonging is a practice of belonging to yourself so fully that you can bring your real self anywhere, and still feel connected even when you're standing alone. It never requires changing who you are to be accepted. In her framework, true belonging and fitting in are opposites, and fitting in is one of belonging's biggest barriers.",
    notice: "You might notice this if you can be fully yourself in a group and still feel connected to it, with no performing required.",
    next: "From here, start by belonging to yourself. It's the foundation that makes belonging anywhere else possible without quietly betraying who you are.",
    compare: "Fitting in means changing yourself to be accepted. Belonging means being accepted as you are.",
    ask: "Where can I be fully myself today?"
  },
  fitting_in: {
    name: "Fitting in", feel: null, group: 9, family: "fearful", kind: "experience",
    meaning: "Brown defines fitting in as sizing up a group and changing who you are to be accepted. It's belonging's counterfeit. In the moment it can feel almost the same, but it leaves you tired, self-monitoring, and ultimately unseen, because the version of you that got accepted wasn't the real one.",
    notice: "You might notice this if you're constantly adjusting and editing yourself to match a group, and it feels like work rather than ease.",
    next: "From here, ask what exactly you're editing out to stay in the room, and whether that room is worth it. Look for one place where you can show up as you are.",
    ask: "What am I hiding in order to be accepted?"
  },
  connection: {
    name: "Connection", feel: "Connected", group: 9, family: "happy", kind: "emotion",
    meaning: "Brown describes connection as the energy between people when each feels seen, heard, and valued, when both can give and receive without judgment, and when both come away stronger for it. In her research it shows up again and again as what gives life purpose and meaning.",
    notice: "You might notice this if you leave a conversation feeling more like yourself, not less.",
    next: "From here, notice which relationships reliably leave you feeling this way, and invest more time and energy there instead of spreading yourself thin.",
    ask: "Who helps me feel seen, and when can I reach out?"
  },
  disconnection: {
    name: "Disconnection", feel: "Disconnected", group: 9, family: "sad", kind: "emotion",
    meaning: "Disconnection is feeling dismissed, misunderstood, excluded, or unseen by someone, and it can happen even when people are in the same room. Brown points to research showing that social pain registers in the brain much like physical pain, which is why it can hurt so much. Small ruptures are a normal part of any relationship, and they can be repaired.",
    notice: "You might notice this if you're surrounded by people and still feel completely alone.",
    next: "From here, name the disconnection to someone you trust instead of assuming it's permanent or entirely your fault. A simple, honest reach toward repair usually works better than withdrawing further.",
    ask: "Is there a disconnection I could name and try to repair?"
  },
  insecurity: {
    name: "Insecurity", feel: "Insecure", group: 9, family: "fearful", kind: "emotion",
    meaning: "Insecurity is ongoing uncertainty about our worth, safety, or standing. Brown notes it can be about resources, about a relationship, or about ourselves, and that personal insecurity often means being overly critical of our weaknesses. Its opposite isn't perfection; it's accepting our weaknesses without harsh judgment. We often build armor, like perfectionism or people-pleasing, to manage it.",
    notice: "You might notice this if you keep looking for confirmation that you're liked, doing okay, or safe in a relationship.",
    next: "From here, name which kind of insecurity this is and the specific fear behind it, instead of only chasing reassurance. Reassurance soothes for a moment; naming the fear gets at what's actually driving it.",
    compare: "The opposite of personal insecurity is not perfection. It is accepting your weaknesses without harsh judgment.",
    ask: "Which kind of insecurity is this, and what would self-acceptance sound like?"
  },
  invisibility: {
    name: "Invisibility", feel: "Invisible", group: 9, family: "sad", kind: "emotion",
    meaning: "Invisibility is having our humanity or our contributions overlooked, ignored, or erased, sometimes by individuals and sometimes by whole systems. Brown treats it as one of the deepest wounds to connection, because being seen is at the heart of belonging, and its absence can feel like ongoing erasure.",
    notice: "You might notice this if you feel you could disappear from a group or conversation and no one would notice.",
    next: "From here, seek out people and spaces where you're actively, specifically seen, and be honest about how invisibility has affected you. That matters more than trying to get louder in spaces that aren't offering it. It's also worth noticing who you might be overlooking.",
    ask: "Where do I need to be seen, and who might I be overlooking?"
  },
  loneliness: {
    name: "Loneliness", feel: "Lonely", group: 9, family: "sad", kind: "emotion",
    meaning: "Loneliness is feeling disconnected from others, regardless of how many people are around. It's about the quality of connection, not the amount of company. Drawing on John Cacioppo's research, Brown describes it as a biological signal, like hunger or thirst, telling us we need connection, and notes it carries real health risks.",
    notice: "You might notice this if you could be surrounded by people and still feel unseen or unreached by any of them.",
    next: "From here, reach toward one real, honest connection. That tends to change loneliness in a way that simply adding more social time doesn't.",
    compare: "Being alone and being lonely are different. Solitude can restore you; loneliness asks you to reach out.",
    ask: "Who is one person I could connect with today, even briefly?"
  },
  love: {
    name: "Love", feel: "Loving", group: 10, family: "happy", kind: "emotion",
    meaning: "Brown describes love as something we cultivate, not just something that happens to us. It grows when we let ourselves be deeply seen and known, and when that connection is tended with trust, respect, kindness, and affection. For her, love and vulnerability are inseparable: we can't truly love, or be loved, without letting ourselves be known.",
    notice: "You might notice this if you feel both cared for and willing to be seen by someone, not just fond of them from a safe distance.",
    next: "From here, treat love as a practice. Small, consistent acts, like attention, kindness, and showing up, matter more than the intensity of the feeling in any given moment.",
    ask: "How can I show love in one small, specific way today?"
  },
  lovelessness: {
    name: "Lovelessness", feel: null, group: 10, family: "sad", kind: "experience",
    meaning: "Drawing on bell hooks, Brown describes lovelessness as the absence of love as a guiding force, in a person, a relationship, or a whole culture. When love stops shaping our choices, domination, indifference, and cruelty start to feel normal. It can also be felt personally, as a life or relationship that seems to lack warmth and care.",
    notice: "You might notice this if care and warmth feel missing from your life or your surroundings, not just that you happen to be alone right now.",
    next: "From here, let love guide one small decision today, and seek out small acts of care and connection. Lovelessness tends to lift gradually, through accumulated small moments, rather than one big fix.",
    ask: "Where could love guide a decision I am making?"
  },
  heartbreak: {
    name: "Heartbreak", feel: "Heartbroken", group: 10, family: "sad", kind: "emotion",
    meaning: "Heartbreak is the pain of losing love, or believing we have: a breakup, a death, a betrayal, a move, or even someone we love changing. Brown treats it as a form of grief specifically tied to love, one of the most universal kinds of pain and one of the most underestimated. It deserves real time and space, not the quick \"moving on\" our culture tends to push.",
    notice: "You might notice this if a loss touches something that felt essential to your sense of connection or your future.",
    next: "From here, give it real time and real support instead of rushing it. Lean on the people who love you, and be gentle with your body while you grieve.",
    ask: "What love am I grieving?"
  },
  trust: {
    name: "Trust", feel: "Trusting", group: 10, family: "happy", kind: "experience",
    meaning: "Brown describes trust as choosing to risk something we value on another person's actions. She breaks it into seven behaviors, using the acronym BRAVING: boundaries, reliability, accountability, the vault (keeping confidences), integrity, nonjudgment, and generosity. Trust isn't one leap of faith; it's built from many small, consistent moments over time, which she compares to adding marbles to a jar.",
    notice: "You might notice this if you feel safe being vulnerable with someone because they've shown up in small, reliable ways over and over.",
    next: "From here, pay attention to, and offer, those small marble-jar moments: remembering what matters to someone, keeping a confidence, doing what you said you'd do. That's what builds trust, not grand gestures.",
    ask: "Where is trust growing in my relationships, and where does it need care?"
  },
  self_trust: {
    name: "Self-trust", feel: null, group: 10, family: "happy", kind: "experience",
    meaning: "Self-trust is trusting your own judgment, instincts, and follow-through. Brown applies the same BRAVING framework inward: Do I keep my own boundaries? Am I reliable to myself? Do I own my mistakes and act with integrity? Do I treat myself without harsh judgment and with generosity? It's often the first thing we lose after a failure.",
    notice: "You might notice this if you second-guess your decisions constantly, or rarely follow through on promises you make to yourself.",
    next: "From here, rebuild it the way you'd rebuild trust with anyone: through small, kept promises, starting with the easiest ones you can actually deliver on.",
    ask: "What is one small promise to myself I can keep today?"
  },
  betrayal: {
    name: "Betrayal", feel: "Betrayed", group: 10, family: "angry", kind: "emotion",
    meaning: "Betrayal is a violation of trust where trust was expected. Brown notes that the most common form isn't dramatic at all: it's disengagement, someone slowly no longer caring, investing, or showing up. Betrayal is especially destabilizing because it shakes not only the relationship but your confidence in your own judgment about people.",
    notice: "You might notice this if you keep replaying events, trying to figure out what you missed or should have seen coming.",
    next: "From here, separate rebuilding trust in the relationship from rebuilding trust in yourself. The second is worth tending to even if the first isn't possible or wise. Talk to someone outside the situation before making big decisions.",
    ask: "What trust was broken, and what do I need now?"
  },
  defensiveness: {
    name: "Defensiveness", feel: "Defensive", group: 10, family: "angry", kind: "emotion",
    meaning: "Defensiveness is protecting ourselves from a perceived attack, usually by denying, explaining away, or counterattacking instead of staying open. Brown describes it as a way of protecting our ego and a fragile sense of self-worth. It's what happens when we feel criticized and reach for armor instead of curiosity.",
    notice: "You might notice this if feedback lands and your first instinct is to explain why it's wrong before you've taken it in.",
    next: "From here, pause and ask a clarifying question before you respond. Relaxing your hands and asking them to say it again interrupts the reflex and helps you hear what's actually being said.",
    ask: "What might be true in what I am resisting?",
    try: "Relax your hands and let your palms open. Ask the person to say it again so you can really understand."
  },
  flooding: {
    name: "Flooding", feel: "Flooded", group: 10, family: "bad", kind: "emotion",
    meaning: "Flooding, a term Brown borrows from John Gottman's research, is being physically and emotionally overwhelmed, often during conflict. Your heart races, you can't think clearly, and productive conversation becomes nearly impossible, no matter how good anyone's intentions are.",
    notice: "You might notice this if, in the middle of an argument, you suddenly can't think straight and everything feels like too much, too fast.",
    next: "From here, take a real break before trying to resolve anything. Say when you'll come back to it, and give your body at least twenty minutes to settle. Flooding has to pass physically before a real conversation can happen.",
    ask: "Do I need a break before I keep talking?",
    try: "Call a time-out and say when you will come back to the conversation."
  },
  hurt: {
    name: "Hurt", feel: "Hurt", group: 10, family: "sad", kind: "emotion",
    meaning: "Hurt is the pain of being emotionally wounded, usually by someone close to us. Brown describes it as sadness at being wounded combined with fear of being vulnerable to more harm. Because that's such an exposed feeling, it often gets covered quickly by anger, which feels safer and more powerful to show.",
    notice: "You might notice this if you're irritable or defensive, and underneath it is a softer \"that hurt me\" that hasn't been said.",
    next: "From here, try naming the hurt directly to the person involved, instead of letting it come out only as anger. \"My feelings are hurt\" invites repair; anger usually invites more anger.",
    compare: "Saying my feelings are hurt invites repair. Reacting with anger usually invites more anger.",
    ask: "Could I tell the person involved that my feelings are hurt?"
  },
  joy: {
    name: "Joy", feel: "Joyful", group: 11, family: "happy", kind: "emotion",
    meaning: "Joy is a sudden, intense feeling of connection, pleasure, and appreciation. Brown's research found it to be one of the most vulnerable emotions we feel, because we're often afraid to lean into it in case it gets taken away. She calls the dread that shows up alongside real joy \"foreboding joy,\" and found it nearly universal.",
    notice: "You might notice this if something wonderful happens and, right alongside the happiness, part of you braces for it to end.",
    next: "From here, stay with it. The people in Brown's research who could fully feel joy did it by naming what they were grateful for in that exact moment. Gratitude is what keeps joy from being interrupted by dread.",
    compare: "Happiness is steadier and more tied to circumstances. Joy is brief, deep, and connected.",
    ask: "Can I pause and take a mental picture of this moment?"
  },
  happiness: {
    name: "Happiness", feel: "Happy", group: 11, family: "happy", kind: "emotion",
    meaning: "Brown separates happiness from joy mostly by its source and intensity. Happiness is steadier and more tied to circumstances, like things going well right now, and is often the result of effort. Joy is more sudden, more intense, and can arrive regardless of circumstances.",
    notice: "You might notice this if things are simply going your way and you feel good about it, without needing to examine it closely.",
    next: "From here, enjoy it without over-explaining it. Notice what's contributing to it, and savor it for a few extra seconds.",
    ask: "What in my circumstances is going well right now?"
  },
  calm: {
    name: "Calm", feel: "Calm", group: 11, family: "happy", kind: "emotion",
    meaning: "Brown describes calm as bringing perspective and mindfulness to a situation while keeping our emotional reactions in check. She treats it as something she and her family practice, not a fixed personality trait. She also notes that calm is contagious, the same way anxiety is.",
    notice: "You might notice this if you can pause before reacting, even when things around you are stressful.",
    next: "From here, treat calm as a skill to build. A helpful question she offers: do I have enough information to freak out, and would freaking out help? Small, repeated pauses are what grow it.",
    ask: "Do I know enough yet to panic? Would panicking help?"
  },
  contentment: {
    name: "Contentment", feel: "Content", group: 11, family: "happy", kind: "emotion",
    meaning: "Contentment is the quiet sense of completeness, appreciation, and enough that comes when our needs are met. It's less intense than joy but much more sustainable, and it often follows finishing something. Brown connects it to gratitude and presence, as opposed to always reaching for the next thing.",
    notice: "You might notice this if you feel \"this is enough\" without needing anything about the situation to change.",
    next: "From here, let it be quiet. Contentment doesn't need to be dramatic or announced to be real, and it's worth protecting from the urge to add more to your list.",
    compare: "Contentment often follows finishing something. Tranquility is enjoying doing nothing.",
    ask: "What do I already have that is enough?"
  },
  gratitude: {
    name: "Gratitude", feel: "Grateful", group: 11, family: "happy", kind: "emotion",
    meaning: "Brown's research consistently ties gratitude to joy. She's careful to frame it as a practice, actively noticing and naming what's good, not just a passive feeling of being lucky. In her work, the people most able to experience joy were the ones who practiced gratitude most consistently.",
    notice: "You might notice this if you find yourself naming specifically what you're thankful for, rather than just vaguely feeling fortunate.",
    next: "From here, make it a real practice: write it down, say it out loud, or thank someone directly, especially in moments of joy. That's what gives it staying power.",
    ask: "What is one thing I am grateful for right now?"
  },
  foreboding_joy: {
    name: "Foreboding joy", feel: "Waiting for the other shoe to drop", group: 11, family: "fearful", kind: "emotion",
    meaning: "Foreboding joy is the dread that creeps into a genuinely happy moment: the instinct to brace for loss so we won't be caught off guard. Brown identifies it as one of the most common ways people protect themselves from vulnerability. Her research found that gratitude, practiced in the moment, is what counters it.",
    notice: "You might notice this if something good is happening and your first instinct is to imagine it going wrong.",
    next: "From here, use the shiver as a cue. Say specifically what you're grateful for, out loud if you can. It pulls your attention back into the real moment instead of the imagined future.",
    compare: "People who lean into joy use that shiver as a cue for gratitude instead of rehearsing disaster.",
    ask: "Can I let this good thing be good, and say thank you for it?"
  },
  relief: {
    name: "Relief", feel: "Relieved", group: 11, family: "happy", kind: "emotion",
    meaning: "Relief is tension leaving the body and a sense of being able to breathe more easily, often because something we feared is over or didn't happen. It can be surprisingly strong, because it's often the moment we finally let go of vigilance we'd been holding for a long time.",
    notice: "You might notice this if news finally comes and your body seems to deflate all at once.",
    next: "From here, let yourself actually rest. Relief often reveals how much energy the worry was quietly costing you. One slow, deliberate sigh can help your body reset.",
    ask: "What just lifted, and can I let my body register it?",
    try: "Take one slow, deliberate sigh. It helps the body reset."
  },
  tranquility: {
    name: "Tranquility", feel: "Tranquil", group: 11, family: "happy", kind: "emotion",
    meaning: "Tranquility is a calm marked by the absence of demands, with no pressure to do anything. Brown contrasts it with contentment: contentment often comes from finishing something, while tranquility is the peace of doing nothing at all. Nature and quiet tend to bring it on.",
    notice: "You might notice this if you feel unhurried and at peace, without needing to be anywhere else.",
    next: "From here, protect these moments instead of rushing to fill them. Tranquility is easy to override with busyness if you don't deliberately guard it.",
    ask: "Where can I find five minutes without demands today?"
  },
  anger: {
    name: "Anger", feel: "Angry", group: 12, family: "angry", kind: "emotion",
    meaning: "Brown describes anger as an action emotion: it shows up when something blocks what we want or when things aren't how we believe they should be. She calls it a catalyst, useful as a signal and a spark for change, but an exhausting companion if we hold on to it. It's often an indicator that other feelings, like hurt, fear, grief, or shame, need attention.",
    notice: "You might notice this if you feel heat and want to act immediately, with a \"that's not fair\" running underneath.",
    next: "From here, before acting on it, ask what else might be underneath. That's usually where the more honest, more useful information lives. Then decide what, if anything, the anger is asking you to change.",
    compare: "Anger is often an indicator light that other feelings, like hurt, fear, grief, or shame, need checking. It can also be a fitting response to injustice: a strong spark for change, but an exhausting companion.",
    ask: "What else might be under this anger? What is it asking me to change?"
  },
  contempt: {
    name: "Contempt", feel: "Contemptuous", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Drawing on John Gottman's research, Brown describes contempt as a mix of anger and disgust aimed at someone we see as beneath us, showing up as mockery, sneering, or eye-rolling. Gottman found it to be the strongest predictor of relationship breakdown, because it attacks the other person's basic worth rather than their behavior.",
    notice: "You might notice this if your tone toward someone carries an edge of superiority or dismissiveness, not just ordinary frustration.",
    next: "From here, treat contempt as a signal to seek real repair, or real distance, rather than something to push through. Try describing the behavior instead of the person, and name what you actually need from them.",
    ask: "Is there someone I have written off, and what would it take to see them as a person again?"
  },
  disgust: {
    name: "Disgust", feel: "Disgusted", group: 12, family: "disgusted", kind: "emotion",
    meaning: "Disgust is a strong aversion to something that feels offensive or toxic. It evolved to protect us from contamination and is now also triggered by moral violations. Brown warns that when disgust is aimed at people rather than things, it can quickly become dehumanizing.",
    notice: "You might notice this if something produces a visceral \"I want nothing to do with this\" reaction, whether the trigger is physical or moral.",
    next: "From here, check whether the disgust is protecting you from real harm or pushing someone outside your circle of care. Those call for very different responses.",
    compare: "Disgust protects us from real toxins, but aimed at people it can quickly turn dehumanizing.",
    ask: "Is this disgust protecting me, or pushing someone outside my circle of care?"
  },
  dehumanization: {
    name: "Dehumanization", feel: null, group: 12, family: "disgusted", kind: "experience",
    meaning: "Dehumanization is the process of seeing people as less than human, and it usually starts with language. Brown identifies it as what makes cruelty and violence possible throughout history, because it lets people treat others in ways they never would treat someone they saw as fully human.",
    notice: "You might notice this if you find yourself talking about a group in flattened, contemptuous terms instead of as individuals with their own stories.",
    next: "From here, reintroduce complexity: a name, a story, a specific human detail. Refusing to repeat dehumanizing words, and gently calling them out when you hear them, is one of the most direct antidotes.",
    ask: "Am I using, or nodding along to, language that makes people seem less human?"
  },
  hate: {
    name: "Hate", feel: "Hateful", group: 12, family: "angry", kind: "emotion",
    meaning: "Brown describes hate as a combination of emotions, like disgust, anger, fear, and contempt, aimed at people we see as malicious and unable to change. It tends to grow at a distance, and it can create a false sense of belonging with others who hate the same people. It's corrosive to the person holding it, not just its target.",
    notice: "You might notice this if a feeling toward someone has hardened into wishing them harm, not just strongly disagreeing.",
    next: "From here, get honest about the fear or hurt underneath it, and move closer to one real person's story. Hate is rarely the whole story, and naming what's beneath it opens options that hostility shuts down.",
    ask: "Who am I only seeing from far away?"
  },
  self_righteousness: {
    name: "Self-righteousness", feel: "Self-righteous", group: 12, family: "angry", kind: "emotion",
    meaning: "Self-righteousness is the conviction that our beliefs and behavior are the most correct, often used to justify anger or contempt. Brown separates it from righteous anger, which responds to real injustice. Self-righteousness shuts down curiosity: once you've decided you're right and they're wrong, there's nothing left to learn.",
    notice: "You might notice this if you feel entitled to judge someone harshly, and any nuance about their situation feels beside the point.",
    next: "From here, ask yourself whether this is about the harm or about feeling superior. Getting curious about what you might not know doesn't require agreeing with them; it just leaves room for a fuller picture.",
    compare: "Righteous anger responds to real injustice. Self-righteous anger mostly makes us feel superior.",
    ask: "Is my outrage about the harm, or about feeling better than someone?"
  },
  pride: {
    name: "Pride", feel: "Proud", group: 13, family: "happy", kind: "emotion",
    meaning: "Pride is pleasure or celebration about something we've accomplished or worked hard on. Brown treats healthy pride as worth claiming, and separates it from hubris: pride is grounded in real effort and growth, not inflated to cover insecurity.",
    notice: "You might notice this if you feel satisfied about something you worked for, and it doesn't require putting anyone else down.",
    next: "From here, let yourself feel it fully and tell someone safe. Shared pride deepens connection, even though the instinct is often to downplay it.",
    compare: "Pride is earned and grounded. Hubris is inflated and needs to dominate.",
    ask: "What effort am I proud of, even if the result is not finished?"
  },
  hubris: {
    name: "Hubris", feel: "Superior", group: 13, family: "angry", kind: "emotion",
    meaning: "Hubris is an inflated sense of our own abilities, driven more by a need to dominate than by real accomplishment. Brown sees it as a defense, often covering something more fragile underneath. It tends to push people away and depends on constant outside validation instead of inviting closeness.",
    notice: "You might notice this if you need others to acknowledge that you're better, and any challenge to that feels intolerable rather than just annoying.",
    next: "From here, get curious about what the hubris might be protecting, often a fear of being ordinary or not enough. Asking \"Do I want to be right, or do I want to learn?\" is a good place to start.",
    ask: "Do I want to be right, or do I want to learn?"
  },
  humility: {
    name: "Humility", feel: "Humble", group: 13, family: "happy", kind: "emotion",
    meaning: "Brown describes humility as openness to learning combined with an accurate, balanced view of ourselves: our contributions, strengths, flaws, and room to grow. It isn't self-deprecation. It's honesty about who you are without needing to inflate or shrink it.",
    notice: "You might notice this if you can accept a compliment and admit a mistake with about the same ease, without either one knocking you off balance.",
    next: "From here, practice naming a strength and a growing edge in the same breath. It builds the habit of seeing yourself accurately, and keeps you open to learning from others.",
    ask: "What could I learn today from someone else?"
  }
};
