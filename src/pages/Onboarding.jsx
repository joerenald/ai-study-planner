import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { usePlanner } from "../context/PlannerContext";

const Onboarding = () => {

const navigate = useNavigate();
const { updateData } = usePlanner();


const [currentStep, setCurrentStep] = useState(1);

const [formData, setFormData] = useState({
subjects: "",
goals: "",
availability: "",
});

const totalSteps = 3;

const handleInputChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const nextStep = () => {
if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
};

const prevStep = () => {
if (currentStep > 1) setCurrentStep(currentStep - 1);
};

// ⭐ SAVE INTO CONTEXT
const handleSubmit = () => {

  // convert subjects to array
  const subjectsArray = formData.subjects
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  // save to global memory
  updateData("goal", formData.goals);
  updateData("subjects", subjectsArray);
  updateData("dailyHours", Number(formData.availability) / 7);

  navigate("/subjects");
};


const renderStep = () => {
switch (currentStep) {


  case 1:
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to AI Study Planner
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Let's build your personalized study timetable.
        </p>
        <Button onClick={nextStep} size="lg">Get Started</Button>
      </div>
    );

  case 2:
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Tell Us About Yourself
        </h2>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-medium">Subjects (comma separated)</label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="OS, DBMS, CN, TOC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Your Goal</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="Crack UGC NET CS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Weekly Study Hours</label>
            <input
              type="number"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="20"
            />
          </div>

        </div>
      </div>
    );

  case 3:
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Your Details</h2>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left max-w-md mx-auto">
          <p><strong>Subjects:</strong> {formData.subjects}</p>
          <p><strong>Goal:</strong> {formData.goals}</p>
          <p><strong>Weekly Hours:</strong> {formData.availability}</p>
        </div>

        <Button onClick={handleSubmit} size="lg">Continue</Button>
      </div>
    );
}


};

return ( <div className="bg-slate-50 min-h-screen flex flex-col">


  <Navbar />

  <main className="flex-1 py-16 px-4">
    <div className="max-w-2xl mx-auto">

      <div className="flex justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
              i + 1 <= currentStep
                ? "bg-indigo-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        {renderStep()}
      </div>

      {currentStep > 1 && currentStep < totalSteps && (
        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} variant="secondary">Back</Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      )}

    </div>
  </main>

  <Footer />

</div>


);
};

export default Onboarding;
