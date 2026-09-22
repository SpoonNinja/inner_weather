// js/data/contexts.js
// What the person is about to do. Used to tailor the closing step.
// Weather names map to the energy x pleasantness quadrant (see "Choosing the weather" in the plan).

export const WEATHER = {
  charged: { label: "Charged", hint: "High energy, unpleasant (anxious, frustrated, stressed)" },
  heavy:   { label: "Heavy",   hint: "Low energy, unpleasant (sad, tired, bored, discouraged)" },
  settled: { label: "Settled", hint: "Low energy, pleasant (calm, content, peaceful)" },
  bright:  { label: "Bright",  hint: "High energy, pleasant (excited, joyful, curious)" },
  mixed:   { label: "Mixed",   hint: "A blend of pleasant and unpleasant" }
};

export const CONTEXTS = [
  {
    id: "work", label: "Work", before: "before work",
    intention: "Knowing this is here, how do you want to approach your work?",
    placeholder: "Start with the easy email, then one focused hour on the report.",
    approach: {
      charged: "Write down what's buzzing in your head, pick one task, and work in a short block. Move your body between blocks.",
      heavy:   "Start with the smallest, easiest task to get moving. Shorter blocks and a real break are fine today.",
      settled: "Good conditions for deep, focused work. Protect a stretch of time for the thing that matters most.",
      bright:  "Use this energy on the hardest or most creative task first, before the day fills up.",
      mixed:   "Name which feeling is loudest and plan around it. You can work and still let the rest be there."
    }
  },
  {
    id: "study", label: "Study or language practice", before: "before studying",
    intention: "Given how you feel, what kind of study fits today?",
    placeholder: "Twenty minutes of listening and flashcards instead of new grammar.",
    approach: {
      charged: "Try low-stakes practice: review, shadowing, or rereading something familiar. Confusion is part of learning, not a verdict on you.",
      heavy:   "Go gentle: review, listening, or flashcards. Showing up briefly still counts.",
      settled: "A good day to tackle something new and let it sink in slowly.",
      bright:  "Stretch yourself: speaking, writing, or the material you have been putting off.",
      mixed:   "Pick one small goal for the session and let the rest of the feelings ride along."
    }
  },
  {
    id: "journal", label: "Journaling or end of day", before: "before journaling",
    intention: "What do you want to explore or let go of tonight?",
    placeholder: "Why the meeting stung, and one thing I'm grateful for.",
    approach: {
      charged: "Write it out without editing. Then ask: what is within my control tomorrow?",
      heavy:   "Be kind on the page. Write what happened, what you needed, and one small comfort for tonight.",
      settled: "Notice what helped today go well so you can find it again.",
      bright:  "Capture the good moment in detail while it is fresh. Future you will want it.",
      mixed:   "Give each feeling a line. More than one thing can be true about today."
    },
    deeperOpen: true
  },
  {
    id: "conversation", label: "A conversation", before: "before a conversation",
    intention: "What do you want from this conversation, and how do you want to show up?",
    placeholder: "I want us to understand each other, not win. I'll ask before I explain.",
    approach: {
      charged: "Say what you need in one sentence before you start. If it gets too heated, pause and agree on when to pick it back up.",
      heavy:   "It is okay to say you are low on energy today. Listening well counts as showing up.",
      settled: "A good time for a hard or honest conversation. Lead with curiosity.",
      bright:  "Share the good energy, and leave room for how the other person is feeling.",
      mixed:   "Name your mixed feelings out loud if it helps. It often makes the other person more open too."
    }
  },
  {
    id: "creative", label: "Creative work", before: "before creating",
    intention: "How do you want to show up to the work today?",
    placeholder: "Play for fifteen minutes with no goal, then edit.",
    approach: {
      charged: "Channel it: fast drafts, sketches, or messy first passes. Judge later.",
      heavy:   "Lower the bar. Make one small, imperfect thing and call it a win.",
      settled: "Good ground for patient craft and careful editing.",
      bright:  "Follow the spark. Capture ideas quickly before they fade.",
      mixed:   "Let the mix into the work. Contrast often makes things more interesting."
    }
  },
  {
    id: "movement", label: "Exercise or movement", before: "before moving",
    intention: "What kind of movement does your body want today?",
    placeholder: "Easy walk, no pace goals.",
    approach: {
      charged: "Movement is a good outlet today. Let it burn off some of the charge.",
      heavy:   "Something gentle counts. A walk or a stretch may be exactly right.",
      settled: "Enjoy steady, mindful movement. Notice your breath.",
      bright:  "A good day to push a little, as long as it still feels good.",
      mixed:   "Start easy and let your body tell you where to go from there."
    }
  },
  {
    id: "spiritual", label: "Prayer or meditation", before: "before prayer or meditation",
    intention: "What do you want to bring with you into this time?",
    placeholder: "Bring the worry about the job and ask for patience.",
    approach: {
      charged: "Bring the whole of it, as it is. Slow your breathing before words.",
      heavy:   "You do not need to feel a certain way to begin. Showing up is enough.",
      settled: "Rest in the quiet. Let there be space as well as words.",
      bright:  "Start with gratitude for what feels good.",
      mixed:   "Offer each feeling honestly. Mixed hearts are welcome."
    }
  },
  {
    id: "anytime", label: "Just checking in", before: "",
    intention: "What is one small thing that would help right now?",
    placeholder: "Drink some water and text my sister back.",
    approach: {
      charged: "Take three slow breaths and do one small thing within your control.",
      heavy:   "Be gentle with yourself. Rest, water, daylight, or reaching out might help.",
      settled: "Enjoy it. Notice what is helping you feel this way.",
      bright:  "Let yourself enjoy it, and maybe share it with someone.",
      mixed:   "It is okay to feel more than one thing. Let them both be here."
    }
  }
];

export const ENERGY_LEVELS = [
  { value: 1, label: "Drained" },
  { value: 2, label: "Low" },
  { value: 3, label: "Steady" },
  { value: 4, label: "Up" },
  { value: 5, label: "Buzzing" }
];

export const BODY_CHIPS = [
  "Tight chest", "Tense shoulders", "Clenched jaw", "Knotted stomach", "Heavy",
  "Restless", "Shaky", "Tired eyes", "Headachy", "Warm", "Light", "Relaxed",
  "Open", "Grounded", "Buzzy", "Numb"
];

// Optional deeper reflection, adapted from the idea that feelings have four layers:
// the body, where we learned how to handle them, what we tend to do, and what brought them on.
export const DEEPER_PROMPTS = [
  { id: "body",      label: "Body",      prompt: "Where do I feel this in my body?" },
  { id: "backstory", label: "Backstory", prompt: "What brought this on?" },
  { id: "behavior",  label: "Habit",     prompt: "What do I usually do when I feel this way? Is that what I want to do today?" },
  { id: "biography", label: "History",   prompt: "Where did I learn how to handle this feeling?" }
];
