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
  Check,
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
  Search,
} from "lucide-react";

import CategoryCard from "../components/QuizPageComponents/CategoryCard";
import quizQuestions from "../data/quizQuestions";

import { useState } from "react";

function IntroScreen({ setPhase }) {
  return (
    <div className="p-20 flex flex-col justify-center items-center bg-[#F5F5F5]">
      <div className="flex justify-center items-center text-[12px] font-bold text-indigo-700 bg-blue-100 px-3 py-1 rounded-full">
        <Sparkles size={12} />
        Personalized recommendations
      </div>

      <div className="text-2xl font-bold my-5">Find Your Ideal Locality</div>

      <div className="max-w-130 text-[13px] font-medium text-gray-500 text-center mb-3">
        Answer a few quick questionNos about your lifestyle and priorities.
        Dwellio will understand what matters most to you and recommend the
        localities that fit your life best.
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-500">
        <div className=" flex justify-center items-center gap-2">
          <Clock size={12} />
          Takes 3-4 minutes{" "}
        </div>
        <div className=" flex justify-center items-center gap-2">
          <ListChecks size={12} />9 core factors analyzed
        </div>
      </div>

      <button
        className="m-5 bg-blue-500 text-white rounded-xl px-4 py-2"
        onClick={() => {
          setPhase("quiz");
        }}
      >
        start quiz
      </button>

      <div className="grid grid-cols-3 gap-4">
        <CategoryCard
          title="Safety"
          icon={ShieldCheck}
          iconColor="text-red-500"
          bgColor="bg-red-100"
        />

        <CategoryCard
          title="Connectivity"
          icon={MapPin}
          iconColor="text-blue-500"
          bgColor="bg-blue-100"
        />

        <CategoryCard
          title="Healthcare"
          icon={Stethoscope}
          iconColor="text-pink-500"
          bgColor="bg-pink-100"
        />

        <CategoryCard
          title="Education"
          icon={GraduationCap}
          iconColor="text-purple-500"
          bgColor="bg-purple-100"
        />

        <CategoryCard
          title="Environment"
          icon={Trees}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-100"
        />

        <CategoryCard
          title="Amenities"
          icon={ShoppingBasket}
          iconColor="text-orange-500"
          bgColor="bg-orange-100"
        />

        <CategoryCard
          title="Lifestyle"
          icon={Sparkles}
          iconColor="text-cyan-500"
          bgColor="bg-cyan-100"
        />

        <CategoryCard
          title="Housing"
          icon={Building2}
          iconColor="text-amber-500"
          bgColor="bg-amber-100"
        />

        <CategoryCard
          title="Future Growth"
          icon={TrendingUp}
          iconColor="text-indigo-500"
          bgColor="bg-indigo-100"
        />
      </div>
    </div>
  );
}

function QuizScreen({
  setPhase,
  factorScore,
  setFactorScore,
  maxFactorScores,
}) {
  const [questionNo, setQuestionNo] = useState(1);
  const totalQuestions = quizQuestions.length;

  const [selectedOptions, setSelectedOptions] = useState([]);

  function goBack() {
    if (questionNo === 1) {
      setPhase("intro");
      return;
    }
    setQuestionNo((q) => q - 1);
  }
  function goForward() {
    if (questionNo === totalQuestions) {
      setPhase("review");

      return;
    }

    setQuestionNo((q) => q + 1);
  }
  function handleOptionSelection(o) {
    const currentQuestion = quizQuestions[questionNo - 1];

    // SINGLE SELECT
    if (currentQuestion.type === "single") {
      // If clicking the already selected option, do nothing
      if (selectedOptions.includes(o)) {
        return;
      }

      // Remove score of previous selection
      if (selectedOptions.length > 0) {
        const oldOption = selectedOptions[0];

        setFactorScore((prev) => {
          const updated = { ...prev };

          Object.entries(oldOption.factorImpact).forEach(([factor, score]) => {
            updated[factor] -= score;
          });

          return updated;
        });
      }

      // Replace selected option
      setSelectedOptions([o]);

      // Add new score
      setFactorScore((prev) => {
        const updated = { ...prev };

        Object.entries(o.factorImpact).forEach(([factor, score]) => {
          updated[factor] += score;
        });

        return updated;
      });

      return;
    }

    // MULTIPLE SELECT
    if (selectedOptions.includes(o)) {
      setSelectedOptions((prev) => prev.filter((item) => item !== o));

      setFactorScore((prev) => {
        const updated = { ...prev };

        Object.entries(o.factorImpact).forEach(([factor, score]) => {
          updated[factor] -= score;
        });

        return updated;
      });

      return;
    }

    // Add multi-select option
    if (selectedOptions.length < currentQuestion.maxSelections) {
      setSelectedOptions((prev) => [...prev, o]);

      setFactorScore((prev) => {
        const updated = { ...prev };

        Object.entries(o.factorImpact).forEach(([factor, score]) => {
          updated[factor] += score;
        });

        return updated;
      });
    }
  }

  return (
    <div className="px-20  bg-gray-100 p-10 flex flex-col gap-3">
      {/* Heading */}
      <div className="flex justify-between">
        <div className="text-blue-700 text-xs font-bold">
          Question {questionNo} out of {totalQuestions}
        </div>
        <div className="text-gray-400 text-xs font-bold">
          {Math.floor(100 * (questionNo / totalQuestions))}% complete
        </div>
      </div>
      <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-700 h-10 "
          style={{ width: `${(questionNo / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Questions */}
      <div>
        <div className="text-lg font-semibold ">
          {quizQuestions[questionNo - 1].question}
        </div>

        {quizQuestions[questionNo - 1].questionSubtext && (
          <div className="text-sm text-gray-500 ">
            {quizQuestions[questionNo - 1].questionSubtext}
          </div>
        )}

        {quizQuestions[questionNo - 1].optionsList.map((o) => {
          const Icon = o.icon;
          const isSelected = selectedOptions.includes(o);
          return (
            <div
              className={`text-gray-800 text-sm font-semibold my-3 h-16 rounded-xl flex flex-col justify-center px-4 border
                        ${
                          isSelected
                            ? "bg-blue-100 border-blue-500"
                            : "bg-white border-gray-200"
                        }`}
              onClick={() => handleOptionSelection(o)}
            >
              <Icon size={16} />
              {o.option}
            </div>
          );
        })}
      </div>

      <div className="flex  justify-between">
        <button
          onClick={goBack}
          className="flex justify-center items-center gap-2 bg-white rounded-lg px-4 py-2 border` border-gray-300"
        >
          <ArrowLeft size={16} />
          <div>Back</div>
        </button>

        <button
          onClick={goForward}
          className="flex justify-center items-center bg-blue-600 px-4 py-2  text-white rounded-lg"
        >
          <div>Continue</div>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="bg-white rounded-xl px-4 py-2">
        <div className="flex  items-center gap-2">
          <Sparkles size={12} className="text-blue-700" />
          <div className="text-md font-semibold text-shadow-gray-800">
            {" "}
            Your Priorities
          </div>
        </div>
        <div className="text-xs text-gray-500 ">Updates as you answer</div>

        <div className="flex flex-col gap-3 mt-3">
          {Object.entries(factorScore)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([factor, score]) => {
              const percentage = (score / maxFactorScores[factor]) * 100;

              return (
                <div key={factor}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium text-gray-700">
                      {factor}
                    </div>

                    <div className="text-xs font-medium text-gray-500">
                      {score}
                    </div>
                  </div>

                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({ setPhase, maxFactorScores, factorScore }) {
    function ReviewImportanceCard({ factorScore, maxScore, icon: Icon, factorTitle }) {
        const percentage = (factorScore / maxScore) * 100;

        const importance =
            percentage >= 80 ? "Very High" :
            percentage >= 60 ? "High" :
            percentage >= 35 ? "Medium" : "Low";

        return (
            <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 mb-4">

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Icon size={20} />
                        </div>

                        <span className="font-semibold text-gray-800">
                            {factorTitle}
                        </span>
                    </div>

                    <span className="font-semibold text-gray-600">
                        {importance}
                    </span>
                </div>

                <div className="flex justify-between mt-4 mb-2 text-sm font-semibold">
                    <span className="text-gray-400">Importance</span>
                    <span className="text-gray-600">{importance}</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

            </div>
        );

    }

  const factorInfo = {
    safety: {
      title: "Safety & Security",
      icon: ShieldCheck,
      maxScore: 26,
    },

    connectivity: {
      title: "Connectivity & Transportation",
      icon: TrainFront,
      maxScore: 35,
    },

    healthcare: {
      title: "Healthcare",
      icon: Stethoscope,
      maxScore: 25,
    },

    education: {
      title: "Education",
      icon: GraduationCap,
      maxScore: 21,
    },

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

    lifestyle: {
      title: "Lifestyle & Recreation",
      icon: Sparkles,
      maxScore: 39,
    },

    housing: {
      title: "Housing & Affordability",
      icon: Building2,
      maxScore: 21,
    },

    growth: {
      title: "Future Growth & Development",
      icon: TrendingUp,
      maxScore: 20,
    },
  };

  return (
    <div className="flex flex-col justify-center items-center mx-20 my-10">
      <div className="flex justify-center gap-2 items-center text-[10px] font-bold text-emerald-600 bg-green-100 px-2 py-1 rounded-xl">
        <div>Quiz Complete</div>
        <Check size={12} />
      </div>

      <div className="flex flex-col justify-center items-center gap-1 m-3">
        <div className="text-2xl font-semibold ">
          Here's What Matters Most to You
        </div>
        <div className="text-sm font-semibold text-gray-400">
          Based on your answers, Dwellio will weigh localities using this
          priority profile.
        </div>
      </div>

      <div>
        {Object.entries(factorScore)
          .sort((a, b) => b[1] - a[1])
          .map((o) => {
            const factor = factorInfo[o[0]];

            return (
              <ReviewImportanceCard
                factorScore={o[1]}
                factorTitle={factor.title}
                icon={factor.icon}
                maxScore={factor.maxScore}
              />
            );
          })}
      </div>
    </div>
  );
}

function RecommendationQuizPage() {
  const [phase, setPhase] = useState("intro");
  const [factorScore, setFactorScore] = useState({
    safety: 0,
    connectivity: 0,
    healthcare: 0,
    education: 0,
    environment: 0,
    amenities: 0,
    lifestyle: 0,
    housing: 0,
    growth: 0,
  });
  const maxFactorScores = {
    safety: 26,
    connectivity: 35,
    healthcare: 25,
    education: 21,
    environment: 38,
    amenities: 45,
    lifestyle: 39,
    housing: 21,
    growth: 20,
  };

  return (
    <div>
      {phase === "intro" && <IntroScreen setPhase={setPhase} />}
      {phase === "quiz" && (
        <QuizScreen
          setPhase={setPhase}
          factorScore={factorScore}
          setFactorScore={setFactorScore}
          maxFactorScores={maxFactorScores}
        />
      )}
      {phase === "review" && (
        <ReviewScreen
          setPhase={setPhase}
          maxFactorScores={maxFactorScores}
          factorScore={factorScore}
        />
      )}
    </div>
  );
}

export default RecommendationQuizPage;
