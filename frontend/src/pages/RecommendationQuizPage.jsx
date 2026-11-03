
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Building2,
  Check,
  RefreshCw,
  Map,
  Globe,
} from "lucide-react";

import CategoryCard from "../components/QuizPageComponents/CategoryCard";
import quizQuestions from "../data/quizQuestions";

const factors = [
  "safety",
  "connectivity",
  "healthcare",
  "education",
  "environment",
  "amenities",
  "lifestyle",
  "housing",
  "growth",
];

const factorInfo = {
  safety: { title: "Safety & Security", icon: ShieldCheck, maxScore: 26 },
  connectivity: {
    title: "Connectivity & Transportation",
    icon: TrainFront,
    maxScore: 35,
  },
  healthcare: { title: "Healthcare", icon: Stethoscope, maxScore: 25 },
  education: { title: "Education", icon: GraduationCap, maxScore: 21 },
  environment: {
    title: "Environment & Sustainability",
    icon: Trees,
    maxScore: 38,
  },
  amenities: {
    title: "Amenities & Daily Convenience",
    icon: ShoppingBasket,
    maxScore: 45,
  },
  lifestyle: { title: "Lifestyle & Recreation", icon: Sparkles, maxScore: 39 },
  housing: { title: "Housing & Affordability", icon: Building2, maxScore: 21 },
  growth: { title: "Future Growth & Development", icon: TrendingUp, maxScore: 20 },
};

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

const initialLocationPreference = {
  scope: "state",
  state: "Maharashtra",
  city: "",
};

function calculateFactorScores(answersByQuestion) {
  const scores = Object.fromEntries(
    factors.map((factor) => [factor, 0])
  );

  Object.entries(answersByQuestion).forEach(([questionId, answers]) => {
    const weight = Number(questionId) === 1 ? 2 : 1;

    answers.forEach((option) => {
      Object.entries(option.factorImpact || {}).forEach(
        ([factor, impact]) => {
          if (Object.hasOwn(scores, factor)) {
            scores[factor] += Number(impact || 0) * weight;
          }
        }
      );
    });
  });

  return scores;
}

function getPercentage(score, maxScore) {
  if (!maxScore || maxScore <= 0) return 0;
  return Math.max(0, Math.min(100, (score / maxScore) * 100));
}

function getImportance(percentage) {
  if (percentage >= 80) return "Very High";
  if (percentage >= 60) return "High";
  if (percentage >= 35) return "Medium";
  return "Low";
}

function IntroScreen({ setPhase }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5] p-8 md:p-20">
      <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-indigo-700">
        <Sparkles size={14} />
        Personalized recommendations
      </div>

      <h1 className="my-5 text-center text-2xl font-bold">
        Find Your Ideal Locality
      </h1>

      <p className="mb-4 max-w-xl text-center text-sm font-medium text-gray-500">
        Answer a few quick questions about your preferred location,
        lifestyle, and priorities. Dwellio will help you discover
        localities that fit your needs.
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-500">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          Takes 3–4 minutes
        </div>
        <div className="flex items-center gap-2">
          <ListChecks size={14} />
          9 core factors analyzed
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPhase("location")}
        className="mb-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Start Quiz
      </button>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-3">
        <CategoryCard title="Safety" icon={ShieldCheck} iconColor="text-red-500" bgColor="bg-red-100" />
        <CategoryCard title="Connectivity" icon={MapPin} iconColor="text-blue-500" bgColor="bg-blue-100" />
        <CategoryCard title="Healthcare" icon={Stethoscope} iconColor="text-pink-500" bgColor="bg-pink-100" />
        <CategoryCard title="Education" icon={GraduationCap} iconColor="text-purple-500" bgColor="bg-purple-100" />
        <CategoryCard title="Environment" icon={Trees} iconColor="text-emerald-500" bgColor="bg-emerald-100" />
        <CategoryCard title="Amenities" icon={ShoppingBasket} iconColor="text-orange-500" bgColor="bg-orange-100" />
        <CategoryCard title="Lifestyle" icon={Sparkles} iconColor="text-cyan-500" bgColor="bg-cyan-100" />
        <CategoryCard title="Housing" icon={Building2} iconColor="text-amber-500" bgColor="bg-amber-100" />
        <CategoryCard title="Future Growth" icon={TrendingUp} iconColor="text-indigo-500" bgColor="bg-indigo-100" />
      </div>
    </div>
  );
}

function LocationPreferenceScreen({
  preference,
  setPreference,
  onContinue,
  onBack,
}) {
  const [cityError, setCityError] = useState("");

  function updatePreference(updates) {
    setPreference((previous) => ({ ...previous, ...updates }));
    setCityError("");
  }

  function handleContinue() {
    if (
      preference.scope === "city" &&
      !preference.city.trim()
    ) {
      setCityError("Please enter the city where you want to live.");
      return;
    }

    onContinue();
  }

  const radioOptions = [
    {
      value: "city",
      label: "A specific city",
      description: "Find localities within one city.",
      icon: MapPin,
    },
    {
      value: "state",
      label: "Anywhere in a particular state",
      description: "Explore cities across your preferred state.",
      icon: Map,
    },
    {
      value: "india",
      label: "Anywhere in India",
      description: "Explore matching localities across India.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-[70vh] bg-gray-50 px-5 py-10 md:px-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          <MapPin size={24} />
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-blue-700">
          Location preference
        </p>

        <h1 className="text-2xl font-bold text-gray-900">
          Where would you like to live?
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Choose the geographic area where you want Dwellio to find localities.
          We'll use this to filter recommendations before ranking them.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {radioOptions.map((option) => {
            const Icon = option.icon;
            const selected = preference.scope === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updatePreference({ scope: option.value })}
                aria-pressed={selected}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selected && <Check size={13} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-semibold text-gray-900">
                    <Icon size={17} />
                    {option.label}
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    {option.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {preference.scope === "state" && (
          <div className="mt-6">
            <label
              htmlFor="preferred-state"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Preferred state
            </label>

            <select
              id="preferred-state"
              value={preference.state}
              onChange={(event) =>
                updatePreference({ state: event.target.value })
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        )}

        {preference.scope === "city" && (
          <div className="mt-6">
            <label
              htmlFor="preferred-city"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Preferred city
            </label>

            <input
              id="preferred-city"
              value={preference.city}
              onChange={(event) =>
                updatePreference({ city: event.target.value })
              }
              placeholder="e.g. Mumbai, Pune, Chennai"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {cityError && (
              <p className="mt-2 text-sm text-red-600">{cityError}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue to questions
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({
  setPhase,
  answersByQuestion,
  setAnswersByQuestion,
  factorScore,
}) {
  const [questionNo, setQuestionNo] = useState(1);

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[questionNo - 1];
  const selectedOptions = answersByQuestion[currentQuestion.id] || [];
  const progress = (questionNo / totalQuestions) * 100;

  function handleOptionSelection(option) {
    setAnswersByQuestion((previous) => {
      const currentAnswers = previous[currentQuestion.id] || [];
      let nextAnswers;

      if (currentQuestion.type === "single") {
        const alreadySelected = currentAnswers.some(
          (item) => item.id === option.id
        );

        nextAnswers = alreadySelected ? currentAnswers : [option];
      } else {
        const alreadySelected = currentAnswers.some(
          (item) => item.id === option.id
        );

        if (alreadySelected) {
          nextAnswers = currentAnswers.filter(
            (item) => item.id !== option.id
          );
        } else {
          const maxSelections = currentQuestion.maxSelections ?? Infinity;

          if (currentAnswers.length >= maxSelections) {
            return previous;
          }

          nextAnswers = [...currentAnswers, option];
        }
      }

      return {
        ...previous,
        [currentQuestion.id]: nextAnswers,
      };
    });
  }

  function goBack() {
    if (questionNo === 1) {
      setPhase("location");
      return;
    }

    setQuestionNo((previous) => previous - 1);
  }

  function goForward() {
    if (questionNo === totalQuestions) {
      setPhase("review");
      return;
    }

    setQuestionNo((previous) => previous + 1);
  }

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 md:p-10 lg:px-20">
      <div className="flex justify-between">
        <span className="text-xs font-bold text-blue-700">
          Question {questionNo} of {totalQuestions}
        </span>
        <span className="text-xs font-bold text-gray-500">
          {Math.floor(progress)}% complete
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-300">
        <div
          className="h-full rounded-full bg-blue-700 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">
          {currentQuestion.question}
        </h2>

        {currentQuestion.questionSubtext && (
          <p className="mt-2 text-sm text-gray-500">
            {currentQuestion.questionSubtext}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {currentQuestion.optionsList.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedOptions.some(
              (item) => item.id === option.id
            );

            return (
              <button
                key={`${currentQuestion.id}-${option.id ?? index}`}
                type="button"
                onClick={() => handleOptionSelection(option)}
                aria-pressed={isSelected}
                className={`flex min-h-16 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-100 text-blue-900"
                    : "border-gray-200 bg-white text-gray-800 hover:border-blue-300"
                }`}
              >
                {Icon && <Icon size={18} className="shrink-0" />}
                <span>{option.option}</span>
                {isSelected && (
                  <Check size={18} className="ml-auto shrink-0 text-blue-700" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          type="button"
          onClick={goForward}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {questionNo === totalQuestions ? "Review Priorities" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>

      <PriorityPanel factorScore={factorScore} />
    </div>
  );
}

function PriorityPanel({ factorScore }) {
  const topFactors = Object.entries(factorScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxPriority = Math.max(1, ...Object.values(factorScore));

  return (
    <section className="rounded-xl bg-white p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-blue-700" />
        <h3 className="font-semibold text-gray-900">Your Priorities</h3>
      </div>

      <p className="mt-1 text-xs text-gray-500">
        Updates as you answer. Your first answer carries extra weight,
        while later answers can change your ranking.
      </p>

      <div className="mt-4 flex flex-col gap-4">
        {topFactors.map(([factor, score]) => {
          const info = factorInfo[factor];
          const percentage = Math.max(
            0,
            Math.min(100, (score / maxPriority) * 100)
          );

          return (
            <div key={factor}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {info.title}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {score} pts
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReviewImportanceCard({ factor, score }) {
  const info = factorInfo[factor];
  const Icon = info.icon;
  const percentage = getPercentage(score, info.maxScore);

  return (
    <div className="mb-4 w-full rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Icon size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">{info.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{score} priority points</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {getImportance(percentage)}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ReviewScreen({
  factorScore,
  setPhase,
  onRestart,
  navigate,
  locationPreference,
}) {
  const sortedFactors = Object.entries(factorScore).sort(
    (a, b) => b[1] - a[1]
  );

  const locationLabel =
    locationPreference.scope === "city"
      ? locationPreference.city
      : locationPreference.scope === "state"
        ? locationPreference.state
        : "Anywhere in India";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-10 md:px-8">
      <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-emerald-700">
        <span>Quiz Complete</span>
        <Check size={14} />
      </div>

      <div className="my-5 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Here's What Matters Most to You
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Your preferences will be used to rank localities within your chosen
          geographic area.
        </p>
      </div>

      <div className="mb-6 w-full rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
          <MapPin size={17} />
          Preferred location
        </div>
        <p className="mt-1 text-sm text-blue-800">{locationLabel}</p>

        <button
          type="button"
          onClick={() => setPhase("location")}
          className="mt-2 text-sm font-semibold text-blue-700 underline"
        >
          Change location
        </button>
      </div>

      <div className="w-full">
        {sortedFactors.map(([factor, score]) => (
          <ReviewImportanceCard
            key={factor}
            factor={factor}
            score={score}
          />
        ))}
      </div>

      <div className="mt-4 flex w-full flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={() => setPhase("quiz")}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Edit Answers
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw size={15} />
          Start Again
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/result", {
              state: {
                priorities: factorScore,
                locationPreference,
              },
            })
          }
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Find My Localities
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function RecommendationQuizPage() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("intro");
  const [answersByQuestion, setAnswersByQuestion] = useState({});
  const [locationPreference, setLocationPreference] = useState(
    initialLocationPreference
  );

  const factorScore = useMemo(
    () => calculateFactorScores(answersByQuestion),
    [answersByQuestion]
  );

  function restartQuiz() {
    setAnswersByQuestion({});
    setLocationPreference(initialLocationPreference);
    setPhase("intro");
  }

  return (
    <div>
      {phase === "intro" && <IntroScreen setPhase={setPhase} />}

      {phase === "location" && (
        <LocationPreferenceScreen
          preference={locationPreference}
          setPreference={setLocationPreference}
          onBack={() => setPhase("intro")}
          onContinue={() => setPhase("quiz")}
        />
      )}

      {phase === "quiz" && (
        <QuizScreen
          setPhase={setPhase}
          answersByQuestion={answersByQuestion}
          setAnswersByQuestion={setAnswersByQuestion}
          factorScore={factorScore}
        />
      )}

      {phase === "review" && (
        <ReviewScreen
          factorScore={factorScore}
          setPhase={setPhase}
          onRestart={restartQuiz}
          navigate={navigate}
          locationPreference={locationPreference}
        />
      )}
    </div>
  );
}
