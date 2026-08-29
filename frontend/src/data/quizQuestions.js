import { 
    Clock, 
    ListChecks,
    MapPin,
    Sparkles,
    TrendingUp,
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
    TrainFront,
    Stethoscope,
    GraduationCap,
    Trees,
    ShoppingBasket,
    UtensilsCrossed,
    Wallet,
    Scale,
    CircleHelp,
    Bus,
    Car,
    Footprints,
    Shuffle,
    Building2,
    PartyPopper,
    Pill,
    Hospital,
    HeartPulse,
    Snowflake,
    CloudSun,
    Sun,
    ThermometerSnowflake,
    SunMedium,
    Dumbbell,
    ShoppingBag,
    CircleMinus,
    Key,
    Home,
    Users,
    Search
} from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question: "What matters most to you when choosing a locality?",
    questionSubtext:
      "Pick up to 3 options — these become your strongest signals.",
    type: "multiple",
    maxSelections: 3,

    optionsList: [
      {
        id: 1,
        icon: ShieldCheck,
        option: "Safety & Security",
        factorImpact: {
          safety: 5,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: TrainFront,
        option: "Connectivity & Transportation",
        factorImpact: {
          safety: 0,
          connectivity: 5,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Stethoscope,
        option: "Healthcare",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 5,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: GraduationCap,
        option: "Education",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 5,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 5,
        icon: Trees,
        option: "Environment & Sustainability",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 5,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 6,
        icon: ShoppingBasket,
        option: "Amenities & Daily Convenience",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 5,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 7,
        icon: UtensilsCrossed,
        option: "Lifestyle & Recreation",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 5,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 8,
        icon: Wallet,
        option: "Housing & Affordability",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 5,
          growth: 0
        }
      },
      {
        id: 9,
        icon: TrendingUp,
        option: "Future Growth & Development",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 5
        }
      }
    ]
  },

  {
    id: 2,
    question:
      "Which would you choose: lower housing costs or better connectivity and convenience?",
    questionSubtext: "Choose the option closest to your preference.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Wallet,
        option: "Lower cost — saving money is my priority.",
        factorImpact: {
          safety: 0,
          connectivity: -2,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: -2,
          lifestyle: 0,
          housing: 5,
          growth: 0
        }
      },
      {
        id: 2,
        icon: TrainFront,
        option: "Better connectivity — I am willing to pay more.",
        factorImpact: {
          safety: 0,
          connectivity: 5,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 3,
          lifestyle: 0,
          housing: -3,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Scale,
        option: "A balance between affordability and convenience.",
        factorImpact: {
          safety: 0,
          connectivity: 2,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 2,
          lifestyle: 0,
          housing: 3,
          growth: 0
        }
      },
      {
        id: 4,
        icon: CircleHelp,
        option: "It depends on how large the price difference is.",
        factorImpact: {
          safety: 0,
          connectivity: 1,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 1,
          lifestyle: 0,
          housing: 2,
          growth: 0
        }
      }
    ]
  },

  {
    id: 3,
    question: "How do you prefer to get around on a typical day?",
    questionSubtext: "Think about your usual daily commute and errands.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: TrainFront,
        option: "Mostly metro or suburban train",
        factorImpact: {
          safety: 0,
          connectivity: 5,
          healthcare: 0,
          education: 0,
          environment: 2,
          amenities: 1,
          lifestyle: 0,
          housing: 0,
          growth: 1
        }
      },
      {
        id: 2,
        icon: Bus,
        option: "Mostly buses",
        factorImpact: {
          safety: 0,
          connectivity: 4,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 1,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Car,
        option: "Mostly my own car or bike",
        factorImpact: {
          safety: 0,
          connectivity: 2,
          healthcare: 0,
          education: 0,
          environment: -1,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: Footprints,
        option: "Mostly walking or cycling",
        factorImpact: {
          safety: 2,
          connectivity: 2,
          healthcare: 0,
          education: 0,
          environment: 4,
          amenities: 2,
          lifestyle: 2,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 5,
        icon: Shuffle,
        option: "A mix of different options",
        factorImpact: {
          safety: 0,
          connectivity: 3,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 1,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      }
    ]
  },

  {
    id: 4,
    question: "Which type of locality would you prefer?",
    questionSubtext: "Think about the atmosphere you would enjoy living in.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Trees,
        option:
          "Quiet and green, even with fewer shops and restaurants.",
        factorImpact: {
          safety: 1,
          connectivity: -1,
          healthcare: 0,
          education: 0,
          environment: 5,
          amenities: -2,
          lifestyle: 3,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: Building2,
        option: "Busy and urban, with everything close by.",
        factorImpact: {
          safety: 0,
          connectivity: 3,
          healthcare: 1,
          education: 1,
          environment: -2,
          amenities: 5,
          lifestyle: 3,
          housing: -1,
          growth: 1
        }
      },
      {
        id: 3,
        icon: Scale,
        option:
          "A balance between peaceful surroundings and urban convenience.",
        factorImpact: {
          safety: 1,
          connectivity: 2,
          healthcare: 1,
          education: 1,
          environment: 3,
          amenities: 3,
          lifestyle: 2,
          housing: 0,
          growth: 1
        }
      },
      {
        id: 4,
        icon: PartyPopper,
        option:
          "A lively area with plenty of entertainment and activity.",
        factorImpact: {
          safety: 0,
          connectivity: 3,
          healthcare: 0,
          education: 0,
          environment: -2,
          amenities: 4,
          lifestyle: 5,
          housing: -1,
          growth: 1
        }
      }
    ]
  },

  {
    id: 5,
    question:
      "How much extra would you be willing to pay for a noticeably safer locality?",
    questionSubtext: "Choose the option closest to your priorities.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Wallet,
        option: "I wouldn't pay extra for safety.",
        factorImpact: {
          safety: 1,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 4,
          growth: 0
        }
      },
      {
        id: 2,
        icon: Wallet,
        option: "I'd pay a little more.",
        factorImpact: {
          safety: 3,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 2,
          growth: 0
        }
      },
      {
        id: 3,
        icon: ShieldCheck,
        option: "I'd pay moderately more.",
        factorImpact: {
          safety: 4,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 1,
          growth: 0
        }
      },
      {
        id: 4,
        icon: ShieldCheck,
        option: "Safety would justify a significant premium.",
        factorImpact: {
          safety: 5,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: -2,
          growth: 0
        }
      }
    ]
  },

  {
    id: 6,
    question:
      "What level of healthcare access would you prefer near your home?",
    questionSubtext: "Consider hospitals, clinics, and pharmacies.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Stethoscope,
        option:
          "Healthcare access isn't particularly important to me.",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 1,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: Pill,
        option:
          "Clinics and pharmacies within reasonable reach.",
        factorImpact: {
          safety: 0,
          connectivity: 1,
          healthcare: 3,
          education: 0,
          environment: 0,
          amenities: 2,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Hospital,
        option: "Good hospitals within easy reach.",
        factorImpact: {
          safety: 0,
          connectivity: 1,
          healthcare: 4,
          education: 0,
          environment: 0,
          amenities: 1,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: HeartPulse,
        option:
          "Excellent healthcare access is a major priority.",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 5,
          education: 0,
          environment: 0,
          amenities: 2,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      }
    ]
  },

  {
    id: 7,
    question: "What matters most for your family or household?",
    questionSubtext: "Choose the factor you would prioritize most.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: GraduationCap,
        option: "Good schools and educational institutions",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 0,
          education: 5,
          environment: 1,
          amenities: 1,
          lifestyle: 0,
          housing: 0,
          growth: 1
        }
      },
      {
        id: 2,
        icon: Stethoscope,
        option: "Healthcare access",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 5,
          education: 0,
          environment: 0,
          amenities: 2,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: ShieldCheck,
        option: "Safety and peaceful surroundings",
        factorImpact: {
          safety: 5,
          connectivity: 0,
          healthcare: 0,
          education: 1,
          environment: 3,
          amenities: 0,
          lifestyle: 2,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: ShoppingBasket,
        option: "Convenient transportation and daily amenities",
        factorImpact: {
          safety: 0,
          connectivity: 4,
          healthcare: 1,
          education: 0,
          environment: 0,
          amenities: 5,
          lifestyle: 2,
          housing: 0,
          growth: 0
        }
      }
    ]
  },

  {
    id: 8,
    question: "What kind of climate would you be happiest living in?",
    questionSubtext:
      "Think about the weather you are most comfortable with.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Snowflake,
        option: "Cooler and mild",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 5,
          amenities: 0,
          lifestyle: 2,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: CloudSun,
        option: "Moderate temperatures",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 4,
          amenities: 0,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Sun,
        option: "Warm — I don't mind the heat",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 2,
          amenities: 0,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: CircleHelp,
        option: "Climate isn't a major factor for me",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      }
    ]
  },

  {
    id: 9,
    question: "How do you feel about heat and humidity?",
    questionSubtext: "Choose the option that best describes you.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: ThermometerSnowflake,
        option: "I strongly dislike heat and humidity.",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 5,
          amenities: 0,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: CloudSun,
        option: "I prefer moderate conditions.",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 4,
          amenities: 0,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Sun,
        option: "I can tolerate warm and humid weather.",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 2,
          amenities: 0,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: SunMedium,
        option: "It doesn't bother me much.",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      }
    ]
  },

  {
    id: 10,
    question: "What would you most like to have close to your home?",
    questionSubtext: "Pick up to 4 options.",
    type: "multiple",
    maxSelections: 4,

    optionsList: [
      {
        id: 1,
        icon: ShoppingBasket,
        option: "Supermarkets and grocery stores",
        factorImpact: {
          safety: 0,
          connectivity: 1,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 5,
          lifestyle: 1,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 2,
        icon: UtensilsCrossed,
        option: "Restaurants and cafés",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 4,
          lifestyle: 5,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 3,
        icon: Dumbbell,
        option: "Gyms and sports facilities",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 3,
          lifestyle: 5,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 4,
        icon: Trees,
        option: "Parks and recreational spaces",
        factorImpact: {
          safety: 1,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 5,
          amenities: 2,
          lifestyle: 4,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 5,
        icon: Hospital,
        option: "Hospitals and pharmacies",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 5,
          education: 0,
          environment: 0,
          amenities: 3,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      },
      {
        id: 6,
        icon: GraduationCap,
        option: "Schools and educational institutions",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 0,
          education: 5,
          environment: 1,
          amenities: 2,
          lifestyle: 0,
          housing: 0,
          growth: 1
        }
      },
      {
        id: 7,
        icon: TrainFront,
        option: "Metro and railway stations",
        factorImpact: {
          safety: 0,
          connectivity: 5,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 2,
          lifestyle: 1,
          housing: 0,
          growth: 2
        }
      },
      {
        id: 8,
        icon: ShoppingBag,
        option: "Shopping and entertainment",
        factorImpact: {
          safety: 0,
          connectivity: 1,
          healthcare: 0,
          education: 0,
          environment: -1,
          amenities: 5,
          lifestyle: 5,
          housing: 0,
          growth: 1
        }
      }
    ]
  },

  {
    id: 11,
    question: "Which type of locality sounds more attractive to you?",
    questionSubtext:
      "Think about development, convenience, and future potential.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Building2,
        option:
          "Established and mature — most facilities are already available.",
        factorImpact: {
          safety: 1,
          connectivity: 3,
          healthcare: 2,
          education: 2,
          environment: 0,
          amenities: 4,
          lifestyle: 2,
          housing: -1,
          growth: 1
        }
      },
      {
        id: 2,
        icon: TrendingUp,
        option:
          "Emerging — strong future growth potential interests me.",
        factorImpact: {
          safety: 0,
          connectivity: 2,
          healthcare: 0,
          education: 0,
          environment: 1,
          amenities: 0,
          lifestyle: 0,
          housing: 3,
          growth: 5
        }
      },
      {
        id: 3,
        icon: Scale,
        option:
          "A balance between established and emerging.",
        factorImpact: {
          safety: 1,
          connectivity: 2,
          healthcare: 1,
          education: 1,
          environment: 1,
          amenities: 2,
          lifestyle: 1,
          housing: 1,
          growth: 3
        }
      },
      {
        id: 4,
        icon: CircleMinus,
        option:
          "Future development isn't important to me.",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 1,
          education: 1,
          environment: 0,
          amenities: 1,
          lifestyle: 1,
          housing: 1,
          growth: 0
        }
      }
    ]
  },

  {
    id: 12,
    question: "What are you primarily looking for right now?",
    questionSubtext:
      "This helps Dwellio understand your situation.",
    type: "single",

    optionsList: [
      {
        id: 1,
        icon: Key,
        option: "A place to rent",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 1,
          education: 0,
          environment: 0,
          amenities: 1,
          lifestyle: 0,
          housing: 4,
          growth: 0
        }
      },
      {
        id: 2,
        icon: Home,
        option: "A place to buy",
        factorImpact: {
          safety: 1,
          connectivity: 1,
          healthcare: 1,
          education: 0,
          environment: 0,
          amenities: 1,
          lifestyle: 0,
          housing: 4,
          growth: 3
        }
      },
      {
        id: 3,
        icon: Users,
        option: "A place for my family",
        factorImpact: {
          safety: 3,
          connectivity: 1,
          healthcare: 2,
          education: 3,
          environment: 2,
          amenities: 2,
          lifestyle: 1,
          housing: 1,
          growth: 0
        }
      },
      {
        id: 4,
        icon: Search,
        option: "Just exploring",
        factorImpact: {
          safety: 0,
          connectivity: 0,
          healthcare: 0,
          education: 0,
          environment: 0,
          amenities: 0,
          lifestyle: 0,
          housing: 0,
          growth: 0
        }
      }
    ]
  }
];

export default quizQuestions;