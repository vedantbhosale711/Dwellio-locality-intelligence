import FoldText from "../components/ui/FoldText";
import LocalityCard from "../components/LocalityCard";
import HomePageSteps from "../components/HomePageSteps";

import HeroImage from "../assets/images/heroImage.png";
import khargharSkyline from "../assets/images/khargharSkyline.jpg";
import indiraNagarSkyline from "../assets/images/indiraNagarSkyline.jpg";
import annaNagarSkyline from "../assets/images/annaNagarSkyline.webp";
import vijayNagarSkyline from "../assets/images/vijayNagarSkyline.jpg";
import CityImage from "../assets/images/cityImage.png";

import statistics from "../assets/icons/statistics.png"
import checklist from "../assets/icons/checklist.png"
import target from "../assets/icons/target.png"

import {
  TrainFront,
  Shield,
  Trees,
  ShoppingBag,
  GraduationCap,
  Cross,
  Heart,
  Building2,
  ArrowRight,
  MoveRightIcon,
  Search,
  Plus,
  MapPinned,
  ChartColumn,
  Database,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="mx-20">
      <div className="flex ">
        <div className="flex flex-col  my-8 gap-y-9 max-w-170">
          <div className="bg-[#EBEBFF] self-start px-3 py-1  rounded-xl">
            🟢Data-driven locality intelligence
          </div>

          <FoldText
            className="w-150"
            text="Find the perfect locality to call home."
            splitBy="word"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize={50}
            fontWeight={700}
            color="#0B0B42"
          />

          <div className="max-w-100">
            Dwellio analyzes 50+ factors across amenities, connectivity, safety,
            environment and lifestyle to help you choose the right locality for
            your unique needs.
          </div>

          <div className="flex items-center gap-5 font-medium">
            <Link
              className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg"
              to="/explore"
            >
              Explore Localities <span className="font-medium">➜</span>
            </Link>
            <Link
              to="/quiz"
              className="px-5 py-2 border-2 border-emerald-500 rounded-lg text-emerald-600"
            >
              Find My Ideal Locality
            </Link>
          </div>

          {/* Search bar */}
          <div className="p-2 rounded-lg self-start flex w-full max-w-170 h-13 items-center gap-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Search size={18} className="text-slate-500" />
            <input
              className="font-normal w-full max-w-140 focus:outline-none placeholder:text-slate-400"
              type="text"
              placeholder="Search localities e.g. Kharghar, Povai, Vashi..."
            />
            <Link className="ml-auto bg-blue-500 h-10 w-10 flex justify-center items-center text-white rounded-lg">
              ➜
            </Link>
          </div>

          {/* Small Cards */}
          <div className="flex gap-10">
            <div className="self-start shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-5 rounded-xl ">
              <div className="flex gap-1">
                <MapPinned
                  className="size-6 text-green-400"
                  strokeWidth={2.5}
                />
                <div className="font-bold text-slate-800">250+</div>
              </div>
              <div className="text-slate-800">Localities</div>
            </div>

            <div className="self-start shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-5 rounded-xl ">
              <div className="flex gap-1">
                <Database className="size-6 text-blue-400" strokeWidth={2.5} />
                <div className="font-bold text-slate-800">50+</div>
              </div>
              <div className="text-slate-800">Data Factors</div>
            </div>

            <div className="self-start shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-5 rounded-xl ">
              <div className="flex gap-1">
                <ChartColumn
                  className="size-6 text-green-600"
                  strokeWidth={2.5}
                />
                <div className="font-bold text-slate-800">15L+</div>
              </div>
              <div className="text-slate-800">Data Points</div>
            </div>

            <div className="self-start shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-2 px-5 rounded-xl ">
              <div className="flex gap-1">
                <Users className="size-6 text-green-600" strokeWidth={2.5} />
                <div className="font-bold text-slate-800">10k+</div>
              </div>
              <div className="text-slate-800">Happy Users</div>
            </div>
          </div>
        </div>
        {/* temp image */}
        <img
          src={HeroImage}
          alt="Hero Image"
          className="h-150 ml-auto mr-20 mt-10 rounded-4xl"
        />
      </div>

      <div className="my-15 flex flex-col gap-y-3">
        <div className="text-slate-800 text-3xl font-bold">
          Featured Localities
        </div>

        <div className="flex justify-between">
          <div className="text-slate-500 font-medium">
            Popular localities loved by out users
          </div>
          <Link to="/explore" className="text-blue-600">
            View all localities➜
          </Link>
        </div>

        <div className="flex gap-5">
          <LocalityCard
            name="Kharghar"
            city="Navi Mumbai"
            score={8.7}
            rating="Great"
            connectivity={9.1}
            safety={8.5}
            environment={8.9}
            lifestyle={8.2}
            image={khargharSkyline}
          />
          <LocalityCard
            name="Indiranagar"
            city="Bengaluru"
            score={8.5}
            rating="Very Good"
            connectivity={9.0}
            safety={8.3}
            environment={8.4}
            lifestyle={8.8}
            image={indiraNagarSkyline}
          />

          <LocalityCard
            name="Vijay Nagar"
            city="Indore"
            score={8.4}
            rating="Very Good"
            connectivity={8.6}
            safety={8.7}
            environment={8.2}
            lifestyle={8.5}
            image={vijayNagarSkyline}
          />

          <LocalityCard
            name="Anna Nagar"
            city="Chennai"
            score={8.3}
            rating="Very Good"
            connectivity={8.8}
            safety={8.1}
            environment={8.0}
            lifestyle={8.4}
            image={annaNagarSkyline}
          />
          
        </div>
      </div >

        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-bold text-slate-800">How Dwellio Works</div>
            <div className="text-slate-700">Three simple steps to find your ideal locality</div>
            <br />

            <div className="flex gap-5 justify-center items-center">
                <HomePageSteps
                    heading="Explore Localities"
                    id="1"
                    lightTheme="bg-blue-200"
                    theme="bg-blue-400"
                    icon={statistics}
                    subtext="Browse and analyze localities based on 50+ data-driven factors like connectivity, safety, amenities, and environment."
                />
                <MoveRightIcon strokeWidth={1.9} />
                <HomePageSteps
                    heading="Tell Us Your Preferences"
                    id="2"
                    lightTheme="bg-emerald-200"
                    theme="bg-emerald-400"
                    icon={checklist}
                    subtext="Answer a few simple questions about your lifestyle and what matters most to you."
                />
                <MoveRightIcon strokeWidth={1.9} />
                <HomePageSteps
                    heading="Get Recommendations"
                    id="3"
                    lightTheme="bg-purple-200"
                    theme="bg-purple-400"
                    icon={target}
                    subtext="Get personalized locality recommendations ranked based on your preferences and priorities."
                />
            </div>
        </div>
        {/* What We Analyze */}

        <div className="my-25 flex flex-col items-center justify-around">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-800">
            What We Analyze
        </h2>

        <p className="mt-2 text-slate-500">
            Comprehensive data across 8 key categories
        </p>


        {/* Categories */}
        <div className="mt-12 px-20 flex w-full justify-around">

            {/* Connectivity */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-blue-50">
                <TrainFront className="text-blue-700" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Connectivity
            </p>
            </div>

            {/* Safety */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-blue-50">
                <Shield className="text-blue-600" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Safety
            </p>
            </div>

            {/* Environment */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-green-50">
                <Trees className="text-green-600" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Environment
            </p>
            </div>

            {/* Amenities */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-orange-50">
                <ShoppingBag className="text-orange-500" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Amenities
            </p>
            </div>

            {/* Education */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-blue-50">
                <GraduationCap className="text-blue-700" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Education
            </p>
            </div>

            {/* Healthcare */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-green-50">
                <Cross className="text-green-600" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Healthcare
            </p>
            </div>

            {/* Lifestyle */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-red-50">
                <Heart className="text-red-400" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Lifestyle
            </p>
            </div>

            {/* Real Estate */}
            <div className="flex flex-col items-center gap-4">
            <div className="flex size-18 items-center justify-center rounded-full bg-cyan-50">
                <Building2 className="text-cyan-700" size={32} />
            </div>
            <p className="font-medium text-slate-700">
                Real Estate
            </p>
            </div>

        </div>


        {/* Button */}
        <button className="mt-14 flex items-center gap-2 rounded-lg border border-slate-200 px-7 py-3 text-blue-600 shadow-sm">
            Learn more about our methodology
            <ArrowRight size={18} />
        </button>
        </div>
        

        {/* CTA Section */}
        <div className="my-20 rounded-2xl bg-[#eef4ff] px-16 py-14">

        <div className="flex items-center justify-between">

            {/* Left Content */}
            <div>
            <h2 className="text-4xl font-bold text-slate-800">
                Ready to find your ideal locality?
            </h2>

            <p className="mt-5 max-w-130 text-xl text-slate-600">
                Join thousands of people who've found their perfect
                neighborhood with Dwellio.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-8">

                <Link
                to="/explore"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-4 font-semibold text-white"
                >
                Start Exploring
                <ArrowRight size={20} />
                </Link>

                <Link
                to="/quiz"
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-7 py-4 font-semibold text-white"
                >
                Take the Quiz
                <Plus size={20} />
                </Link>

            </div>

            <p className="mt-5 text-slate-500">
                No signup required • Free forever
            </p>
            </div>

            {/* Right Illustration */}
            <img
            src={CityImage}
            alt="City illustration"
            className="h-70 w-auto object-contain"
            />

        </div>
        </div>

    </div>
  );
}

export default HomePage;
