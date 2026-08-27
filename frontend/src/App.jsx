import HomePage from "./pages/HomePage"
import ExploreLocalitiesPage from "./pages/ExploreLocalitiesPage"
import LocalitiesDetailsPage from "./pages/LocalitiesDetailsPage"
import LocalityComparisonPage from "./pages/LocalityComparisonPage"
import RecommendationQuizPage from "./pages/RecommendationQuizPage"
import RecommendationResultsPage from "./pages/RecommendationResultsPage"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import { Routes, Route } from "react-router-dom"


function App() {
  
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/explore" element={<ExploreLocalitiesPage/>}></Route>
        <Route path="/details" element={<LocalitiesDetailsPage/>}></Route>
        <Route path="/compare" element={<LocalityComparisonPage/>}></Route>
        <Route path="/quiz" element={<RecommendationQuizPage/>}></Route>
        <Route path="/result" element={<RecommendationResultsPage/>}></Route>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
